# 🚗 Car Management App

A modern web application for managing your car collection with rich features and a sleek UI.

## ✨ Features

- 🔐 User authentication (login/register)
- 📱 Responsive design
- 🖼️ Image carousel with animations
- 🏷️ Tag-based organization
- 🔍 Real-time search
- ⚡ Fast performance with React Query
- 💫 Smooth animations with Framer Motion

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Framer Motion
- React Hook Form
- Zustand
- Vite

### Backend
- FastAPI
- MongoDB
- JWT Authentication
- Cloudinary
- Motor (Async MongoDB driver)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- MongoDB

### Installation

1. Clone the repo:
```
git clone https://github.com/yourusername/car-management-app.git
cd car-management-app
```

2. Install frontend dependencies:
```
npm install
```

## 🔒 Authentication

The app uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests.

## 📸 Image Handling

- Supports both URL and file uploads
- Images are stored in Cloudinary
- Maximum 10 images per car
- Supports common image formats (jpg, png, webp, etc.)

## 🎨 UI Components

- Custom Button component with variants
- Reusable Input component
- Image Carousel with touch support
- Animated transitions and micro-interactions

## 🔄 State Management

- Global auth state with Zustand
- Server state with React Query
- Form state with React Hook Form