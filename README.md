# Integer.IO Services Website

A modern, responsive website for Integer.IO Services built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/kawingenai-create/int-.git
cd int-
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note:** Get these values from your Supabase project dashboard at https://supabase.com

4. **Run the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🌐 Deploy to Vercel

### Option 1: One-Click Deploy
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `kawingenai-create/int-`
4. Add Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL (e.g., `https://xxxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

---

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable React components
├── contexts/        # React context providers (Theme)
├── lib/             # Library utilities (Supabase)
├── pages/           # Page components
└── App.tsx          # Main application component
```

---

## 🛠️ Built With

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Supabase** - Backend/Database
- **Recharts** - Analytics Charts
- **Lucide React** - Icons

---

## 📞 Contact

- **Email:** integer.io.ai@gmail.com
- **Phone:** +91 8015355914
- **Website:** https://integer.io

---

## 📄 License

© 2024 Integer.IO Services. All rights reserved.
