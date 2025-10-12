import clientPromise from '../src/config/database';

const initialOrders = [
  { customer: "John Doe", automower: "Husqvarna 315X", status: "In Progress", dateAccepted: "2025-10-02" },
  { customer: "Jane Smith", automower: "Gardena Sileno", status: "Completed", dateAccepted: "2025-09-29" },
  { customer: "Mark Wilson", automower: "Husqvarna 430X", status: "Awaiting Parts", dateAccepted: "2025-09-28" },
  { customer: "Linda Brown", automower: "Robomow RK2000", status: "In Queue", dateAccepted: "2025-10-01" },
];

async function migrateOrders() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Check if orders already exist
    const existingOrders = await db.collection('orders').countDocuments();
    if (existingOrders > 0) {
      console.log('Orders already exist, skipping migration');
      return;
    }
    
    // Insert initial orders
    const result = await db.collection('orders').insertMany(
      initialOrders.map(order => ({
        ...order,
        createdAt: new Date(),
        updatedAt: new Date()
      }))
    );
    
    console.log(`✅ Migrated ${result.insertedCount} orders to MongoDB`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrateOrders();
