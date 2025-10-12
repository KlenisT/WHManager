import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import clientPromise from '../config/database';
import { User, CreateUserRequest, LoginRequest, UserResponse } from '../models/User';

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role }: CreateUserRequest = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User with this username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user
    const newUser: User = {
      username,
      email,
      password: hashedPassword,
      role: role || 'employee',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('users').insertOne(newUser);
    
    // Return user without password
    const userResponse: UserResponse = {
      _id: result.insertedId.toString(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt!
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: LoginRequest = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Find user by username
    const user = await db.collection('users').findOne({ username });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ error: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await db.collection('users').updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    );

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // Return user without password
    const userResponse: UserResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: new Date()
    };

    res.json({
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

// Get current user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const user = await db.collection('users').findOne({ _id: req.user?.userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userResponse: UserResponse = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    };

    res.json(userResponse);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

// Get all users (admin only)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const users = await db.collection('users').find({}).toArray();
    
    const usersResponse: UserResponse[] = users.map(user => ({
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin
    }));

    res.json(usersResponse);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};
