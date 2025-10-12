export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}
