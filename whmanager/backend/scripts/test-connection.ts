import clientPromise from '../src/config/database';

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Test connection
    await db.admin().ping();
    console.log('✅ MongoDB connection successful!');
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Existing collections:', collections.map(c => c.name));
    
    // Check if users collection exists
    const usersCollection = await db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`👥 Users in database: ${userCount}`);
    
    if (userCount > 0) {
      const users = await usersCollection.find({}, { projection: { username: 1, email: 1, role: 1 } }).toArray();
      console.log('👤 Existing users:');
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.role}) - ${user.email}`);
      });
    }
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error instanceof Error ? error.message : 'Unknown error');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your MONGODB_URI in .env file');
    console.log('3. If using MongoDB Atlas, check your connection string');
  }
}

testConnection();
