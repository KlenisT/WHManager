export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string; // This will be hashed
  role: 'admin' | 'manager' | 'employee';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'employee';
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}
