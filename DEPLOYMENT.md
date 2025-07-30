# Forest Focus Pomodoro - Deployment Guide

## Overview

This document provides comprehensive instructions for deploying the Forest Focus Pomodoro application to production environments, with specific focus on Vercel deployment.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository access
- Vercel account (for Vercel deployment)

## Build Process

### Local Production Build

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Test production build locally
npm run start
```

### Build Scripts

- `npm run build` - Standard Next.js production build
- `npm run build:production` - Production build with NODE_ENV set
- `npm run build:analyze` - Build with bundle analysis
- `npm run build:vercel` - Vercel-optimized build

## Deployment Configurations

### Vercel Deployment (Recommended)

The application is optimized for Vercel deployment with the following configuration:

#### vercel.json Configuration

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/**/*.tsx": { "maxDuration": 10 },
    "app/**/*.ts": { "maxDuration": 10 }
  }
}
```

#### Deployment Steps

1. **Connect Repository**

   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   Set the following environment variables in Vercel dashboard:

   - `NODE_ENV=production`
   - `NEXT_TELEMETRY_DISABLED=1`

3. **Domain Configuration**
   - Configure custom domain in Vercel dashboard
   - Set up SSL certificates (automatic with Vercel)

### Alternative Deployment Options

#### Docker Deployment

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Static Export (for CDN deployment)

```bash
# Add to next.config.ts
output: 'export',
trailingSlash: true,
images: {
  unoptimized: true
}

# Build and export
npm run build
```

## Performance Optimizations

### Bundle Analysis

The application includes bundle analysis tools:

```bash
# Analyze bundle size
npm run build:analyze
```

### Performance Metrics

- **First Load JS**: ~200KB (optimized)
- **Page Sizes**:
  - Home: ~9KB
  - About: ~748B
  - Contact: ~749B

### Optimization Features

1. **Image Optimization**

   - Next.js Image component with WebP/AVIF support
   - Responsive image loading
   - Lazy loading by default

2. **Code Splitting**

   - Automatic route-based code splitting
   - Dynamic imports for heavy components
   - Vendor chunk optimization

3. **Caching Strategy**

   - Static assets: 1 year cache
   - Images: 1 year cache with immutable headers
   - API responses: Appropriate cache headers

4. **Compression**
   - Gzip compression enabled
   - Brotli compression (Vercel automatic)

## Environment Variables

### Required Variables

- `NODE_ENV` - Set to "production" for production builds
- `NEXT_TELEMETRY_DISABLED` - Set to "1" to disable Next.js telemetry

### Optional Variables

- `ANALYZE` - Set to "true" to enable bundle analysis
- `CUSTOM_KEY` - Application-specific configuration

## Security Headers

The application includes comprehensive security headers:

- `X-DNS-Prefetch-Control: on`
- `X-XSS-Protection: 1; mode=block`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Monitoring and Analytics

### Performance Monitoring

The application includes built-in performance monitoring:

```typescript
// Performance metrics tracked:
- Load Time
- DOM Content Loaded
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
```

### Error Tracking

- React Error Boundaries implemented
- Graceful fallbacks for component failures
- localStorage failure handling

## Troubleshooting

### Common Issues

1. **Build Failures**

   ```bash
   # Clear Next.js cache
   rm -rf .next

   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Sass Deprecation Warnings**

   - Warnings are non-blocking and don't affect functionality
   - Modern @use syntax implemented where possible
   - Legacy @import syntax maintained for compatibility

3. **Bundle Size Issues**

   ```bash
   # Analyze bundle
   npm run build:analyze

   # Check for large dependencies
   npx bundle-analyzer .next/static/chunks/*.js
   ```

### Performance Issues

1. **Slow Loading**

   - Check image optimization settings
   - Verify CDN configuration
   - Review bundle splitting

2. **Memory Issues**
   - Monitor with built-in performance tools
   - Check for memory leaks in timer components
   - Verify localStorage usage

## Deployment Checklist

### Pre-deployment

- [ ] Run `npm run build` successfully
- [ ] Test production build locally
- [ ] Verify all environment variables
- [ ] Check bundle size analysis
- [ ] Test responsive design
- [ ] Verify accessibility compliance

### Post-deployment

- [ ] Verify all pages load correctly
- [ ] Test timer functionality
- [ ] Check localStorage persistence
- [ ] Verify responsive design on mobile
- [ ] Test AdSense integration (if applicable)
- [ ] Monitor performance metrics
- [ ] Check error tracking

## Maintenance

### Regular Tasks

1. **Dependency Updates**

   ```bash
   # Check for updates
   npm outdated

   # Update dependencies
   npm update
   ```

2. **Performance Monitoring**

   - Review Core Web Vitals monthly
   - Monitor bundle size growth
   - Check error rates

3. **Security Updates**
   - Update Next.js regularly
   - Monitor security advisories
   - Review and update security headers

### Backup and Recovery

- Source code: Git repository
- Configuration: Environment variables documented
- Assets: Stored in version control
- No database backup required (localStorage only)

## Support

For deployment issues:

1. Check Next.js documentation: https://nextjs.org/docs
2. Vercel documentation: https://vercel.com/docs
3. Review application logs in deployment platform
4. Check browser console for client-side errors

## Version History

- v1.0.0 - Initial deployment configuration
- Performance optimizations implemented
- Security headers configured
- Bundle analysis tools added
