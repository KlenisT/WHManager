import { Request, Response } from 'express';
import clientPromise from '../config/database';
import { Order, CreateOrderRequest, UpdateOrderRequest } from '../models/Order';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const orders = await db.collection('orders').find({}).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const order = await db.collection('orders').findOne({ _id: id });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: CreateOrderRequest = req.body;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const newOrder = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('orders').insertOne(newOrder);
    res.status(201).json({ 
      _id: result.insertedId, 
      ...newOrder 
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateOrderRequest = req.body;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const result = await db.collection('orders').updateOne(
      { _id: id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const result = await db.collection('orders').deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
