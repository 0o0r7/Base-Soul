# Base Soul

A Farcaster Mini App that analyzes a user's Farcaster activity and generates a unique Soul Color, visual aura, and Archetype with explainable reasoning.

## Features

- **Soul Analysis**: Analyzes Farcaster activity to determine behavioral signals
- **Visual Soul Orb**: Animated, multi-layered orb visualization
- **Archetype Classification**: 12 unique archetypes based on activity patterns
- **Shareable Results**: Share your soul to Farcaster with one click
- **OG Image Generation**: Dynamic OG images for link previews

## Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set environment variables**:
   Create a `.env.local` file:
   ```env
   NEYNAR_API_KEY=your_neynar_api_key_here
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

3. **Run development server**:
   ```bash
   pnpm dev
   ```

## Deployment

1. **Deploy to Vercel**:
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

2. **Sign Farcaster Manifest**:
   - After deployment, sign the manifest at `public/.well-known/farcaster.json`
   - Update the manifest with your production URLs
   - Use Farcaster's signing tools to generate the account association

3. **Update Manifest URLs**:
   - Replace `your-app.vercel.app` with your actual domain
   - Update icon and splash image URLs

## Architecture

- **lib/signals.ts**: Extracts behavioral signals from user data
- **lib/dimensions.ts**: Computes dimension scores (expression, social, creative, analytical)
- **lib/colorMapper.ts**: Maps dimensions to soul colors
- **lib/archetypeClassifier.ts**: Classifies users into archetypes
- **lib/soulEngine.ts**: Main orchestration engine
- **components/SoulOrb.tsx**: Animated soul visualization component

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Neynar API v2
- @vercel/og

## License

MIT

