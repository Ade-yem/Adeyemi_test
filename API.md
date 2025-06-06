# Inventory Management System API Documentation

## Base URL
```
http://localhost:3000/api/v1
```

## Authentication
All protected routes require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
```

Request Schema:
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "role": "admin" | "manager" | "staff"
}
```

Response Schema:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
        "name": "string";
        "id": "string";
        "email": ""string";
        password": "string";
        "role": ;"admin" | "manager" | "staff"
        "isVerified": "boolean";
        "createdAt": "Date";
        "updatedAt": "Date";
    },
  "token": "string"
  }
}
```

#### Login
```http
POST /auth/login
```

Request Schema:
```json
{
  "email": "string",
  "password": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "string",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string"
    }
  }
}
```

#### Get Profile
```http
GET /auth/profile
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Update Profile
```http
PUT /auth/profile
```

Request Schema:
```json
{
  "name": "string",
  "email": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string",
    "updatedAt": "string"
  }
}
```

### Inventory Management

#### Create Item
```http
POST /inventory
```

Request Schema:
```json
{
  "name": "string",
  "sku": "string",
  "categoryId": "string",
  "price": "number",
  "quantity": "number",
  "reorderLevel": "number",
  "description": "string",
  "imageUrl": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "sku": "string",
    "categoryId": "string",
    "price": "number",
    "quantity": "number",
    "reorderLevel": "number",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Get All Items
```http
GET /inventory
```

Query Parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `search`: string (optional)
- `category`: string (optional)

Response Schema:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "string",
        "name": "string",
        "sku": "string",
        "categoryId": "string",
        "price": "number",
        "quantity": "number",
        "reorderLevel": "number",
        "description": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "pages": "number"
    }
  }
}
```

#### Get Item by ID
```http
GET /inventory/:id
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "sku": "string",
    "categoryId": "string",
    "price": "number",
    "quantity": "number",
    "reorderLevel": "number",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Update Item
```http
PUT /inventory/:id
```

Request Schema:
```json
{
  "name": "string",
  "sku": "string",
  "categoryId": "string",
  "price": "number",
  "quantity": "number",
  "reorderLevel": "number",
  "description": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "sku": "string",
    "categoryId": "string",
    "price": "number",
    "quantity": "number",
    "reorderLevel": "number",
    "description": "string",
    "updatedAt": "string"
  }
}
```

#### Delete Item
```http
DELETE /inventory/:id
```

Response Schema:
```json
{
  "success": true,
  "message": "Item deleted successfully"
}
```

#### Adjust Stock
```http
POST /inventory/:id/adjust
```

Request Schema:
```json
{
  "quantity": "number",
  "type": "add" | "subtract",
  "reason": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "quantity": "number",
    "updatedAt": "string"
  }
}
```

### Categories

#### Create Category
```http
POST /categories
```

Request Schema:
```json
{
  "name": "string",
  "description": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Get All Categories
```http
GET /categories
```

Response Schema:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### Get Category by ID
```http
GET /categories/:id
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Update Category
```http
PUT /categories/:id
```

Request Schema:
```json
{
  "name": "string",
  "description": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "updatedAt": "string"
  }
}
```

#### Delete Category
```http
DELETE /categories/:id
```

Response Schema:
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

### Orders

#### Create Order
```http
POST /orders
```

Request Schema:
```json
{
  "items": [
    {
      "itemId": "string",
      "quantity": "number"
    }
  ],
  "customerName": "string",
  "customerEmail": "string",
  "shippingAddress": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "orderNumber": "string",
    "items": [
      {
        "itemId": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "total": "number",
    "status": "pending",
    "customerName": "string",
    "customerEmail": "string",
    "shippingAddress": "string",
    "createdAt": "string"
  }
}
```

#### Get All Orders
```http
GET /orders
```

Query Parameters:
- `page`: number (default: 1)
- `limit`: number (default: 10)
- `status`: string (optional)
- `startDate`: string (optional)
- `endDate`: string (optional)

Response Schema:
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "string",
        "orderNumber": "string",
        "items": [
          {
            "itemId": "string",
            "quantity": "number",
            "price": "number"
          }
        ],
        "total": "number",
        "status": "string",
        "customerName": "string",
        "customerEmail": "string",
        "shippingAddress": "string",
        "createdAt": "string"
      }
    ],
    "pagination": {
      "total": "number",
      "page": "number",
      "limit": "number",
      "pages": "number"
    }
  }
}
```

#### Get Order by ID
```http
GET /orders/:id
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "orderNumber": "string",
    "items": [
      {
        "itemId": "string",
        "quantity": "number",
        "price": "number"
      }
    ],
    "total": "number",
    "status": "string",
    "customerName": "string",
    "customerEmail": "string",
    "shippingAddress": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

#### Update Order Status
```http
PUT /orders/:id/status
```

Request Schema:
```json
{
  "status": "pending" | "processing" | "shipped" | "delivered" | "cancelled"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "string",
    "updatedAt": "string"
  }
}
```

#### Cancel Order
```http
POST /orders/:id/cancel
```

Request Schema:
```json
{
  "reason": "string"
}
```

Response Schema:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "cancelled",
    "cancellationReason": "string",
    "updatedAt": "string"
  }
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "message": "string",
    "details": "object"
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "message": "Unauthorized access"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "message": "Insufficient permissions"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal server error"
  }
}
``` 