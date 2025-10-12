import bcrypt from 'bcryptjs';
import clientPromise from '../src/config/database';

const initialUsers = [
  {
    username: 'admin',
    email: 'admin@whmanager.ee',
    password: 'password123',
    role: 'admin'
  },
  {
    username: 'manager',
    email: 'manager@whmanager.ee',
    password: 'manager123',
    role: 'manager'
  },
  {
    username: 'employee',
    email: 'employee@whmanager.ee',
    password: 'employee123',
    role: 'employee'
  }
];

async function migrateUsers() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Check if users already exist
    const existingUsers = await db.collection('users').countDocuments();
    if (existingUsers > 0) {
      console.log('Users already exist, skipping migration');
      return;
    }
    
    // Hash passwords and insert users
    const usersToInsert = await Promise.all(
      initialUsers.map(async (user) => ({
        username: user.username,
        email: user.email,
        password: await bcrypt.hash(user.password, 12),
        role: user.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
    
    const result = await db.collection('users').insertMany(usersToInsert);
    
    console.log(`✅ Migrated ${result.insertedCount} users to MongoDB`);
    console.log('📋 Default users created:');
    initialUsers.forEach(user => {
      console.log(`   - ${user.username} (${user.role}) - Password: ${user.password}`);
    });
  } catch (error) {
    console.error('❌ User migration failed:', error);
  }
}

migrateUsers();
