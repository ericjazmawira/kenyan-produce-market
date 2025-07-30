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

1. **Clone the repo**

```bash
git clone https://github.com/ericjazmawira/kenyan-produce-market.git
cd kenyan-produce-market

2. **Frontend Setup**
cd frontend
pnpm install
pnpm dev

3. **Backend Setup**

cd backend
pnpm install
cp .env.example .env  # then edit with your Mongo URI
pnpm dev

4. **.env (Backend)**
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/kenyaproduce
PORT=10000
