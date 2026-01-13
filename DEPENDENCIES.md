# Required Dependencies Installation

## Backend Dependencies

### Production Dependencies
```bash
npm install express cors dotenv mongoose jsonwebtoken bcryptjs
```

**Versions (from package.json):**
- `cors@^2.8.5` - Cross-Origin Resource Sharing
- `dotenv@^17.2.3` - Environment variables management
- `express@^5.1.0` - Web framework
- `jsonwebtoken@^9.0.2` - JWT authentication
- `mongoose@^8.19.3` - MongoDB ODM
- `zod@^4.1.12` - Schema validation
- `bcryptjs@^2.4.3` - Password hashing

### Development Dependencies
```bash
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors @types/jsonwebtoken @types/dotenv
```

**Versions (from package.json):**
- `typescript@^5.9.3` - TypeScript compiler
- `ts-node-dev@^2.0.0` - Development server with auto-reload
- `@types/cors@^2.8.19` - TypeScript types for CORS
- `@types/dotenv@^6.1.1` - TypeScript types for dotenv
- `@types/express@^5.0.5` - TypeScript types for Express
- `@types/jsonwebtoken@^9.0.10` - TypeScript types for JWT
- `@types/node@^24.10.0` - TypeScript types for Node.js

### Complete Backend Setup
```bash
cd back
npm install
```

---

## Frontend Dependencies

### Production Dependencies
```bash
npm install react react-dom react-router-dom axios
```

**Versions (to be added to package.json):**
- `react@^18.x` - React library
- `react-dom@^18.x` - React DOM
- `react-router-dom@^6.x` - Routing library
- `axios@^1.x` - HTTP client

### Development Dependencies
```bash
npm install --save-dev vite @vitejs/plugin-react typescript
```

**Versions (likely already in package.json):**
- `vite@^5.x` - Build tool
- `@vitejs/plugin-react@^4.x` - React plugin for Vite
- `typescript@^5.x` - TypeScript support
- ESLint and other dev tools

### Complete Frontend Setup
```bash
cd front/tour_front
npm install
```

### If axios is missing, run:
```bash
npm install axios
```

---

## Verification Commands

### Backend
```bash
cd back

# Verify installation
npm list

# Check MongoDB is installed globally (optional)
mongod --version

# Test start
npm run dev
```

### Frontend
```bash
cd front/tour_front

# Verify installation
npm list

# Check critical packages
npm list react react-router-dom axios

# Test start
npm run dev
```

---

## Installation Troubleshooting

### If `npm install` fails

**Clear npm cache:**
```bash
npm cache clean --force
```

**Delete node_modules and package-lock.json:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**For Windows:**
```bash
rmdir /s node_modules
del package-lock.json
npm install
```

### Common Issues

**Issue: MongoDB connection fails**
- Solution: Ensure MongoDB is running locally or use MongoDB Atlas connection string

**Issue: Port already in use**
- Backend: Change PORT in .env
- Frontend: Kill process on port 5173 or let Vite use next available port

**Issue: Module not found errors**
- Solution: Make sure all dependencies are installed with `npm install`

**Issue: TypeScript errors**
- Solution: Check tsconfig.json is properly configured

---

## Development Environment Setup

### 1. Node.js Version
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v7 or higher
```

### 2. Create .env Files
```bash
# Backend
cd back
cp .env.example .env

# Frontend
cd front/tour_front
cp .env.example .env
```

### 3. Edit .env Files

**Backend .env:**
```env
MONGODB_URI=mongodb://localhost:27017/tour-management
JWT_SECRET=your_secure_random_secret_key
PORT=5000
NODE_ENV=development
```

**Frontend .env:**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 4. Install MongoDB (if local)

**Windows:**
- Download from https://www.mongodb.com/try/download/community
- Run installer
- Start MongoDB service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### 5. Verify MongoDB Connection
```bash
# In new terminal
mongosh

# You should see: >
```

---

## Running the Application

### Terminal 1 - Backend
```bash
cd back
npm run dev
# Server runs on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd front/tour_front
npm run dev
# Frontend runs on http://localhost:5173
```

### Terminal 3 (Optional) - MongoDB
```bash
mongosh

# View databases
show dbs

# Switch to tour-management database
use tour-management

# View collections
show collections

# View documents
db.users.find()
db.tours.find()
```

---

## Build for Production

### Backend
```bash
cd back
npm run build
# Creates dist/ folder
npm start  # Runs production build
```

### Frontend
```bash
cd front/tour_front
npm run build
# Creates dist/ folder with optimized build
```

---

## Quick Reference

| Task | Command | Location |
|------|---------|----------|
| Install Backend deps | `npm install` | back/ |
| Install Frontend deps | `npm install` | front/tour_front/ |
| Start Backend | `npm run dev` | back/ |
| Start Frontend | `npm run dev` | front/tour_front/ |
| Build Backend | `npm run build` | back/ |
| Build Frontend | `npm run build` | front/tour_front/ |

---

## Dependency Compatibility

All dependencies are compatible with:
- **Node.js:** v16+ (tested with v18+)
- **npm:** v7+ (tested with v8+)
- **OS:** Windows, macOS, Linux

---

**Last Updated:** December 3, 2024
