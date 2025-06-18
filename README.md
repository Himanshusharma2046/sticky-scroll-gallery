# 🎨 Sticky Scroll Gallery

A modern, immersive sticky scroll gallery built with React, Framer Motion, and Tailwind CSS. Experience smooth transitions, dynamic backgrounds, and engaging animations as you scroll through different sections.

[![Netlify Status](https://api.netlify.com/api/v1/badges/11f3c1-startling-duckanoo/deploy-status)](https://app.netlify.com/sites/startling-duckanoo-11f3c1/deploys)

## 🚀 Live Demo

**[View Live Demo](https://startling-duckanoo-11f3c1.netlify.app/)**

## ✨ Features

- **🎭 Immersive Sticky Backgrounds** - Dynamic background images that change as you scroll
- **🌊 Smooth Animations** - Powered by Framer Motion for buttery-smooth transitions
- **📱 Fully Responsive** - Optimized for all device sizes and screen orientations
- **🎨 Modern Design** - Glass morphism effects and gradient overlays
- **⚡ Performance Optimized** - Image preloading and lazy loading for fast performance
- **🎯 Interactive Navigation** - Dot navigation and smooth scroll-to-section
- **🔄 Scroll Progress** - Visual progress indicator at the top
- **🎪 Particle Effects** - Animated particles for enhanced visual appeal
- **♿ Accessible** - Built with accessibility best practices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Animation Library**: Framer Motion
- **Styling**: Tailwind CSS
- **Build Tool**: Create React App
- **Deployment**: Netlify
- **Image Optimization**: Unsplash API integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sticky-scroll-gallery.git
   cd sticky-scroll-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up images**
   ```bash
   mkdir public/images
   ```

4. **Download required images**
   ```bash
   # Hero background
   curl -o public/images/hero-bg.jpg "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
   
   # Section 1
   curl -o public/images/section1.jpg "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
   
   # Section 2
   curl -o public/images/section2.jpg "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
   
   # Section 3
   curl -o public/images/section3.jpg "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
sticky-scroll-gallery/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── section1.jpg
│   │   ├── section2.jpg
│   │   └── section3.jpg
│   └── index.html
├── src/
│   ├── components/
│   │   ├── StickyScrollGallery.jsx
│   │   ├── StickyImage.jsx
│   │   ├── ScrollSection.jsx
│   │   └── NavigationDots.jsx
│   ├── data/
│   │   └── sectionsData.js
│   ├── hooks/
│   │   └── useScrollPosition.js
│   ├── utils/
│   │   └── scrollUtils.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.js
│   └── index.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```


## 🚀 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy!

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔧 Performance Optimizations

- **Image Preloading** - All images are preloaded for smooth transitions
- **Throttled Scroll Events** - Optimized scroll event handling
- **Lazy Loading** - Components load only when needed
- **Optimized Animations** - Hardware-accelerated CSS transforms
- **Compressed Images** - WebP format with fallbacks
