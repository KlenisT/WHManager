export interface Order {
  _id?: string;
  customer: string;
  automower: string;
  status: 'In Progress' | 'Completed' | 'Awaiting Parts' | 'In Queue';
  dateAccepted: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateOrderRequest {
  customer: string;
  automower: string;
  status: string;
  dateAccepted: string;
}

export interface UpdateOrderRequest {
  customer?: string;
  automower?: string;
  status?: string;
  dateAccepted?: string;
}
