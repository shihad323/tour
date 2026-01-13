# Tour Management MERN - Complete File Index

## 📁 Project Structure & File Listing

---

## 📚 Documentation Files (Root Directory)

### Main Documentation
| File | Purpose |
|------|---------|
| `README.md` | Complete project overview, features, and API documentation |
| `SETUP_GUIDE.md` | Step-by-step setup instructions for development |
| `IMPLEMENTATION_SUMMARY.md` | Detailed summary of what was implemented |
| `DEPENDENCIES.md` | Dependency installation and troubleshooting guide |
| `API_EXAMPLES.md` | Real-world API request examples for testing |
| `CHECKLIST.md` | Implementation checklist (this file shows completion) |
| `FILE_INDEX.md` | This file - complete file listing and organization |

---

## 🔐 Backend Files

### Configuration Files (`back/src/app/config/`)

| File | Purpose | Key Features |
|------|---------|--------------|
| `database.ts` | MongoDB connection | Mongoose connection setup |
| `db.ts` | Database initialization | Error handling, connection logging |
| `env.ts` | Environment variables | Config loading, defaults |

### User Module (`back/src/app/user/`)

| File | Purpose | Exports |
|------|---------|---------|
| `user.model.ts` | MongoDB User schema | Mongoose model with validation |
| `user.interface.ts` | TypeScript interfaces | IUser, ITourType, ITour, IBooking, IPayment |
| `user.controller.ts` | Business logic | registerUser, loginUser, getAllUsers, etc. |
| `user.route.ts` | API endpoints | All user-related routes (/register, /login, etc.) |
| `user.contoller.ts` | (Original file) | Legacy file (see user.controller.ts) |

### Tour Module (`back/src/app/tour/`)

| File | Purpose | Exports |
|------|---------|---------|
| `tour.model.ts` | MongoDB Tour schema | Mongoose model with all tour fields |
| `tour-type.model.ts` | MongoDB TourType schema | TourType model with enum validation |
| `tour.controller.ts` | Business logic | createTour, getTours, searchTours, etc. |
| `tour.route.ts` | API endpoints | All tour-related routes |

### Booking Module (`back/src/app/booking/`)

| File | Purpose | Exports |
|------|---------|---------|
| `booking.model.ts` | MongoDB Booking schema | Mongoose model with references |
| `payment.model.ts` | MongoDB Payment schema | Payment tracking model |
| `booking.controller.ts` | Business logic | createBooking, getBookings, cancelBooking, etc. |
| `booking.route.ts` | API endpoints | All booking and payment routes |

### Main Backend Files

| File | Location | Purpose |
|------|----------|---------|
| `app.ts` | `back/src/` | Express app initialization and route mounting |
| `server.ts` | `back/src/` | Server startup with MongoDB connection |
| `package.json` | `back/` | Dependencies and scripts |
| `tsconfig.json` | `back/` | TypeScript configuration |
| `.env.example` | `back/` | Environment variables template |

---

## 🎨 Frontend Files

### API Client (`front/tour_front/src/api/`)

| File | Purpose |
|------|---------|
| `client.ts` | Axios instance, API methods for all resources |

### Context Providers (`front/tour_front/src/context/`)

| File | Purpose | Exports |
|------|---------|---------|
| `AuthContext.tsx` | Authentication state management | AuthProvider, useAuth hook |
| `TourContext.tsx` | Tour data state management | TourProvider, useTour hook |

### Components (`front/tour_front/src/components/`)

| File | Purpose | Features |
|------|---------|----------|
| `Navbar.tsx` | Navigation component | Responsive menu, user profile, auth buttons |
| `Navbar.css` | Navbar styling | Mobile menu, hover effects |
| `TourCard.tsx` | Tour card component | Tour preview, image, price, link |
| `TourCard.css` | Tour card styling | Hover animations, responsive layout |

### Pages (`front/tour_front/src/pages/`)

| File | Purpose | Features |
|------|---------|----------|
| `Home.tsx` | Home page | Hero section, tour grid, pagination |
| `Home.css` | Home page styling | Responsive grid, hero styling |
| `Login.tsx` | Login page | Email/password form, validation |
| `Register.tsx` | Registration page | Full registration form, password match |
| `Auth.css` | Auth pages styling | Form styling, error messages |
| `TourDetail.tsx` | Tour detail page | Full tour info, booking form, itinerary |
| `TourDetail.css` | Tour detail styling | Sidebar layout, booking card |
| `MyBookings.tsx` | Bookings page | Booking list, status display, cancel option |
| `MyBookings.css` | Bookings styling | List layout, status badges |

### Types (`front/tour_front/src/types/`)

| File | Purpose |
|------|---------|
| `index.ts` | TypeScript interfaces and types for all data models |

### Main Frontend Files

| File | Location | Purpose |
|------|----------|---------|
| `App.jsx` | `front/tour_front/src/` | Main app with routing and providers |
| `App.css` | `front/tour_front/src/` | Global styling and animations |
| `main.jsx` | `front/tour_front/src/` | React entry point (unchanged) |
| `index.html` | `front/tour_front/` | HTML entry point (unchanged) |
| `vite.config.ts` | `front/tour_front/` | Vite build configuration |
| `package.json` | `front/tour_front/` | Dependencies and scripts |
| `.env.example` | `front/tour_front/` | Environment variables template |

---

## 📊 File Statistics

### Backend
- **Total Files**: 13
- **Models**: 5
- **Controllers**: 3
- **Routes**: 3
- **Configuration**: 3
- **Server Files**: 2
- **Config Files**: 2 (package.json, tsconfig.json, .env.example)

### Frontend
- **Total Files**: 22
- **Components**: 2
- **Pages**: 5
- **Styles**: 6
- **Context**: 2
- **API Client**: 1
- **Types**: 1
- **Entry Points**: 2
- **Config Files**: 3 (package.json, vite.config, .env.example)

### Documentation
- **Total Files**: 7
- **Guides**: 2
- **References**: 2
- **Examples**: 1
- **Checklists**: 2

### Grand Total
- **All Files**: ~42 source files
- **Documentation Files**: 7
- **Configuration Files**: 7

---

## 🔄 File Dependencies

### Backend File Dependencies
```
server.ts
  ↓
app.ts
  ├── user.route.ts
  │   └── user.controller.ts
  │       └── user.model.ts
  ├── tour.route.ts
  │   ├── tour.controller.ts
  │   │   ├── tour.model.ts
  │   │   └── tour-type.model.ts
  ├── booking.route.ts
  │   ├── booking.controller.ts
  │   │   ├── booking.model.ts
  │   │   ├── payment.model.ts
  │   │   ├── user.model.ts
  │   │   └── tour.model.ts
  └── config/
      ├── env.ts
      └── database.ts
```

### Frontend File Dependencies
```
main.jsx
  ↓
App.jsx (with AuthProvider & TourProvider)
  ├── Navbar.tsx
  │   └── useAuth hook from AuthContext
  ├── Routes (All pages)
  │   ├── Home.tsx → useTour hook, TourCard component
  │   ├── Login.tsx → useAuth hook
  │   ├── Register.tsx → useAuth hook
  │   ├── TourDetail.tsx → useTour hook, useAuth hook
  │   └── MyBookings.tsx → useAuth hook
  ├── AuthContext.tsx → api/client.ts
  └── TourContext.tsx → api/client.ts
```

---

## 📝 File Modification Summary

### Created Files: 26
- Backend Models: 5
- Backend Controllers: 3
- Backend Routes: 3
- Frontend Components: 2
- Frontend Pages: 5
- Frontend Contexts: 2
- Frontend Other: 3
- Documentation: 7

### Modified Files: 3
- `back/package.json` - Added bcryptjs
- `back/src/app.ts` - Added routes
- `back/src/app/config/env.ts` - Added JWT_SECRET
- `front/tour_front/src/App.jsx` - Complete rewrite with routing
- `front/tour_front/src/App.css` - Complete rewrite

---

## 🎯 Key Files to Know

### Most Important Backend Files
1. `back/src/server.ts` - Start here to understand server startup
2. `back/src/app.ts` - All routes are mounted here
3. `back/src/app/user/user.controller.ts` - Authentication logic
4. `back/src/app/booking/booking.controller.ts` - Core business logic

### Most Important Frontend Files
1. `front/tour_front/src/App.jsx` - Main routing and layout
2. `front/tour_front/src/context/AuthContext.tsx` - Auth management
3. `front/tour_front/src/pages/Home.tsx` - Main user interface
4. `front/tour_front/src/api/client.ts` - API communication

---

## 🔍 Finding Code by Feature

### User Authentication
- Backend: `back/src/app/user/user.controller.ts` (registerUser, loginUser)
- Backend: `back/src/app/user/user.route.ts` (/register, /login)
- Frontend: `front/tour_front/src/context/AuthContext.tsx` (useAuth)
- Frontend: `front/tour_front/src/pages/Login.tsx`, `Register.tsx`

### Tour Management
- Backend: `back/src/app/tour/tour.controller.ts` (CRUD, search)
- Backend: `back/src/app/tour/tour.route.ts`
- Frontend: `front/tour_front/src/context/TourContext.tsx` (useTour)
- Frontend: `front/tour_front/src/pages/Home.tsx` (list)
- Frontend: `front/tour_front/src/pages/TourDetail.tsx` (detail)

### Booking System
- Backend: `back/src/app/booking/booking.controller.ts` (CRUD, cancel)
- Backend: `back/src/app/booking/booking.route.ts`
- Frontend: `front/tour_front/src/pages/TourDetail.tsx` (create)
- Frontend: `front/tour_front/src/pages/MyBookings.tsx` (view, manage)

### Payment Tracking
- Backend: `back/src/app/booking/payment.model.ts` (schema)
- Backend: `back/src/app/booking/booking.controller.ts` (logic)
- Backend: `back/src/app/booking/booking.route.ts` (endpoints)
- Frontend: `front/tour_front/src/pages/MyBookings.tsx` (display)

---

## 📋 Configuration Files to Customize

### Before Running
1. `back/.env.example` → Copy to `back/.env`
   - Add MongoDB URI
   - Add JWT_SECRET

2. `front/tour_front/.env.example` → Copy to `front/tour_front/.env`
   - Configure API_URL if needed

3. `back/package.json` - Review dependencies
4. `front/tour_front/package.json` - Review dependencies

---

## 🚀 Deployment Checklist

### Backend Deployment Files
- [ ] `back/package.json` - Has all required dependencies
- [ ] `back/src/server.ts` - Configured for production
- [ ] `back/src/app/config/env.ts` - Uses environment variables
- [ ] `back/.env` - All production values set
- [ ] `back/tsconfig.json` - TypeScript configured

### Frontend Deployment Files
- [ ] `front/tour_front/package.json` - Has all required dependencies
- [ ] `front/tour_front/vite.config.ts` - Build configured
- [ ] `front/tour_front/.env` - API URL pointing to production backend
- [ ] `front/tour_front/src/api/client.ts` - Uses environment variables
- [ ] `front/tour_front/tsconfig.json` - TypeScript configured

---

## 📚 Learning Path

### For Backend Development
1. Start with: `back/src/server.ts`
2. Then: `back/src/app.ts`
3. Then: `back/src/app/config/env.ts`
4. Then: `back/src/app/user/user.model.ts`
5. Then: `back/src/app/user/user.controller.ts`
6. Then: `back/src/app/user/user.route.ts`

### For Frontend Development
1. Start with: `front/tour_front/src/App.jsx`
2. Then: `front/tour_front/src/context/AuthContext.tsx`
3. Then: `front/tour_front/src/pages/Home.tsx`
4. Then: `front/tour_front/src/components/TourCard.tsx`
5. Then: `front/tour_front/src/pages/TourDetail.tsx`

### For Database Understanding
1. Start with: `back/src/app/user/user.model.ts`
2. Then: `back/src/app/tour/tour.model.ts`
3. Then: `back/src/app/booking/booking.model.ts`
4. Then: `back/src/app/booking/payment.model.ts`

---

## 🔗 Quick Links

| Task | File |
|------|------|
| Add new API endpoint | See corresponding route file |
| Add new page | Create in `front/tour_front/src/pages/` |
| Add new component | Create in `front/tour_front/src/components/` |
| Add new database model | Create in `back/src/app/{module}/` |
| Change API base URL | Edit `front/tour_front/src/api/client.ts` |
| Change database URI | Edit `back/.env` |
| Add authentication header | Edit `front/tour_front/src/api/client.ts` |
| Change JWT secret | Edit `back/.env` |

---

## 📞 File Organization Principles

- **Models**: One file per entity, contains schema definition
- **Controllers**: One file per entity, contains business logic
- **Routes**: One file per entity, defines all endpoints
- **Pages**: One file per page route, full page component
- **Components**: Reusable UI components, one per file
- **Context**: State management providers, one per context
- **Styles**: One CSS file per component/page for scoping

---

**Last Updated:** December 3, 2024
**Total Implementation Time:** Complete
**Status:** ✅ Ready for Use
