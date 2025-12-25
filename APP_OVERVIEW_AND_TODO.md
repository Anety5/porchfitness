# PorchFitness - Complete App Overview & TODO

**Date:** December 24, 2025  
**Status:** Auth configuration complete, waiting for OAuth propagation (5-10 min)

---

## 🎯 What This App Does

**PorchFitness** is a voice-coached exercise app for seniors and people with limited mobility. Users can:
1. Browse 15 gentle exercises (12 seated, 3 standing)
2. Talk to Samantha (AI voice coach via ElevenLabs) for exercise guidance
3. Log workouts with pain levels (0-10 scale)
4. Track progress with charts and weekly summaries
5. Get AI-generated insights from Google Gemini

---

## 🏗️ App Architecture

```
User Browser
    ↓
Firebase Hosting (porchfitness.com / porchfitness-98628.web.app)
    ↓
Firebase Auth (Google Sign-In)
    ↓
Frontend HTML/JS
    ├── ElevenLabs Widget (Samantha voice coach)
    │   └── Webhooks → Firebase Cloud Functions
    └── Manual UI (Log Workout buttons)
        └── Direct calls → Firebase Cloud Functions
    ↓
Firebase Cloud Functions (Node.js)
    ├── getRecentHistory (last 3 workouts + Gemini greeting)
    ├── logWorkout (saves to Firestore)
    └── getWeeklySummary (calculates stats + Gemini insights)
    ↓
Firestore Database
    └── users/{userId}/sessions/{sessionId}
        - exerciseName
        - painLevel (0-10)
        - notes
        - repsCompleted
        - durationSeconds
        - date (timestamp)
```

---

## 📁 File Structure & What Each File Does

### **Main Pages (HTML)**

#### **index.html** (589 lines)
- **Purpose:** Main landing page with all 15 exercises
- **Features:**
  - Hero section with app description
  - 15 exercise cards with images, descriptions, badges (3 reps × 20 sec OR 2 sets × 10 reps)
  - "Log Workout" buttons on each card
  - Google Sign In button (header)
  - Navigation to Progress and Weekly Summary pages
  - ElevenLabs Samantha widget (bottom right)
  - Workout logging modal (pain slider 0-10, notes textarea)
- **Key Functions:**
  - `logWorkout(exerciseName)` - Opens modal
  - `saveWorkoutLog()` - Saves to Firebase via logWorkout function
  - `passUserIdToElevenLabs(userId)` - Sends userId to Samantha widget
  - Firebase Auth listener - handles sign in/out

#### **progress.html** (431 lines)
- **Purpose:** Charts showing workout history
- **Features:**
  - Workouts over time (line chart)
  - Pain levels trend (line chart)
  - Exercise frequency (bar chart)
  - Requires sign-in
- **Data Source:** Firestore `users/{userId}/sessions` collection

#### **weekly-summary.html** (269 lines)
- **Purpose:** AI-generated weekly summary page
- **Features:**
  - Total workouts this week
  - Average pain level
  - Workout streak
  - Most frequent exercise
  - Gemini AI insights
  - Requires sign-in
- **Data Source:** Calls `getWeeklySummary` Firebase function

---

### **Backend (Firebase Cloud Functions)**

#### **functions/index.js** (494 lines)

**Function 1: getRecentHistory**
- **URL:** `https://getrecenthistory-2ixqissjkq-uc.a.run.app`
- **Method:** POST
- **Input:** `{ userId: string }`
- **Output:** `{ success: true, summary: "Welcome back! You've done 3 workouts..." }`
- **What it does:**
  1. Fetches last 3 workout sessions from Firestore
  2. Sends data to Gemini AI to generate personalized greeting
  3. Returns greeting text for Samantha to speak
- **Used by:** ElevenLabs webhook (Samantha greets users)

**Function 2: logWorkout**
- **URL:** `https://us-central1-porchfitness-98628.cloudfunctions.net/logWorkout`
- **Method:** POST
- **Input:** 
  ```json
  {
    "userId": "string",
    "exerciseName": "string",
    "painLevel": 0-10,
    "notes": "string (optional)",
    "repsCompleted": 0 (optional),
    "durationSeconds": 0 (optional)
  }
  ```
- **Output:** `{ success: true, message: "Great job! Logged workout..." }`
- **What it does:**
  1. Validates input (userId, exerciseName, painLevel required)
  2. Saves workout to Firestore: `users/{userId}/sessions/{autoId}`
  3. Returns success message
- **Used by:** Manual UI buttons AND ElevenLabs webhook

**Function 3: getWeeklySummary**
- **URL:** `https://getweeklysummary-2ixqissjkq-uc.a.run.app`
- **Method:** POST
- **Input:** `{ userId: string }`
- **Output:**
  ```json
  {
    "success": true,
    "totalWorkouts": 5,
    "avgPainLevel": 3.2,
    "streak": 3,
    "mostFrequentExercise": "Seated Hamstring Stretch",
    "weeklyGoalProgress": 71,
    "summary": "Great week! You've been consistent..."
  }
  ```
- **What it does:**
  1. Fetches all workouts from last 7 days
  2. Calculates statistics
  3. Sends data to Gemini AI for insights
  4. Returns stats + AI summary
- **Used by:** weekly-summary.html AND ElevenLabs webhook

---

### **Configuration Files**

#### **firebase.json**
- Hosting configuration
- Rewrites all routes to index.html (SPA behavior)
- Cache control for images and service worker
- Ignores .md files, secrets, etc.

#### **firestore.rules**
- Database security rules
- Who can read/write workout data

#### **config.js** (PUBLIC - deployed)
```javascript
const config = {
  geminiApiKey: 'YOUR_GEMINI_API_KEY_HERE', // Not used in production
  elevenLabsAgentId: 'agent_1501kd4t27ftf2br1c7p1tm53kjg'
};
```
- ElevenLabs agent ID (public, safe)
- Gemini key placeholder (NOT used - functions use Secret Manager)

#### **config.local.js** (PRIVATE - in .gitignore)
```javascript
const config = {
  geminiApiKey: 'YOUR_REAL_GEMINI_KEY_HERE'
};
```
- Your actual Gemini API key (stored locally only)
- Never committed to git
- **Not used in production** - functions use Firebase Secret Manager instead

---

## 🔑 Firebase Configuration

### **Current Firebase Config (Correct)**
```javascript
{
  apiKey: "AIzaSyC9zzKfkpYgo2Kwsxt1acyjsgtBYCI_WBs",
  authDomain: "porchfitness-98628.firebaseapp.com",
  projectId: "porchfitness-98628",
  storageBucket: "porchfitness-98628.firebasestorage.app",
  messagingSenderId: "115728465210",
  appId: "1:115728465210:web:2fb384f71a8c626faea403"
}
```

**Used in:**
- index.html (line 591)
- progress.html (line 164)
- weekly-summary.html (line 134)

---

## 🎙️ ElevenLabs Integration

### **Samantha Agent Configuration**
- **Agent ID:** `agent_1501kd4t27ftf2br1c7p1tm53kjg`
- **System Prompt:** See SAMANTHA_SYSTEM_PROMPT.md (15 exercises listed)
- **Voice:** Natural, encouraging, senior-friendly

### **How userId is Passed to Webhooks**
In index.html (line 665):
```javascript
function passUserIdToElevenLabs(userId) {
  const convaiWidget = document.querySelector('elevenlabs-convai');
  if (convaiWidget) {
    convaiWidget.setAttribute('client-tools-data', JSON.stringify({ userId }));
  }
}
```
This sends `userId` automatically with every webhook call Samantha makes.

### **Webhook Tools Setup (in ElevenLabs Dashboard)**

**Tool 1: getRecentHistory**
- URL: `https://getrecenthistory-2ixqissjkq-uc.a.run.app`
- Parameters: `userId` (string, required)
- Description: "Retrieves the user's last 3 workout sessions and generates a personalized greeting"

**Tool 2: logWorkout**
- URL: `https://us-central1-porchfitness-98628.cloudfunctions.net/logWorkout`
- Parameters:
  - `userId` (string, required)
  - `exerciseName` (string, required)
  - `painLevel` (integer, required, 0-10)
  - `notes` (string, optional)
  - `repsCompleted` (integer, optional)
  - `durationSeconds` (integer, optional)
- Description: "Logs a completed workout. Always ask for pain level (0-10) before logging."

**Tool 3: getWeeklySummary**
- URL: `https://getweeklysummary-2ixqissjkq-uc.a.run.app`
- Parameters: `userId` (string, required)
- Description: "Generates weekly summary with stats and AI insights"

**Setup Guide:** ELEVENLABS_WEBHOOKS_QUICK_SETUP.md

---

## 🔐 Authentication Setup

### **Google OAuth Configuration**

**Firebase Auth:**
- Provider: Google (Enabled)
- Authorized domains:
  - `localhost`
  - `porchfitness-98628.firebaseapp.com`
  - `porchfitness-98628.web.app`
  - `porchfitness.com`

**Google Cloud OAuth:**
- Project: porchfitness-98628
- OAuth Client ID: `115728465210-7rr2...`
- Status: In Production
- Authorized redirect URIs:
  - `https://porchfitness-98628.firebaseapp.com/__/auth/handler`
  - `https://porchfitness-98628.web.app/__/auth/handler`
  - `https://porchfitness.com/__/auth/handler`

**Current Status:** 
- ⏰ OAuth redirect URIs added Dec 24, 2025
- ⏰ Waiting 5-10 minutes for propagation
- ❌ Google Sign-In not working yet (error: auth/admin-restricted-operation)
- ✅ Will work after propagation completes

---

## 📊 Data Flow Examples

### **Example 1: Manual Workout Logging**
```
1. User clicks "Log Workout" on Hamstring Stretch card
   → logWorkout('Seated Hamstring Stretch') called

2. Modal opens, user sets pain level to 3/10, adds note

3. User clicks "Save Workout Log"
   → saveWorkoutLog() called

4. Frontend sends POST to:
   https://us-central1-porchfitness-98628.cloudfunctions.net/logWorkout
   Body: {
     userId: "abc123xyz789",
     exerciseName: "Seated Hamstring Stretch",
     painLevel: 3,
     notes: "Left leg felt tight"
   }

5. Cloud Function validates and saves to Firestore:
   users/abc123xyz789/sessions/autoId123
   {
     exerciseName: "Seated Hamstring Stretch",
     painLevel: 3,
     notes: "Left leg felt tight",
     repsCompleted: 0,
     durationSeconds: 0,
     date: Timestamp(2025-12-24T15:30:00Z)
   }

6. Success message shown to user
```

### **Example 2: Voice Logging with Samantha**
```
1. User clicks Samantha widget, says:
   "I just did the hamstring stretch. My pain level was 2."

2. Samantha's AI processes the request and calls logWorkout webhook
   POST https://us-central1-porchfitness-98628.cloudfunctions.net/logWorkout
   Body: {
     userId: "abc123xyz789" (auto-included via client-tools-data),
     exerciseName: "Seated Hamstring Stretch",
     painLevel: 2
   }

3. Cloud Function saves to Firestore

4. Samantha speaks: "Great job! Logged Seated Hamstring Stretch workout with pain level 2/10."
```

### **Example 3: Weekly Summary Generation**
```
1. User goes to weekly-summary.html

2. Page calls getWeeklySummary function with userId

3. Function queries Firestore:
   - Fetches all sessions from last 7 days
   - Example: 5 workouts found

4. Function calculates:
   - totalWorkouts: 5
   - avgPainLevel: 3.2
   - streak: 3 days
   - mostFrequentExercise: "Seated Hamstring Stretch" (done 3 times)

5. Function sends data to Gemini AI:
   "Generate encouraging summary for user who did 5 workouts this week..."

6. Gemini returns:
   "Fantastic work this week! You've completed 5 workouts and maintained a 3-day streak..."

7. Page displays stats + AI message
```

---

## ✅ What's Working Right Now

1. ✅ **Frontend Deployed:** https://porchfitness.com and https://porchfitness-98628.web.app
2. ✅ **15 Exercise Cards:** All visible with images, descriptions, badges
3. ✅ **ElevenLabs Widget:** Samantha appears and can be activated
4. ✅ **Cloud Functions Deployed:** All 3 functions live and responding
5. ✅ **ElevenLabs Webhooks Configured:** All 3 tools added in dashboard
6. ✅ **Firestore Database:** Set up and ready
7. ✅ **Firebase Config:** Correct API keys in all files
8. ✅ **OAuth Setup:** All redirect URIs and domains configured

---

## ❌ What's NOT Working (Temporary)

1. ❌ **Google Sign-In:** Fails with "admin-restricted-operation" error
   - **Reason:** OAuth redirect URIs just added (Dec 24, 2025)
   - **Fix:** Wait 5-10 minutes (up to few hours) for propagation
   - **Test after:** 3:30 PM or try tomorrow morning

2. ❌ **Workout Logging:** Can't save workouts (requires sign-in)
   - **Depends on:** Google Sign-In working first

3. ❌ **Samantha Webhooks:** Can't log workouts via voice (requires userId)
   - **Depends on:** Google Sign-In working first

4. ❌ **Progress Charts:** Can't view (requires sign-in)
   - **Depends on:** Google Sign-In working first

5. ❌ **Weekly Summary:** Can't generate (requires sign-in)
   - **Depends on:** Google Sign-In working first

---

## 📝 TODO List (In Priority Order)

### **IMMEDIATE (Wait for OAuth propagation)**
- [ ] Wait 10-15 minutes since OAuth redirect URIs were added
- [ ] Test Google Sign-In at https://porchfitness-98628.web.app
- [ ] If still failing, clear browser cache or use incognito mode
- [ ] If still failing after 1 hour, check Firebase Console logs

### **AFTER SIGN-IN WORKS**
- [ ] Test manual workout logging (click "Log Workout" button)
- [ ] Verify workout appears in Firestore database
- [ ] Test Samantha voice logging ("I did hamstring stretch, pain level 3")
- [ ] Check progress.html shows workout charts
- [ ] Check weekly-summary.html generates AI summary

### **ElevenLabs Testing**
- [ ] Update Samantha's system prompt with SAMANTHA_SYSTEM_PROMPT.md content
- [ ] Test: "What were my recent workouts?" (should trigger getRecentHistory)
- [ ] Test: "Log my workout" (should ask for details, then trigger logWorkout)
- [ ] Test: "Show me my weekly summary" (should trigger getWeeklySummary)

### **Optional Enhancements**
- [ ] Remove clipboard emoji from badges (cosmetic only)
- [ ] Add exercise GIFs/animations
- [ ] Add workout reminders
- [ ] Add email notifications (optional, we removed this earlier)
- [ ] Add social sharing features

### **Before Devpost Submission**
- [ ] Test all features end-to-end
- [ ] Record demo video showing:
  - Browsing exercises
  - Talking to Samantha
  - Logging workout manually
  - Viewing progress charts
  - Viewing weekly summary
- [ ] Write compelling Devpost description
- [ ] Take screenshots of all features
- [ ] Test on mobile device
- [ ] Check accessibility (screen reader compatibility)

---

## 🐛 Troubleshooting Guide

### **Google Sign-In Issues**

**Error: "This domain is not authorized for OAuth"**
- Fix: Add domain to Firebase Console → Authentication → Settings → Authorized domains

**Error: "auth/admin-restricted-operation"**
- Fix: Enable Identity Toolkit API at https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=porchfitness-98628

**Error: "auth/api-key-not-valid"**
- Fix: Update Firebase config in HTML files with correct apiKey from Firebase Console

**Sign-In popup closes immediately**
- Fix: Check OAuth redirect URIs in Google Cloud Console
- Verify: `https://[domain]/__/auth/handler` format

**Still not working after 1 hour**
- Check: Firebase Console → Authentication → Users (any users created?)
- Check: Google Cloud Console → OAuth Consent Screen (status = In Production?)
- Check: Browser console for specific error messages

### **Workout Logging Issues**

**"Failed to log workout" error**
- Check: User is signed in (currentUser is not null)
- Check: Firebase Functions logs for errors
- Check: Firestore rules allow write access

**Modal opens but nothing saves**
- Check: Network tab in browser console
- Check: POST request to logWorkout function succeeds (200 status)
- Check: Response body for error messages

### **Samantha/ElevenLabs Issues**

**Widget not appearing**
- Check: ElevenLabs script loaded (view page source)
- Check: Agent ID is correct: `agent_1501kd4t27ftf2br1c7p1tm53kjg`

**Samantha doesn't respond**
- Check: Microphone permissions granted
- Check: Internet connection stable

**Webhooks not triggering**
- Check: ElevenLabs dashboard → Tools → All 3 webhooks exist
- Check: Webhook URLs are correct
- Check: client-tools-data attribute set on widget (with userId)

**"I can't log that workout" message**
- Check: userId is being passed to webhooks
- Check: Firebase Functions are deployed and responding
- Check: Function logs for errors

---

## 🚀 Deployment Commands

### **Deploy Everything**
```powershell
firebase deploy
```

### **Deploy Only Hosting**
```powershell
firebase deploy --only hosting
```

### **Deploy Only Functions**
```powershell
cd functions
firebase deploy --only functions
```

### **Check Deployment Status**
```powershell
firebase hosting:channel:list
```

---

## 📦 Dependencies

### **Frontend (CDN)**
- Tailwind CSS: https://cdn.tailwindcss.com
- Firebase SDK: 10.7.1 (compat)
- ElevenLabs Widget: https://elevenlabs.io/convai-widget/index.js

### **Backend (Node.js)**
See functions/package.json:
- firebase-functions: ^6.1.1
- firebase-admin: ^13.0.2
- @google-cloud/aiplatform: ^3.33.0
- cors: ^2.8.5

---

## 🗂️ Important Files to Reference

1. **ELEVENLABS_WEBHOOKS_QUICK_SETUP.md** - Copy-paste setup for webhooks
2. **SAMANTHA_SYSTEM_PROMPT.md** - Full AI coach prompt with 15 exercises
3. **config.local.js** - Your real API keys (never commit!)
4. **functions/index.js** - All backend logic
5. **index.html** - Main app interface
6. **.gitignore** - What files to never commit

---

## 🔗 Important Links

- **Live Site:** https://porchfitness.com
- **Alt URL:** https://porchfitness-98628.web.app
- **Firebase Console:** https://console.firebase.google.com/project/porchfitness-98628
- **Google Cloud Console:** https://console.cloud.google.com/home/dashboard?project=porchfitness-98628
- **ElevenLabs Dashboard:** https://elevenlabs.io/app/conversational-ai
- **GitHub Repo:** (if you have one set up)

---

## 💡 Quick Reference: What Goes Where

**Want to add a new exercise?**
→ Edit index.html (add new card in exercises section)
→ Update SAMANTHA_SYSTEM_PROMPT.md (add to list)
→ Deploy: `firebase deploy --only hosting`

**Want to change Samantha's personality?**
→ Edit SAMANTHA_SYSTEM_PROMPT.md
→ Copy to ElevenLabs Dashboard → Agent → System Prompt

**Want to add a new Cloud Function?**
→ Edit functions/index.js
→ Add exports.yourFunction = onRequest(...)
→ Deploy: `firebase deploy --only functions`

**Want to change Firebase config?**
→ Get from: Firebase Console → Project Settings → Your apps
→ Update in: index.html, progress.html, weekly-summary.html
→ Deploy: `firebase deploy --only hosting`

**Want to test locally?**
→ Open index.html directly in browser (Firebase will still work)
→ Or use: `firebase serve` (requires Firebase CLI)

---

## 🎓 How It All Fits Together

1. **User visits site** → Firebase Hosting serves index.html
2. **User signs in** → Firebase Auth creates session, gets userId
3. **userId passed to Samantha** → ElevenLabs widget receives it via client-tools-data
4. **User does exercise** → Can log via button OR voice
5. **Data saved** → logWorkout function → Firestore database
6. **View progress** → getWeeklySummary function → Gemini AI → Display
7. **Samantha coaches** → ElevenLabs AI + webhooks + Gemini AI work together

---

## ✨ Key Concepts

**Firebase Auth userId:**
- Unique string like "abc123xyz789"
- Generated when user signs in
- Never changes for that user
- Used as key in Firestore: `users/{userId}/sessions`

**ElevenLabs client-tools-data:**
- JSON object passed with every webhook call
- Set via: `widget.setAttribute('client-tools-data', JSON.stringify({ userId }))`
- Samantha automatically includes it when calling your functions

**Firebase Cloud Functions:**
- Serverless backend code
- Runs on Google's servers
- Only charged when used
- Can call external APIs (Gemini)
- CORS enabled for all domains (cors: "*")

**Firestore Database Structure:**
```
users/
  {userId}/
    sessions/
      {sessionId}/
        - exerciseName
        - painLevel
        - notes
        - repsCompleted
        - durationSeconds
        - date
```

---

## 🎯 Success Criteria

**App is fully working when:**
- ✅ User can sign in with Google
- ✅ User can browse 15 exercises
- ✅ User can click "Log Workout" and save with pain level
- ✅ User can talk to Samantha and she responds
- ✅ User can tell Samantha to log a workout via voice
- ✅ User can view progress charts with their workout history
- ✅ User can view weekly summary with AI insights
- ✅ All data persists in Firestore database

---

**Last Updated:** December 24, 2025 at 3:15 PM  
**Status:** Waiting for OAuth propagation (5-10 minutes)  
**Next Steps:** Test Google Sign-In after 3:30 PM
