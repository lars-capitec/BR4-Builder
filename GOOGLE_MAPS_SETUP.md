# Google Maps API Setup Guide

## Current Status
Google Maps Places API is currently **disabled** to avoid billing errors during development.

## To Enable Google Maps API

### Step 1: Enable Billing
1. Go to [Google Cloud Console Billing](https://console.cloud.google.com/project/_/billing/enable)
2. Select your project (or create a new one)
3. Enable billing by adding a payment method
4. **Note**: Google Maps API has a generous free tier ($200/month credit)

### Step 2: Enable APIs
1. Go to [Google Cloud Console APIs](https://console.cloud.google.com/apis/dashboard)
2. Click "Enable APIs and Services"
3. Search for and enable:
   - **Maps JavaScript API**
   - **Places API**

### Step 3: Create API Key
1. Go to [API Credentials](https://console.cloud.google.com/apis/credentials)
2. Click "Create Credentials" → "API Key"
3. Copy your API key
4. **Secure your API key**:
   - Click on the created key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domains (localhost:*, yourdomain.com)
   - Under "API restrictions", select "Restrict key" and choose the APIs you enabled

### Step 4: Update Environment Variables
1. Create a `.env` file in your project root:
```bash
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Step 5: Enable the Code
1. Open `client/pages/BusinessInfo.tsx`
2. Uncomment the Google Maps initialization code in the `useEffect`
3. Remove the temporary disable comments

## Benefits of Google Maps Integration
- **Address Autocomplete**: Users can easily find and select their business location
- **Validation**: Ensures addresses are real and properly formatted
- **South Africa Focus**: Restricted to SA locations for better relevance
- **Better UX**: Faster and more accurate address entry

## Cost Considerations
- First $200/month is free (covers ~28,000 autocomplete requests)
- After free tier: $2.83 per 1,000 requests for Places Autocomplete
- [Detailed Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)

## Alternative Solutions (Current)
- Manual address input (currently active)
- Users type their full address manually
- No validation or autocomplete features
