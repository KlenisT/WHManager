# WHManager Backend API

Express.js backend API for the WHManager warehouse management system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your MongoDB URI

# Start development server
npm run dev
```

## 📡 API Endpoints

### Health Check
- `GET /health` - API health status

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🗄️ Database

Uses MongoDB with the following collections:
- `orders` - Repair orders
- `products` - Warehouse inventory

## 🔧 Development

```bash
# Start with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm run start

# Run migration
npm run migrate
```

## 📦 Deployment

Deploy to Render:
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Add environment variables
