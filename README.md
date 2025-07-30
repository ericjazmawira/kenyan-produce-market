# Kenyan Produce Market 🌾🇰🇪

An online marketplace connecting **farmers**, **buyers**, and **transporters** in Kenya.  
Built to streamline agricultural commerce and logistics through a simple, mobile-friendly platform.

## 🌐 Live Site

🔗 [Visit the App on Vercel](https://kenyan-produce-market.vercel.app/)

## 📦 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS + ShadCN  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Deployment:**  
  - Frontend: Vercel  
  - Backend: Render  
  - Database: MongoDB Atlas

---

## 🚀 Features

- 👩‍🌾 Farmers can list produce  
- 🛒 Buyers can browse and book  
- 🚚 Transporters can find delivery jobs  
- 🔐 Role-based access control  
- 📱 Optimized for mobile (WhatsApp-first design)

---

## 🛠️ Local Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/ericjazmawira/kenyan-produce-market.git
cd kenyan-produce-market
```

### 2–4. Frontend & Backend Setup

```bash
# FRONTEND
cd frontend
pnpm install
pnpm dev
```

```bash
# BACKEND
cd ../backend
pnpm install
cp .env.example .env  # Create a .env file manually if .env.example does not exist
pnpm dev
```

```env
# .env file contents (inside /backend)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/kenyaproduce
PORT=10000
```

> ✅ Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials.

---

## 🧪 How to Test

Use [Postman](https://postman.com) or your browser to test the backend:

```http
GET https://your-backend-url.onrender.com/api/ping
```

Expected response:

```json
{ "message": "pong" }
```

---

---

## 🙌 Acknowledgements

This project was built as part of the **Power Learn Project Software Develeopment Scholarship (PLP)** – MERN-STACK

Special thanks to:
- Supabase (for initial backend structure)
- MongoDB Atlas (database)
- Render and Vercel (deployment)