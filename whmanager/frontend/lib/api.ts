const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Order {
  _id?: string;
  customer: string;
  automower: string;
  status: string;
  dateAccepted: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Orders API
  async getOrders(): Promise<Order[]> {
    return this.request('/api/orders');
  }

  async getOrder(id: string): Promise<Order> {
    return this.request(`/api/orders/${id}`);
  }

  async createOrder(order: Omit<Order, '_id'>): Promise<Order> {
    return this.request('/api/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<{ message: string }> {
    return this.request(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(order),
    });
  }

  async deleteOrder(id: string): Promise<{ message: string }> {
    return this.request(`/api/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Products API
  async getProducts(): Promise<Product[]> {
    return this.request('/api/products');
  }

  async getProduct(id: string): Promise<Product> {
    return this.request(`/api/products/${id}`);
  }

  async createProduct(product: Omit<Product, '_id'>): Promise<Product> {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<{ message: string }> {
    return this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string): Promise<{ message: string }> {
    return this.request(`/api/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
