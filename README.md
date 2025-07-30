# 🌲 Forest Focus Pomodoro

A beautiful, nature-inspired Pomodoro timer application built with Next.js 15, featuring a forest theme that helps you stay focused and productive.

![Forest Focus Pomodoro](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Sass](https://img.shields.io/badge/Sass-1.89-pink?style=for-the-badge&logo=sass)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)

## ✨ Features

### 🎯 Core Functionality

- **Customizable Pomodoro Timer** - 25-minute focus sessions with 5-minute breaks
- **Visual Progress Tracking** - Beautiful tree growth animation during sessions
- **Session Statistics** - Track completed sessions, total focus time, and productivity streaks
- **Persistent Settings** - Your preferences are saved locally
- **Keyboard Shortcuts** - Quick controls for power users

### 🎨 Design & UX

- **Forest Theme** - Calming green color palette inspired by nature
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Smooth Animations** - Engaging visual feedback and transitions
- **Accessibility First** - WCAG compliant with keyboard navigation support
- **Modern UI** - Clean, minimalist interface that reduces distractions

### ⚡ Performance

- **Optimized Bundle** - ~200KB total JavaScript for fast loading
- **Image Optimization** - WebP/AVIF support with lazy loading
- **Performance Monitoring** - Built-in Web Vitals tracking
- **PWA Ready** - Offline support and installable on devices

### 🔧 Technical Features

- **Error Boundaries** - Graceful error handling and recovery
- **Local Storage** - Persistent data without external dependencies
- **AdSense Integration** - Optional monetization support
- **SEO Optimized** - Meta tags, sitemap, and structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd forest-focus-pomodoro

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint

# Analysis & Testing
npm run build:analyze    # Build with bundle analysis
npm run build:production # Production build with optimizations
npm run type-check      # TypeScript type checking

# Deployment
npm run build:vercel    # Vercel-optimized build
```

## 🏗️ Project Structure

```
forest-focus-pomodoro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── globals.scss       # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── AdSense/          # AdSense integration
│   │   ├── Layout/           # Layout components
│   │   ├── Timer/            # Timer components
│   │   └── UI/               # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # SCSS modules and utilities
│   │   ├── components/       # Component-specific styles
│   │   ├── pages/           # Page-specific styles
│   │   ├── _mixins.scss     # Sass mixins
│   │   └── _variables.scss  # Design tokens
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── public/                  # Static assets
├── .kiro/                  # Kiro IDE configuration
├── DEPLOYMENT.md           # Deployment guide
└── README.md              # This file
```

## 🎮 Usage

### Basic Timer Operation

1. **Start a Session**: Click the play button or press `Space`
2. **Pause/Resume**: Click pause or press `Space` during a session
3. **Reset Timer**: Click reset or press `R`
4. **Open Settings**: Click settings or press `S`

### Keyboard Shortcuts

| Key     | Action                |
| ------- | --------------------- |
| `Space` | Start/Pause timer     |
| `R`     | Reset current session |
| `S`     | Open settings         |
| `Esc`   | Close modals          |

### Customization

Access the settings panel to customize:

- **Focus Duration** (1-60 minutes)
- **Break Duration** (1-30 minutes)
- **Long Break Duration** (5-60 minutes)
- **Sessions Until Long Break** (2-10 sessions)
- **Sound Notifications** (Enable/Disable)

## 🛠️ Technology Stack

### Frontend

- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - UI library with latest features
- **TypeScript 5** - Type-safe JavaScript
- **Sass 1.89** - CSS preprocessor with modern syntax

### Styling & Design

- **CSS Modules** - Scoped styling
- **Responsive Design** - Mobile-first approach
- **Custom Design System** - Consistent tokens and components
- **Accessibility** - WCAG 2.1 AA compliance

### Performance & Optimization

- **Bundle Analyzer** - Size optimization
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Web Vitals** - Performance monitoring

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting (via Kiro IDE)
- **TypeScript** - Static type checking
- **Turbopack** - Fast development builds

## 📊 Performance Metrics

### Bundle Size

- **Total First Load JS**: ~200KB
- **Home Page**: 9KB
- **About Page**: 748B
- **Contact Page**: 749B

### Core Web Vitals

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## 🚀 Deployment

### Vercel (Recommended)

The application is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Alternative Deployments

- **Docker**: See `DEPLOYMENT.md` for Docker configuration
- **Static Export**: Configure for CDN deployment
- **Self-hosted**: Node.js server deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🔧 Configuration

### Environment Variables

```bash
# Production
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Development
ANALYZE=true  # Enable bundle analysis
```

### Next.js Configuration

Key optimizations in `next.config.ts`:

- Image optimization with WebP/AVIF
- Bundle splitting and vendor chunks
- Security headers
- Compression and caching

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run type-check`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Write responsive CSS with mobile-first approach

### Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **Forest Theme Inspiration** - Nature-based productivity concepts
- **Pomodoro Technique** - Francesco Cirillo's time management method

## 📞 Support

### Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment instructions
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [React Docs](https://react.dev) - React library documentation

### Issues & Questions

- Create an issue for bugs or feature requests
- Check existing issues before creating new ones
- Provide detailed reproduction steps for bugs

### Performance Issues

- Use the built-in performance monitor (dev mode)
- Check bundle analysis: `npm run build:analyze`
- Review Web Vitals in browser dev tools

---

**Built with ❤️ and ☕ for better productivity**

_Focus better, achieve more with Forest Focus Pomodoro_ 🌲
