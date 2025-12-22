# Troubleshooting Base Soul

## Current Issue: Cannot Connect to Farcaster/Get Data

### Status
- ✅ App deployed: https://base-soul.vercel.app
- ✅ Environment variables set in Vercel
- ❌ API endpoint returns 500 error

### Debugging Steps

1. **Check Vercel Logs**:
   ```bash
   vercel logs https://base-soul.vercel.app
   ```

2. **Test API Endpoint Directly**:
   ```bash
   curl https://base-soul.vercel.app/api/user/vitalik
   ```

3. **Verify Environment Variables**:
   - Go to: https://vercel.com/0o0r7s-projects/base-soul/settings/environment-variables
   - Ensure `NEYNAR_API_KEY` is set for Production

4. **Check Neynar API Status**:
   - Visit: https://status.neynar.com
   - Verify API is operational

### Common Issues

1. **API Key Not Loaded**:
   - Redeploy after adding environment variables
   - Check variable name matches exactly: `NEYNAR_API_KEY`

2. **Wrong API Endpoint**:
   - Current: `https://api.neynar.com/v2/farcaster`
   - Verify this is correct for your API key type

3. **Header Format**:
   - Current: `api_key: YOUR_KEY`
   - Some APIs use `x-api-key` instead

4. **CORS Issues**:
   - Server-side API routes shouldn't have CORS issues
   - Check if fetch is being called client-side

### Next Steps

1. Check Vercel function logs for detailed error
2. Test Neynar API key directly with curl
3. Verify API endpoint format matches Neynar v2 docs




