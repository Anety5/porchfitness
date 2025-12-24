# PorchFitness Deployment Plan - Troubleshooting & Testing

## Current Status ✅

### What's Working:
- ✅ Firebase project created: `porchfitness-98628`
- ✅ Gemini API key stored in Secret Manager (version 2)
- ✅ Firebase Hosting deployed: https://porchfitness-98628.web.app
- ✅ Cloud Function exists: `generatePersonalizedPlan`
- ✅ Function URL: https://us-central1-porchfitness-98628.cloudfunctions.net/generatePersonalizedPlan
- ✅ .gitignore updated to protect secrets

### Current Issue:
- ❌ CORS error: Frontend can't access the Cloud Function
- ❌ Function may not be properly accessing the secret

---

## Step-by-Step Deployment Strategy

### 1. Verify Environment (5 min)
```powershell
# Check Firebase login
firebase login:list

# Verify project
firebase projects:list
firebase use porchfitness-98628

# Check function exists
firebase functions:list

# Verify secret
firebase functions:secrets:get GEMINI_API_KEY
```

### 2. Test Cloud Function Directly (5 min)
Test the function directly to isolate CORS from function logic issues.

```powershell
# Test with curl or PowerShell
$body = @{
    age = "65"
    mobility = "seated"
    goals = "flexibility"
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://us-central1-porchfitness-98628.cloudfunctions.net/generatePersonalizedPlan" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

**Expected Result:** Should return a 200 OK with a personalized plan.
**If Error:** Check the logs with `firebase functions:log`

### 3. Fix CORS Configuration (10 min)

#### Check current function code:
```powershell
code functions/index.js
```

#### Verify CORS settings should be:
- Line ~15: `cors: ["https://porchfitness-98628.web.app", "https://porchfitness-98628.firebaseapp.com"]`
- Line ~20: Manual `res.set(corsHeaders)` after function starts
- CORS headers should allow `Access-Control-Allow-Origin: *`

#### Alternative: Use simpler CORS (if above doesn't work)
Replace the function configuration:
```javascript
exports.generatePersonalizedPlan = onRequest(
    {
      secrets: [geminiApiKey],
      // Remove cors config, handle manually
    },
    async (req, res) => {
      // Set CORS headers first
      res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      
      if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
      }
      // rest of code...
```

### 4. Redeploy Function (10 min)
```powershell
# Clean deploy
firebase deploy --only functions --force

# Wait for completion (check for success message)
# Should see: "Deploy complete!" and function URL

# Verify deployment
firebase functions:list
```

### 5. Test from Browser Console (5 min)
Open https://porchfitness-98628.web.app in browser, open DevTools Console, run:

```javascript
fetch('https://us-central1-porchfitness-98628.cloudfunctions.net/generatePersonalizedPlan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    age: '65',
    mobility: 'seated',
    goals: 'flexibility'
  })
})
.then(r => r.json())
.then(d => console.log('SUCCESS:', d))
.catch(e => console.error('ERROR:', e));
```

**Expected:** Should log "SUCCESS:" with the plan
**If CORS error still:** Problem is in function configuration
**If 500 error:** Problem is with secret access or Gemini API

### 6. Check Function Logs (if errors) (5 min)
```powershell
# View recent logs
firebase functions:log --only generatePersonalizedPlan

# Look for:
# - "Gemini API key not configured" = secret not accessible
# - "Gemini API error" = API key invalid or rate limit
# - Any other errors
```

---

## Troubleshooting Decision Tree

### If CORS Error Persists:
1. **Option A**: Make function public (temporary for testing)
   - Go to Google Cloud Console → Cloud Functions
   - Select `generatePersonalizedPlan`
   - Click "Permissions" → Add member
   - Add `allUsers` with role `Cloud Functions Invoker`
   - Test again

2. **Option B**: Use Firebase Callable Function (better approach)
   - Rewrite function using `onCall` instead of `onRequest`
   - Automatically handles CORS and authentication
   - No CORS configuration needed

### If "API Key Not Configured" Error:
1. Verify secret is attached to function:
   ```powershell
   gcloud functions describe generatePersonalizedPlan --gen2 --region=us-central1 --project=porchfitness-98628 --format="value(serviceConfig.secretEnvironmentVariables)"
   ```

2. If not attached, delete and recreate:
   ```powershell
   firebase functions:delete generatePersonalizedPlan --force
   firebase deploy --only functions
   ```

### If Gemini API Error:
1. Test API key directly:
   ```powershell
   $apiKey = "YOUR_API_KEY"
   Invoke-WebRequest -Uri "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=$apiKey" -Method POST -Body '{"contents":[{"parts":[{"text":"Say hello"}]}]}' -ContentType "application/json"
   ```

2. If invalid, get new key from https://aistudio.google.com/app/apikey
3. Update secret:
   ```powershell
   firebase functions:secrets:set GEMINI_API_KEY
   ```

---

## Alternative Solution: Use Callable Functions

If CORS continues to be problematic, switch to Firebase Callable Functions:

### Update functions/index.js:
```javascript
const {onCall} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");

const geminiApiKey = defineSecret("GEMINI_API_KEY");

exports.generatePersonalizedPlan = onCall(
    {secrets: [geminiApiKey]},
    async (request) => {
      const {age, mobility, goals} = request.data;
      // ... rest of logic
      return {success: true, plan: plan};
    }
);
```

### Update index.html:
```javascript
// Import Firebase Functions SDK
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const generatePlan = httpsCallable(functions, 'generatePersonalizedPlan');

// Call it
const result = await generatePlan({age, mobility, goals});
console.log(result.data.plan);
```

---

## Final Verification Checklist

Before submitting to Devpost:

- [ ] Function deploys without errors
- [ ] Direct function test (curl/PowerShell) works
- [ ] Browser console test works (no CORS)
- [ ] Frontend button generates plan successfully
- [ ] Function logs show no errors
- [ ] Secret is NOT in any code files
- [ ] `.env*` files are in `.gitignore`
- [ ] GitHub repo has no exposed secrets
- [ ] Live URL works: https://porchfitness-98628.web.app

---

## Quick Reference Commands

```powershell
# Login & select project
firebase login
firebase use porchfitness-98628

# Deploy functions
firebase deploy --only functions --force

# Deploy hosting
firebase deploy --only hosting

# View logs
firebase functions:log

# List functions
firebase functions:list

# Check secrets
firebase functions:secrets:get GEMINI_API_KEY

# Delete and recreate function
firebase functions:delete generatePersonalizedPlan --force
firebase deploy --only functions
```

---

## Security Verification

Before final submission, verify secrets are protected:

```powershell
# Check no secrets in code
git grep -i "AIza" # Should return nothing
git grep -i "api.*key.*=" # Check for hardcoded keys

# Verify .gitignore
cat .gitignore
cat functions/.gitignore

# Check what's staged
git status
```

**Never commit:**
- `.env*` files
- `functions/.env*` files
- Actual API keys in code
- Service account keys

---

Good luck tomorrow! Follow this step by step and you'll get it working. 🚀
