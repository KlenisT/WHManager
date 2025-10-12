import { Request, Response } from 'express';
import clientPromise from '../config/database';
import { Product, CreateProductRequest, UpdateProductRequest } from '../models/Product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const product = await db.collection('products').findOne({ _id: id });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: CreateProductRequest = req.body;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const newProduct = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').insertOne(newProduct);
    res.status(201).json({ 
      _id: result.insertedId, 
      ...newProduct 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateProductRequest = req.body;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const result = await db.collection('products').updateOne(
      { _id: id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    const result = await db.collection('products').deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
