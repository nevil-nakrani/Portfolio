# Nevil Nakrani — Portfolio 🚀

Welcome to my personal developer portfolio! I am a Full-Stack Developer specializing in the **MERN Stack**, **Odoo ERP**, and **AI Integrations (LangChain)**. This portfolio itself is a full-stack application built to showcase my skills, projects, and experience.

![Portfolio Preview](./client/src/assets/hero.png) <!-- Update image path if needed -->

## ✨ Features

- **Modern UI/UX**: Built with React and Vite, featuring a sleek dark theme, glassmorphism, and fluid animations via Framer Motion.
- **Smooth Momentum Scrolling**: Powered by Lenis for a premium, physics-based browsing experience.
- **Embedded AI Chatbot**: A custom LangChain and Groq-powered AI assistant that knows everything about my skills and projects, built directly into the site!
- **Dynamic Projects Showcase**: Filterable portfolio grid displaying my work in MERN, Odoo, and AI.
- **Interactive Experience Timeline**: Custom drawn animated timeline showing my professional journey.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Framer Motion** (Animations)
- **Lenis** (Smooth Scrolling)
- **React Markdown** (AI Chat rendering)
- **Vanilla CSS** (Custom design system)

### Backend & AI
- **Node.js & Express.js**
- **MongoDB & Mongoose**
- **LangChain.js** (AI orchestrator)
- **Groq API** (LLM inference using LLaMA 3.1)

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)
- Groq API Key (for the AI chatbot)

### 1. Clone the repository
```bash
git clone https://github.com/nevil-nakrani/Portfolio.git
cd Portfolio
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:5173
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
npm run dev
```

The frontend will start at `http://localhost:5173` and the backend will run on `http://localhost:5000`.

## 🤝 Contact
Feel free to reach out to me through the contact form on the website or connect with me on [GitHub](https://github.com/nevil-nakrani)!
