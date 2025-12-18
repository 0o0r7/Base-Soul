# Neynar API Setup

## Your Neynar Credentials

From your Neynar dashboard, I can see:

- **API Key**: `876B11AE-5090-4050-95AF-66CDA9F19537`
- **Client ID**: `a7294058-c680-46cf-a47b-e17dcd8ca8`
- **App Name**: `0o0r7.web3's App`

## Add to Vercel Environment Variables

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Project Settings**:
   - Visit: https://vercel.com/0o0r7s-projects/base-soul/settings/environment-variables

2. **Add Environment Variables**:
   
   **Variable 1:**
   - Key: `NEYNAR_API_KEY`
   - Value: `876B11AE-5090-4050-95AF-66CDA9F19537`
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

   **Variable 2:**
   - Key: `NEXT_PUBLIC_APP_URL`
   - Value: `https://base-soul.vercel.app`
   - Environment: Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy**:
   - After adding variables, go to: https://vercel.com/0o0r7s-projects/base-soul/deployments
   - Click the three dots on the latest deployment
   - Click "Redeploy"

### Method 2: Via Vercel CLI

Run these commands:

```bash
cd C:\Users\0o0r7\Desktop\base-soul
$env:VERCEL_TOKEN="Gts1e0FR27ddgqhxSnVHyl0S"

# Add NEYNAR_API_KEY (you'll be prompted to enter the value)
echo "876B11AE-5090-4050-95AF-66CDA9F19537" | vercel env add NEYNAR_API_KEY production --token $env:VERCEL_TOKEN

# Add NEXT_PUBLIC_APP_URL
echo "https://base-soul.vercel.app" | vercel env add NEXT_PUBLIC_APP_URL production --token $env:VERCEL_TOKEN
```

## Verify Setup

After adding the environment variables and redeploying:

1. Visit: https://base-soul.vercel.app
2. Try entering a Farcaster username (e.g., `vitalik`)
3. The app should now fetch data from Neynar API

## Test API Connection

You can test if the API key works by visiting:
```
https://base-soul.vercel.app/api/user/vitalik
```

If it works, you'll see JSON data. If not, check:
- Environment variables are set correctly
- Deployment was successful
- API key is valid

## Next Steps

1. ✅ Add environment variables (above)
2. ✅ Redeploy the app
3. ✅ Test with a Farcaster username
4. Update Farcaster manifest with production URL
5. Sign the manifest with your Farcaster account

