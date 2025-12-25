# Deployment Guide

## Pre-Deployment Checklist

### 1. Install Dependencies
```bash
cd functions
npm install
cd ..
```

### 2. Add Firebase Config to HTML Files

Copy your Firebase config from [Firebase Console](https://console.firebase.google.com) → Project Settings → Your apps

Update `firebaseConfig` in:
- [ ] `index.html`
- [ ] `progress.html`
- [ ] `weekly-summary.html`

```javascript
const firebaseConfig = {
    apiKey: "AIza...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### 3. Set Gemini API Key

```bash
firebase functions:secrets:set GEMINI_API_KEY
# Paste your Gemini API key when prompted
```

Get API key from: [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

---

## Deploy to Firebase

### Option A: Deploy Everything
```bash
firebase deploy
```

### Option B: Deploy Specific Parts
```bash
# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions

# Deploy only Firestore rules
firebase deploy --only firestore:rules
```

---

## Testing Checklist

### Local Testing (Before Deploy)

#### Test 1: Firebase Connection
1. Open `index.html` in browser
2. Open DevTools Console (F12)
3. Check for Firebase errors
4. Should see: "Firebase initialized successfully"

#### Test 2: Authentication
1. Click "Sign In with Google"
2. Select Google account
3. Should redirect back to homepage
4. Button should change to "Sign Out"

#### Test 3: Exercise Cards
1. Scroll through all 15 exercise cards
2. Each should have:
   - Exercise name
   - Description
   - "Get Voice Coaching" button
   - "Log Manually" button

#### Test 4: Manual Logging
1. Click "Log Manually" on any exercise
2. Fill in form:
   - Pain level: 3
   - Notes: "Test workout"
   - Reps: 5
   - Duration: 60
3. Click "Save Workout"
4. Should see success message

#### Test 5: Progress Dashboard
1. Click "📈 View My Progress"
2. Should see:
   - Stats cards with numbers
   - Three charts rendering
   - Recent activity list
3. Check for any console errors

#### Test 6: Weekly Summary
1. Click "📊 Weekly Summary"
2. Should see:
   - Loading spinner first
   - Then AI-generated message
   - Stats cards
   - Workout table
3. Verify Gemini summary makes sense

#### Test 7: ElevenLabs Widget
1. Look for Samantha widget (bottom-right)
2. Click to expand
3. Click "Start a call"
4. Say: "Hi Samantha, can you guide me through neck stretches?"
5. Verify she responds with coaching

---

### Production Testing (After Deploy)

#### Deployed URL Test
1. Visit: `https://YOUR-PROJECT-ID.web.app`
2. Test all features from Local Testing checklist
3. Test on mobile device
4. Test on different browsers:
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

#### Cloud Functions Test
```bash
# View function logs
firebase functions:log

# Should show:
# - getRecentHistory calls
# - logWorkout calls
# - getWeeklySummary calls
```

#### Performance Check
1. Open DevTools → Network tab
2. Reload page
3. Check load times:
   - Should be < 3 seconds
   - No 404 errors
   - All Firebase requests successful

---

## Common Issues & Fixes

### Issue: "Firebase config is not defined"
**Fix:** Add firebaseConfig to all HTML files

### Issue: "Permission denied" on Firestore
**Fix:** Deploy Firestore rules
```bash
firebase deploy --only firestore:rules
```

### Issue: "Function not found: getWeeklySummary"
**Fix:** Deploy Cloud Functions
```bash
firebase deploy --only functions
```

### Issue: ElevenLabs widget not showing
**Fix:** Check that agent ID is correct in index.html
```javascript
agentId: "YOUR_AGENT_ID_HERE"
```

### Issue: Gemini API quota exceeded
**Fix:** Check usage at [console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas](https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas)

### Issue: Charts not rendering
**Fix:** Check that Chart.js CDN is loaded
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

---

## Quick Deploy Commands

```bash
# Full deployment
npm run deploy-all

# Or manual steps:
firebase login
cd functions && npm install && cd ..
firebase deploy
```

---

## Post-Deployment

### 1. Test Production URL
Visit: `https://YOUR-PROJECT-ID.web.app`

### 2. Record Demo Video
- Show homepage
- Demonstrate voice coaching
- Show progress tracking
- Show weekly summary

### 3. Submit to Devpost
- Project URL: `https://YOUR-PROJECT-ID.web.app`
- GitHub URL: `https://github.com/YOUR-USERNAME/porchfitness-elevenlabs-challenge`
- Demo Video: YouTube link

### 4. Monitor Usage
```bash
# Check function invocations
firebase functions:log --limit 50

# Check Firestore usage
# Go to Firebase Console → Firestore → Usage tab
```

---

## Rollback (If Needed)

```bash
# List previous deployments
firebase hosting:list

# Rollback to previous version
firebase hosting:rollback
```

---

## Support

- Firebase Docs: [firebase.google.com/docs](https://firebase.google.com/docs)
- ElevenLabs Docs: [elevenlabs.io/docs](https://elevenlabs.io/docs)
- Gemini API Docs: [ai.google.dev](https://ai.google.dev)

Contact: aloha@lavarocklabs.com
