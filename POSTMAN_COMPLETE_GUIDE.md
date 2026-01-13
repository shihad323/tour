# 📮 Postman Complete API Testing Guide

## 🚀 What is Postman?

Postman is a tool that lets you test APIs without code. Instead of writing `curl` commands or JavaScript, you click buttons and fill in forms.

---

## 📥 Step 1: Download & Install Postman

1. Go to: https://www.postman.com/downloads/
2. Download for **Windows**
3. Install it (just click Next → Next → Finish)
4. Open Postman

---

## 📋 Step 2: Create a New Collection

A "Collection" is a folder for organizing all your API tests.

### In Postman:
1. Click **"+ Create"** (top left)
2. Click **"Collection"**
3. Name it: `Tour App API`
4. Click **Create**

---

## 🔧 Step 3: Set Up Environment Variables

Environment variables let you reuse values (like your token).

### Create Environment:
1. Click **Environments** (left sidebar)
2. Click **"+ Create"**
3. Name: `Local Development`
4. Add these variables:

| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:5000/api/v1` |
| `token` | (leave blank - we'll set it after login) |
| `userId` | (leave blank - we'll set it after login) |

5. Click **Save**

### Use the environment:
- Top right corner, select: `Local Development`

---

## 🔑 API #1: Register New User

### Setup Request:
1. Click **"+ Add request"** in your collection
2. Name: `Register User`
3. Method: **POST**
4. URL: `{{baseUrl}}/users/register`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

### Body Tab:
1. Click **"Body"**
2. Select **"raw"**
3. Select **"JSON"** (dropdown on right)
4. Paste:
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123",
  "phone": "01234567890",
  "address": "Test Address"
}
```

### Click **Send**

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "User"
  }
}
```

---

## 🔐 API #2: Login User

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Login User`
3. Method: **POST**
4. URL: `{{baseUrl}}/users/login`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

### Body Tab (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Click **Send**

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### ⚠️ IMPORTANT: Save the Token

1. After successful login, copy the **token** value
2. Go to **Environments** → **Local Development**
3. In the `token` row, paste it in the "Current value" field
4. Click **Save**

Now all future requests will automatically include your token! ✨

---

## 👤 API #3: Get User Profile

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get User Profile`
3. Method: **GET**
4. URL: `{{baseUrl}}/users/profile`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{token}}` |
| `Content-Type` | `application/json` |

### Body: Leave empty

### Click **Send**

**Expected Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "phone": "01234567890"
  }
}
```

---

## 🎫 API #4: Get All Tours

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get All Tours`
3. Method: **GET**
4. URL: `{{baseUrl}}/tours`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Content-Type` | `application/json` |

### Body: Leave empty

### Click **Send**

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Tours retrieved successfully",
  "data": [
    {
      "_id": "...",
      "title": "Paris City Tour",
      "slug": "paris-city-tour",
      "costFrom": 1500,
      "location": "Paris, France",
      "startDate": "2024-12-10",
      "endDate": "2024-12-15"
    },
    ...more tours
  ]
}
```

---

## 🔍 API #5: Get Tour by ID

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get Tour by ID`
3. Method: **GET**
4. URL: `{{baseUrl}}/tours/TOUR_ID_HERE`

### How to get Tour ID:
- First do: "Get All Tours" request
- Copy the `_id` from any tour
- Replace `TOUR_ID_HERE` in the URL

### Example:
```
{{baseUrl}}/tours/6755a1b2c3d4e5f6g7h8i9j0
```

### Click **Send**

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Tour retrieved successfully",
  "data": {
    "_id": "...",
    "title": "Paris City Tour",
    "slug": "paris-city-tour",
    "description": "Explore the magic of Paris...",
    "costFrom": 1500,
    "location": "Paris, France",
    "startDate": "2024-12-10",
    "endDate": "2024-12-15",
    "images": ["url1", "url2"],
    "amenities": ["Hotel", "Breakfast", "Guide"]
  }
}
```

---

## 🏨 API #6: Get Tour by Slug

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get Tour by Slug`
3. Method: **GET**
4. URL: `{{baseUrl}}/tours/slug/paris-city-tour`

### Example Slugs (from seeded data):
- `paris-city-tour`
- `maldives-beach-resort`
- `swiss-mountain-trek`
- `thailand-adventure`
- `new-zealand-bungee`

### Click **Send**

**Expected Response (200):** Same as "Get Tour by ID"

---

## 🔎 API #7: Search Tours

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Search Tours`
3. Method: **GET**
4. URL: `{{baseUrl}}/tours/search?searchTerm=paris`

### Query Parameters:
| Parameter | Value |
|-----------|-------|
| `searchTerm` | `paris` |

### How to add in Postman:
1. Click **"Params"** tab
2. Add:
   - Key: `searchTerm`
   - Value: `paris`
3. Click **Send**

**Expected Response:** Tours containing "paris" in title/description

---

## 🎟️ API #8: Get All Tour Types

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get Tour Types`
3. Method: **GET**
4. URL: `{{baseUrl}}/tours/tour-types`

### Click **Send**

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Tour types retrieved successfully",
  "data": [
    {
      "_id": "...",
      "name": "Beach Resort",
      "description": "Relaxing beach destinations"
    },
    {
      "_id": "...",
      "name": "Mountain Trek",
      "description": "Adventure mountain trails"
    },
    ...more types
  ]
}
```

---

## 🛫 API #9: Create Booking

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Create Booking`
3. Method: **POST**
4. URL: `{{baseUrl}}/bookings`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{token}}` |
| `Content-Type` | `application/json` |

### Body Tab (raw JSON):
```json
{
  "tourId": "TOUR_ID_HERE",
  "guestCount": 2,
  "phone": "01234567890",
  "address": "123 Main Street",
  "bookingDate": "2024-12-20"
}
```

### Replace `TOUR_ID_HERE`:
- Get a tour ID from "Get All Tours" request
- Paste it in the body

### Click **Send**

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "...",
    "userId": "...",
    "tourId": "...",
    "guestCount": 2,
    "status": "Pending"
  }
}
```

---

## 📅 API #10: Get All Bookings

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get All Bookings`
3. Method: **GET**
4. URL: `{{baseUrl}}/bookings`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{token}}` |
| `Content-Type` | `application/json` |

### Click **Send**

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Bookings retrieved successfully",
  "data": [
    {
      "_id": "...",
      "userId": "...",
      "tourId": {...},
      "guestCount": 2,
      "status": "Pending"
    }
  ]
}
```

---

## 🪧 API #11: Get Booking by ID

### Setup Request:
1. Click **"+ Add request"**
2. Name: `Get Booking by ID`
3. Method: **GET**
4. URL: `{{baseUrl}}/bookings/BOOKING_ID_HERE`

### Headers Tab:
| Key | Value |
|-----|-------|
| `Authorization` | `Bearer {{token}}` |
| `Content-Type` | `application/json` |

### Replace `BOOKING_ID_HERE`:
- Get a booking ID from "Get All Bookings"
- Paste it in the URL

### Click **Send**

**Expected Response (200):** Single booking object

---

## ✅ Test Sequence: Complete Flow

Follow this order to test everything:

### 1️⃣ **Register a New User**
   - Request: `Register User`
   - Body: Use different email each time
   - Save response

### 2️⃣ **Login** 
   - Request: `Login User`
   - Body: Use the email from step 1
   - **SAVE THE TOKEN** in environment

### 3️⃣ **Get Profile**
   - Request: `Get User Profile`
   - Should show your user info

### 4️⃣ **Get All Tours**
   - Request: `Get All Tours`
   - Save a tour `_id`

### 5️⃣ **Get Tour Details**
   - Request: `Get Tour by ID`
   - Use `_id` from step 4

### 6️⃣ **Search Tours**
   - Request: `Search Tours`
   - Search for: "paris"

### 7️⃣ **Get Tour Types**
   - Request: `Get Tour Types`
   - See all available tour types

### 8️⃣ **Create Booking**
   - Request: `Create Booking`
   - Use tour `_id` from step 4
   - Set guestCount: 2

### 9️⃣ **Get All Bookings**
   - Request: `Get All Bookings`
   - Should show your booking from step 8

### 🔟 **Get Booking Details**
   - Request: `Get Booking by ID`
   - Use booking `_id` from step 9

---

## 💡 Pro Tips

### Using Variables in URLs
Instead of hardcoding IDs, use variables:
```
{{baseUrl}}/tours/{{tourId}}
```

Then in **Environments** add:
- `tourId`: (copy/paste a real ID)

### Save Response as Variable
After a request returns data:

1. Click **Tests** tab
2. Paste:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.data.token);
pm.environment.set("userId", jsonData.data._id);
```
3. Send request → Variables auto-save!

### See Full Response
Click on response to expand and see all fields

### Check Status Codes
- ✅ **200** = Success
- ✅ **201** = Created success
- ❌ **400** = Bad request (check your data)
- ❌ **401** = Unauthorized (token missing/expired)
- ❌ **404** = Not found (wrong ID)
- ❌ **500** = Server error (backend crashed)

---

## 🐛 Troubleshooting

### Error: "Cannot GET /users/profile"
- **Solution**: Make sure you used POST for login, not GET
- Check the Method is correct

### Error: "Invalid email or password"
- **Solution**: Check credentials are correct
- Seeded user: `john@example.com` / `password123`

### Error: "Authorization token is missing"
- **Solution**: You forgot the token in headers
- Go back to Login and copy token to environment
- Add header: `Authorization: Bearer {{token}}`

### Error: "Server running on port 5000 failed to start"
- **Solution**: Backend isn't running
- Terminal 1: `cd g:\tour\back && npm start`
- Wait for: `🚀 Server running on http://localhost:5000`

### Error: "ECONNREFUSED localhost:5000"
- **Solution**: Same as above - start backend!

---

## 📊 Quick Reference: All Endpoints

| # | Method | Endpoint | Auth? | Purpose |
|---|--------|----------|-------|---------|
| 1 | POST | `/users/register` | ❌ | Create account |
| 2 | POST | `/users/login` | ❌ | Login & get token |
| 3 | GET | `/users/profile` | ✅ | Get my info |
| 4 | GET | `/tours` | ❌ | All tours |
| 5 | GET | `/tours/:id` | ❌ | Tour details |
| 6 | GET | `/tours/slug/:slug` | ❌ | Tour by slug |
| 7 | GET | `/tours/search` | ❌ | Search tours |
| 8 | GET | `/tours/tour-types` | ❌ | Tour categories |
| 9 | POST | `/bookings` | ✅ | Create booking |
| 10 | GET | `/bookings` | ✅ | My bookings |
| 11 | GET | `/bookings/:id` | ✅ | Booking details |

✅ = Requires Authorization header with token

---

## 🎯 Your Complete Testing Checklist

- [ ] Downloaded and installed Postman
- [ ] Created collection: "Tour App API"
- [ ] Created environment: "Local Development"
- [ ] Set baseUrl: `http://localhost:5000/api/v1`
- [ ] Created all 11 API requests
- [ ] Tested Register User
- [ ] Tested Login User (saved token)
- [ ] Tested Get Profile
- [ ] Tested Get All Tours
- [ ] Tested Get Tour by ID
- [ ] Tested Search Tours
- [ ] Tested Get Tour Types
- [ ] Tested Create Booking
- [ ] Tested Get All Bookings
- [ ] Tested Get Booking by ID

✅ All checked? **You're a Postman expert!** 🚀

---

## 📚 Additional Resources

- **Postman Docs**: https://learning.postman.com
- **API Testing Best Practices**: Check Postman learning center
- **JWT Tokens**: Explained in API headers section above

---

**Happy Testing!** 🎉
