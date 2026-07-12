# 🍽️ DineSpot — Restaurant Discovery & Table Booking Platform

A full-stack restaurant discovery and table booking platform built with **Next.js**, **Express.js**, **MongoDB**, and **TypeScript**. Users can explore restaurants, filter by cuisine and price, and book tables online. Restaurant owners can list and manage their restaurants through a dedicated dashboard.

![DineSpot](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200)

## 🚀 Live Demo

- **Frontend:** [dinespot.vercel.app](https://dine-spot-eta.vercel.app/)
- **Backend:** [dinespot-server.onrender.com](https://dine-spot-server-chi.vercel.app/)

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Diner | diner@dinespot.com | Demo@1234 |
| Owner | owner@dinespot.com | Demo@1234 |

---

## ✨ Features

### For Diners
- Browse and search restaurants by name, cuisine, city, and price range
- Filter by minimum rating and sort by newest or highest rated
- View detailed restaurant profiles with amenities, location, and opening hours
- Book a table with date, time, party size, and special requests
- Track and cancel bookings from personal dashboard
- Leave reviews and ratings for visited restaurants

### For Owners
- Register as a restaurant owner and list restaurants
- Upload cover images via ImgBB
- Manage restaurant listings (view, delete)
- View analytics dashboard with booking and review charts (Recharts)
- Track bookings made at their restaurants

### General
- JWT-based authentication with Better Auth
- Role-based access control (Diner / Owner)
- Fully responsive — mobile, tablet, desktop
- Skeleton loaders on all data-fetching components
- 404 and loading pages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | React framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| Better Auth | Authentication |
| Framer Motion | Animations |
| Recharts | Analytics charts |
| React Fast Marquee | Testimonials slider |
| React Icons | Icon library |
| ImgBB API | Image uploads |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express.js | REST API |
| TypeScript | Type-safe backend |
| MongoDB (Native Driver) | Database |
| Better Auth | Session management |

---

## 📁 Project Structure

```
dinespot/
├── dinespot-client/          # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       # Login, Register
│   │   │   ├── (protected)/  # Add & Manage Restaurants
│   │   │   ├── restaurants/  # Listing & Details
│   │   │   ├── bookings/     # My Bookings
│   │   │   ├── analytics/    # Owner Analytics
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   └── contact/
│   │   ├── components/
│   │   │   ├── home/         # Hero, Cuisines, Stats, etc.
│   │   │   └── shared/       # Navbar, Footer, ProtectedRoute
│   │   └── lib/
│   │       ├── auth.ts       # Better Auth config
│   │       └── auth-client.ts
│
└── dinespot-server/          # Express.js Backend
    └── src/
        ├── config/           # MongoDB connection
        ├── controllers/      # Business logic
        ├── routes/           # API routes
        └── app.ts            # Entry point
```

---

## 🔌 API Endpoints

### Restaurants
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/restaurants` | Get all restaurants (search, filter, sort, paginate) |
| GET | `/api/restaurants/:id` | Get single restaurant |
| GET | `/api/restaurants/owner?ownerId=` | Get owner's restaurants |
| POST | `/api/restaurants` | Create restaurant |
| DELETE | `/api/restaurants/:id` | Delete restaurant |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/diner?userId=` | Get diner's bookings |
| GET | `/api/bookings/restaurant/:id` | Get restaurant's bookings |
| DELETE | `/api/bookings/:id` | Cancel booking |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/:restaurantId` | Get restaurant reviews |
| POST | `/api/reviews` | Submit review |
| DELETE | `/api/reviews/:id` | Delete review |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 20+
- MongoDB Atlas account
- ImgBB API key

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/dinespot.git
cd dinespot
```

### 2. Setup Backend

```bash
cd dinespot-server
npm install
```

Create `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd dinespot-client
npm install
```

Create `.env.local`:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

```bash
npm run dev
```

Visit `http://localhost:3000` 🚀

---

## 🚢 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Images | ImgBB |

---

## 🎨 Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Green | `#00B37D` |
| Dark | Near Black | `#1C1C1E` |
| Accent | Orange | `#FF6B35` |
| Neutral | Off White | `#F7F7F7` |

---

## 📸 Screenshots

> Add screenshots of your app here after deployment.

---

## 👨‍💻 Author

**Tamim** — Full Stack Developer
- GitHub: [@Tamim379ta](https://github.com/Tamim379ta)
- LinkedIn: [linkedin.com/in/tamimtahsan](https://linkedin.com/in/tamimtahsan)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
