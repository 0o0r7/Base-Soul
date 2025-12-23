# API Key Debugging Guide

## Current Status
- ✅ API Key set in Vercel: `[REDACTED-NEYNAR-KEY]`
- ✅ Code uses `api_key` header (Neynar v2 format)
- ❌ Still getting 401 "Incorrect or missing API key"

## Test API Key Directly

Run this command to test if the API key works:

```bash
curl -H "api_key: [REDACTED-NEYNAR-KEY]" \
     -H "Accept: application/json" \
     "https://api.neynar.com/v2/farcaster/user/by_username?username=vitalik"
```

**If this works**: The API key is valid, but Vercel isn't reading it correctly.
**If this fails**: The API key is invalid/expired, need a new one.

## Possible Issues

### 1. API Key Not Being Read
- Environment variable might not be loaded at runtime
- Need to verify in Vercel function logs

### 2. Wrong Header Format
- Currently using: `api_key`
- Might need: `x-api-key` or `Authorization: Bearer`

### 3. API Key Invalid
- Key might be expired
- Key might be for wrong environment
- Need to regenerate in Neynar dashboard

## Next Steps

1. **Test API key with curl** (command above)
2. **Check Vercel function logs** for actual error
3. **Verify API key in Neynar dashboard** - check if it's active
4. **Try regenerating API key** if current one doesn't work









