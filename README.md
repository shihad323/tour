# Tour Management MERN Application

A complete Tour Management website built with MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
tour/
├── back/                    # Backend (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── config/
│   │   │   │   ├── database.ts
│   │   │   │   └── env.ts
│   │   │   ├── user/
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── user.interface.ts
│   │   │   │   ├── user.controller.ts
│   │   │   │   └── user.route.ts
│   │   │   ├── tour/
│   │   │   │   ├── tour.model.ts
│   │   │   │   ├── tour-type.model.ts
│   │   │   │   ├── tour.controller.ts
│   │   │   │   └── tour.route.ts
│   │   │   └── booking/
│   │   │       ├── booking.model.ts
│   │   │       ├── payment.model.ts
│   │   │       ├── booking.controller.ts
│   │   │       └── booking.route.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
└── front/tour_front/         # Frontend (React + Vite)
    ├── src/
    │   ├── api/
    │   │   └── client.ts
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   ├── Navbar.css
    │   │   ├── TourCard.tsx
    │   │   └── TourCard.css
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   │   └── TourContext.tsx
    │   ├── pages/
    │   │   ├── Home.tsx
    │   │   ├── Home.css
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Auth.css
    │   │   ├── TourDetail.tsx
    │   │   ├── TourDetail.css
    │   │   ├── MyBookings.tsx
    │   │   └── MyBookings.css
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.ts
```

## Database Schema

### User
- **_id**: ObjectId (Primary Key)
- **name**: String (Required)
- **email**: String (Required, Unique)
- **password**: String (Required, Hashed)
- **role**: Enum['Admin', 'User'] (Default: 'User')
- **phone**: String (Optional)
- **picture**: String (Default: Placeholder)
- **address**: String (Optional)
- **isDeleted**: Boolean (Default: false)
- **isActive**: Enum['Active', 'Inactive'] (Default: 'Active')
- **isVerified**: Boolean (Default: false)
- **auths**: Array of Strings (Authentication providers)
- **createdAt, updatedAt**: Timestamps

### TourType
- **_id**: ObjectId (Primary Key)
- **name**: String (Enum: Adventure, Leisure, Cultural, Wildlife, Beach, Mountain, City, Historical)
- **createdAt, updatedAt**: Timestamps

### Tour
- **_id**: ObjectId (Primary Key)
- **slug**: String (Required, Unique)
- **title**: String (Required)
- **description**: String (Required)
- **images**: Array of Strings
- **location**: String (Required)
- **costFrom**: Number (Required)
- **startDate**: Date (Required)
- **endDate**: Date (Required)
- **tourType**: ObjectId (Reference to TourType)
- **included**: Array of Strings
- **excluded**: Array of Strings
- **amenities**: Array of Strings
- **tourPlan**: Array of Strings
- **isDeleted**: Boolean (Default: false)
- **createdAt, updatedAt**: Timestamps

### Booking
- **_id**: ObjectId (Primary Key)
- **user**: ObjectId (Reference to User)
- **tour**: ObjectId (Reference to Tour)
- **guestCount**: Number (Required, Min: 1)
- **phone**: String (Required)
- **address**: String (Required)
- **status**: Enum['Pending', 'Completed', 'Cancelled'] (Default: 'Pending')
- **payment**: ObjectId (Reference to Payment)
- **createdAt, updatedAt**: Timestamps

### Payment
- **_id**: ObjectId (Primary Key)
- **booking**: ObjectId (Reference to Booking, Required)
- **transactionId**: String (Required, Unique)
- **status**: Enum['Paid', 'Unpaid', 'Refunded'] (Default: 'Unpaid')
- **amount**: Number (Required)
- **paymentGatewayData**: Mixed (For payment gateway details)
- **invoiceUrl**: String (Optional)
- **createdAt, updatedAt**: Timestamps

## API Endpoints

### User Routes (`/api/v1/users`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /` - Get all users (paginated)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Soft delete user

### Tour Routes (`/api/v1/tours`)
- `POST /` - Create tour (Admin)
- `POST /types` - Create tour type
- `GET /` - Get all tours (paginated)
- `GET /types` - Get all tour types
- `GET /search?q=query` - Search tours
- `GET /slug/:slug` - Get tour by slug
- `GET /:id` - Get tour by ID
- `PUT /:id` - Update tour (Admin)
- `DELETE /:id` - Soft delete tour (Admin)

### Booking Routes (`/api/v1/bookings`)
- `POST /` - Create booking
- `GET /` - Get all bookings (Admin)
- `GET /user/:userId` - Get user bookings
- `GET /:id` - Get booking by ID
- `PUT /:id` - Update booking
- `POST /:id/cancel` - Cancel booking

### Payment Routes (`/api/v1/bookings/payment`)
- `POST /payment` - Create payment
- `GET /payment/:id` - Get payment by ID
- `PUT /payment/:id/status` - Update payment status

## Setup Instructions

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd back
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

3. **Start Backend**
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd front/tour_front
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Configure API URL if different
   ```

3. **Start Frontend**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## Features

### User Features
- ✅ User Registration and Login
- ✅ View all tours with pagination
- ✅ Search tours
- ✅ View tour details
- ✅ Book tours
- ✅ View booking history
- ✅ Cancel bookings

### Admin Features
- ✅ Create and manage tour types
- ✅ Create and manage tours
- ✅ View all bookings
- ✅ Manage payment status
- ✅ User management

## Technologies Used

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Cors** - Cross-origin requests

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **CSS** - Styling
- **Context API** - State management

## Authentication

- Uses JWT tokens stored in localStorage
- Tokens are sent with each API request via Authorization header
- Password hashing with bcryptjs (10 salt rounds)

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Advanced filtering and sorting
- [ ] User profile management
- [ ] Reviews and ratings
- [ ] Admin dashboard
- [ ] Tour guide management
- [ ] Multi-language support

## License

ISC
