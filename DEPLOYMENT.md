# Deployment Guide

## Pre-Deployment Checklist

1. **Environment Variables**
   - Set `NEYNAR_API_KEY` in Vercel environment variables
   - Set `NEXT_PUBLIC_APP_URL` to your production URL

2. **Images**
   - Create `public/icon.png` (512x512px recommended)
   - Create `public/splash.png` (1200x630px recommended)
   - These will be used in the Farcaster manifest

3. **Farcaster Manifest**
   - After deployment, update `public/.well-known/farcaster.json`:
     - Replace `your-app.vercel.app` with your actual domain
     - Sign the manifest using Farcaster's signing tools
     - Update the `accountAssociation` fields with signed values

## Vercel Deployment

1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEYNAR_API_KEY`
     - `NEXT_PUBLIC_APP_URL` (will be set automatically, but you can override)

3. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `pnpm install` (or `npm install`)

## Post-Deployment

1. **Update Manifest URLs**
   - Edit `public/.well-known/farcaster.json`
   - Replace all instances of `your-app.vercel.app` with your actual Vercel URL
   - Commit and push changes

2. **Sign Manifest**
   - Use Farcaster's manifest signing tool
   - Update the `accountAssociation` object with signed values
   - Commit and push the signed manifest

3. **Test**
   - Visit your deployed URL
   - Test with a Farcaster username
   - Verify OG image generation at `/api/og`
   - Test share functionality

## Troubleshooting

- **API Errors**: Check that `NEYNAR_API_KEY` is set correctly
- **OG Images**: Verify edge runtime is working (check Vercel logs)
- **Share Links**: Ensure `NEXT_PUBLIC_APP_URL` matches your deployment URL





