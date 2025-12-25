# PorchFitness - ElevenLabs Accelerate Challenge
**Final Submission - December 24, 2025**

---

## 📁 Project Structure

```
porchfitness-elevenlabs-challenge/
├── index.html                          # Main website with 15 exercises
├── progress.html                       # Workout history charts
├── weekly-summary.html                 # AI-generated weekly insights
├── privacy.html                        # Privacy policy
├── manifest.json                       # PWA manifest
├── service-worker.js                   # Offline support
├── config.js                           # Firebase config (placeholder keys)
├── config.local.js                     # Local config (gitignored)
├── firebase.json                       # Firebase hosting config
├── firestore.rules                     # Database security rules
│
├── README.md                           # Project overview ✅
├── DEVPOST_SUBMISSION.md               # Challenge submission content ✅
├── TODO.md                             # Current tasks and priorities ✅
├── APP_OVERVIEW_AND_TODO.md            # Complete technical documentation ✅
├── SAMANTHA_SYSTEM_PROMPT.md           # ElevenLabs agent configuration ✅
├── ELEVENLABS_TOOL_SETUP.md            # Webhook setup guide ✅
├── ELEVENLABS_WEBHOOKS_QUICK_SETUP.md  # Quick copy-paste guide ✅
├── PROJECT_STRUCTURE.md                # This file
│
├── images/                             # Exercise photos (15 total)
│   ├── seated-piriformis-modified.jpg
│   ├── seated-hamstring-stretch.jpg
│   ├── sit-to-stands.jpg
│   ├── seated-cat-cow.jpg
│   ├── seated-arm-raises.jpg
│   ├── seated-ankle-circles.jpg
│   ├── seated-side-bends.jpg
│   ├── seated-spinal-twist.jpg
│   ├── figure-4-stretch.jpg
│   ├── seated-shoulder-rolls.jpg
│   ├── seated-neck-stretches.jpg
│   ├── seated-marching.jpg
│   ├── standing-hip-extension.jpg
│   ├── standing-side-bend.jpg
│   ├── standing-calf-stretch.jpg
│   ├── icon-192.png                    # PWA icon
│   └── icon-512.png                    # PWA icon
│
├── functions/                          # Firebase Cloud Functions
│   ├── index.js                        # 3 functions (getRecentHistory, logWorkout, getWeeklySummary)
│   ├── package.json                    # Dependencies
│   └── .eslintrc.js                    # Linting config
│
└── docs/                               # Legacy documentation
    └── (various old setup guides)

```

---

## 🎯 Challenge Details

**Challenge:** ElevenLabs Accelerate Hackathon  
**Category:** Accessibility / Healthcare / Voice-First / AI Integration  
**Submission Deadline:** December 2025  
**Live Site:** https://porchfitness.com  
**Firebase URL:** https://porchfitness-98628.web.app  
**Status:** ✅ Deployed and ready for submission

---

## ✅ Current Exercise List (15 Total)

### SEATED EXERCISES (12 exercises):
1. **Seated Piriformis Stretch (Modified)** - Hip flexibility, sciatica relief
   - Protocol: 3 reps × 20 sec hold = 60 seconds
2. **Seated Hamstring Stretch** - Leg flexibility, lower back health
   - Protocol: 3 reps × 20 sec hold = 60 seconds
3. **Sit to Stands** - Leg strength, functional fitness
   - Protocol: 2 sets × 10 reps = 20 reps
4. **Seated Cat-Cow Stretch** - Back mobility, breathing
   - Protocol: 3 reps × 20 sec hold = 60 seconds
5. **Seated Arm Raises** - Shoulder mobility, upper body strength
   - Protocol: 2 sets × 10 reps = 20 reps
6. **Seated Ankle Circles** - Ankle mobility, circulation
   - Protocol: 2 sets × 10 reps = 20 reps
7. **Seated Side Bends** - Core flexibility, spine mobility
   - Protocol: 3 reps × 20 sec hold = 60 seconds
8. **Seated Spinal Twist** - Spine mobility, digestion
   - Protocol: 3 reps × 20 sec hold = 60 seconds
9. **Figure 4 Stretch** - Deep hip stretch, piriformis
   - Protocol: 3 reps × 20 sec hold = 60 seconds
10. **Seated Shoulder Rolls** - Shoulder tension relief
    - Protocol: 2 sets × 10 reps = 20 reps
11. **Seated Neck Stretches** - Neck mobility, tension relief
    - Protocol: 3 reps × 20 sec hold = 60 seconds
12. **Seated Marching** - Hip flexor strength, core engagement
    - Protocol: 2 sets × 10 reps = 20 reps

### STANDING EXERCISES (3 exercises with chair support):
13. **Standing Hip Extension** - Hip strength, glute activation
    - Protocol: 2 sets × 10 reps = 20 reps
14. **Standing Side Bend** - Core flexibility, balance
    - Protocol: 3 reps × 20 sec hold = 60 seconds
15. **Standing Calf Stretch** - Ankle flexibility, calf health
    - Protocol: 3 reps × 20 sec hold = 60 seconds

---

## 🏗️ Technical Architecture

### Frontend
- **index.html** (725 lines) - Main app with 15 exercise cards, workout logging modal, Firebase auth
- **progress.html** (431 lines) - Chart.js visualizations of workout history
- **weekly-summary.html** (269 lines) - AI-generated weekly insights from Gemini

### Backend (Firebase)
- **Cloud Functions** (functions/index.js, 494 lines):
  - `getRecentHistory` - Gemini-powered personalized greetings
  - `logWorkout` - Save workout sessions to Firestore
  - `getWeeklySummary` - Weekly stats + Gemini insights
- **Firestore Database** - users/{userId}/sessions collection
- **Firebase Auth** - Google Sign-In (OAuth configured)
- **Secret Manager** - Gemini API key (rotated Dec 24, 2025)

### AI Integration
- **ElevenLabs Agent:** agent_1501kd4t27ftf2br1c7p1tm53kjg
- **Client Tools:** 3 webhooks configured (getRecentHistory, logWorkout, getWeeklySummary)
- **Google Gemini:** Progress analysis, personalized insights, language detection

---

## 📊 Current Status (December 24, 2025)

### ✅ Completed
- [x] 15 exercises with images and badges
- [x] Workout logging (voice + manual UI)
- [x] Firebase Cloud Functions deployed
- [x] ElevenLabs webhooks configured
- [x] Firebase Auth configured (OAuth URIs added)
- [x] Gemini API key secured in Secret Manager
- [x] Progress charts (Chart.js)
- [x] Weekly AI summaries (Gemini-powered)
- [x] Complete documentation (README, DEVPOST, TODO, APP_OVERVIEW)
- [x] Custom domain: porchfitness.com
- [x] Security audit (no exposed keys)

### ⏳ Pending
- [ ] Google Sign-In working (OAuth propagation - 5 min to few hours)
- [ ] End-to-end testing once auth works
- [ ] Demo video recording
- [ ] Screenshots for submission
- [ ] Create submission.zip
- [ ] Devpost form submission

### ❌ Known Issues
- Google Sign-In: "auth/admin-restricted-operation" (OAuth URIs added Dec 24, waiting for propagation)
- Fallback plan: Anonymous Auth (5-minute fix if needed)

---

## 📦 Submission Package

### Files to Include in submission.zip:
```
✅ index.html, progress.html, weekly-summary.html, privacy.html
✅ functions/ (index.js, package.json, .eslintrc.js)
✅ images/ (all 15 exercise images + icons)
✅ manifest.json, service-worker.js
✅ firebase.json, firestore.rules
✅ config.js (placeholder keys only)
✅ README.md, DEVPOST_SUBMISSION.md, TODO.md
✅ APP_OVERVIEW_AND_TODO.md
✅ SAMANTHA_SYSTEM_PROMPT.md
✅ ELEVENLABS_WEBHOOKS_QUICK_SETUP.md
```

### Files to EXCLUDE (security):
```
❌ config.local.js (contains real Gemini key)
❌ users.json (contains user data)
❌ node_modules/
❌ .git/
❌ .firebase/
❌ .gitignore
❌ *.log files
❌ .env* files
```

---

## 🎬 Demo Video Script

**Duration:** 2-3 minutes

1. **Introduction** (20 sec)
   - "Hi, I'm showing PorchFitness - voice-first exercise coaching for older adults"
   - Show homepage with 15 exercise cards

2. **Sign In** (15 sec)
   - Click "Sign In with Google"
   - Show quick authentication

3. **Exercise Selection** (30 sec)
   - Click "Seated Neck Stretches"
   - Show exercise card with badges (3 reps × 20 sec)

4. **Voice Coaching** (45 sec)
   - Activate Samantha widget
   - Say "Hello Samantha"
   - She greets with personalized history
   - She guides through exercise with counting
   - She asks about pain level

5. **Manual Logging** (20 sec)
   - Click "Log Workout" button
   - Show pain slider (0-10)
   - Add notes, save

6. **Progress Tracking** (30 sec)
   - Navigate to Progress page
   - Show charts (workout trends, pain levels)
   - Navigate to Weekly Summary
   - Show Gemini-generated insights

7. **Closing** (20 sec)
   - "This shows true AI partnership - ElevenLabs for voice, Gemini for insights"
   - "Thanks for watching!"

---

## 🚀 Tomorrow's Critical Path

**Priority Order:**
1. Test Google Sign-In (if fails → implement Anonymous Auth)
2. Complete end-to-end testing
3. Take screenshots (6 images)
4. Record demo video
5. Create submission.zip
6. Fill Devpost form
7. **SUBMIT BEFORE DEADLINE**

---

**Status:** Infrastructure complete, waiting for auth propagation  
**Last Updated:** December 24, 2025 11:30 PM
