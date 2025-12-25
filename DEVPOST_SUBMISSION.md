# PorchFitness - Devpost Submission Checklist

## Live URLs
- **Live Site:** https://porchfitness.com (or https://porchfitness-98628.web.app)
- **GitHub:** [Add if you make repo public]

## Challenge Requirements ✅
- [x] **ElevenLabs Conversational AI:** Voice coaching with Samantha (Agent ID: agent_1501kd4t27ftf2br1c7p1tm53kjg)
- [x] **Google Gemini AI:** Generates personalized workout insights and weekly summaries
- [x] **Conversational:** Natural voice interaction for workout logging and coaching
- [x] **Intelligent:** AI-powered greetings, progress tracking, and motivational insights
- [x] **Google Cloud Platform:** Firebase Hosting, Cloud Functions, Firestore, Secret Manager

## Submission Checklist

### 1. Project Information
- **Title:** PorchFitness - AI-Coached Gentle Exercises for Everyone
- **Tagline:** Voice-coached gentle exercises with AI tracking and insights, perfect for seniors and anyone with limited mobility
- **Category:** Accessibility / Health & Fitness / AI-Powered Applications

### 2. Description Template
```
PorchFitness makes exercise accessible through 15 gentle exercises combined with AI-powered voice coaching and intelligent progress tracking.

🗣️ ElevenLabs Conversational AI - Samantha: Your personal AI fitness coach provides natural voice guidance, counts reps, times holds, and logs your workouts through conversation. Just say "I did the hamstring stretch" and Samantha handles the rest.

🧠 Google Gemini AI Intelligence: 
- Personalized workout greetings based on your recent activity
- AI-generated weekly summaries with motivational insights
- Smart progress analysis and recommendations

💪 15 Evidence-Based Exercises:
- 12 Seated Exercises (stretches, strength, mobility)
- 3 Standing Exercises (hip extension, side bend, calf stretch)
- Clear instructions with sets, reps, and hold times
- High-quality demonstration images

📊 Intelligent Progress Tracking:
- Log workouts manually OR via voice with Samantha
- Pain level tracking (0-10 scale) for safety
- Visual progress charts showing workout trends
- Weekly summaries with AI-generated insights

♿ Built for Accessibility:
- Large fonts (18px+ base), high contrast design
- 56px+ touch targets for easy interaction
- Full keyboard navigation and ARIA labels
- Works on all devices - desktop, tablet, mobile

🔐 Secure & Private:
- Firebase Authentication with Google Sign-In
- Your data stays in your secure Firestore database
- API keys managed through Firebase Secret Manager

This project showcases the power of combining ElevenLabs' natural conversational AI with Google Cloud's Gemini to create an intelligent, voice-first fitness companion that truly understands and motivates users.
```

### 3. Media Needed
- [ ] **Screenshots (4-6):**
  - Homepage showing 15 exercise cards with badges
  - Samantha voice widget (ElevenLabs) activated
  - Workout logging modal (pain slider + notes)
  - Progress page with workout charts
  - Weekly summary with AI insights
  - Mobile responsive view

- [ ] **Demo Video (2-3 min):**
  - Show Samantha voice interaction (greet user, log workout via voice)
  - Demonstrate manual workout logging (click button, set pain level)
  - Show progress charts with workout history
  - Display AI-generated weekly summary with Gemini insights
  - Highlight accessibility features (large buttons, clear text)
  - Test on mobile device

### 4. Technical Details
**Built With:**
- ElevenLabs Conversational AI (voice coaching & workout logging)
- Google Gemini API (personalized greetings & weekly insights)
- Firebase Hosting (Google Cloud Platform)
- Firebase Cloud Functions (Node.js serverless backend)
- Firebase Firestore (real-time database)
- Firebase Authentication (Google Sign-In)
- Firebase Secret Manager (secure API key storage)
- Progressive Web App (PWA) with service worker
- HTML5, Tailwind CSS, JavaScript

**Key Features:**
- Voice-activated workout logging with Samantha
- Manual workout logging with pain tracking (0-10 scale)
- AI-generated personalized greetings based on workout history
- AI-generated weekly summaries with motivational insights
- 15 gentle exercises (12 seated, 3 standing) with clear instructions
- Real-time progress charts showing workout trends
- Senior-accessible design (WCAG compliant)
- Offline PWA support
- Mobile responsive on all devices

**Architecture:**
- Frontend: Static HTML/JS hosted on Firebase
- Backend: 3 Firebase Cloud Functions (getRecentHistory, logWorkout, getWeeklySummary)
- Database: Firestore (users/{userId}/sessions collection)
- AI Integration: Gemini API for insights, ElevenLabs for voice coaching
- Security: Firebase Auth + Firestore Rules + Secret Manager

### 5. Testing Checklist (Complete Tomorrow)
- [ ] **Authentication:** Google Sign-In works (or Anonymous Auth as fallback)
- [ ] **Samantha Voice Logging:** Say "I did hamstring stretch, pain level 3" → workout logs
- [ ] **Manual Logging:** Click "Log Workout" → set pain slider → saves to database
- [ ] **Recent History:** Samantha greets with "Welcome back! You've done X workouts..."
- [ ] **Weekly Summary:** View weekly-summary.html → see AI-generated insights
- [ ] **Progress Charts:** View progress.html → see workout trends over time
- [ ] **All 15 Exercises Display:** Verify all exercise cards show with images and badges
- [ ] **Mobile Responsive:** Test on phone/tablet
- [ ] **Gemini Integration:** Verify AI insights appear in greetings and summaries
- [ ] **Database Logging:** Check Firestore shows saved workouts

### 6. Before Submitting Tomorrow
- [ ] Fix Google Sign-In (or implement Anonymous Auth)
- [ ] Test complete user flow end-to-end
- [ ] Take all screenshots
- [ ] Record demo video (2-3 min)
- [ ] Upload video to YouTube (unlisted or public)
- [ ] Create submission.zip (EXCLUDE: config.local.js, users.json, node_modules/, .git/)
- [ ] Fill out Devpost form with all details
- [ ] Submit before deadline!

## Demo Video Script (2-3 minutes)

**Introduction (20 sec):**
"Hi! I'm demoing PorchFitness - an AI-powered fitness app that combines ElevenLabs conversational AI with Google Gemini to make gentle exercise accessible for everyone, especially seniors."

**Show the App (30 sec):**
- Browse the 15 exercise cards
- Point out clear instructions with reps/duration badges
- Show mobile responsiveness

**ElevenLabs Voice Coaching Demo (45 sec):**
- Click Samantha widget
- Say: "What were my recent workouts?"
- Samantha responds with AI-generated greeting
- Say: "I just did the hamstring stretch, my pain level was 3"
- Show workout logging confirmation

**Manual Workout Logging (30 sec):**
- Click "Log Workout" button on an exercise
- Demonstrate pain slider (0-10)
- Add optional notes
- Save and confirm

**AI-Powered Insights (30 sec):**
- Navigate to Weekly Summary page
- Show Gemini-generated weekly summary with stats
- Highlight AI motivational message

**Closing (15 sec):**
"PorchFitness makes fitness accessible through voice-first AI coaching, intelligent progress tracking, and senior-friendly design. Built with ElevenLabs and Google Cloud."

## Important Notes
- ✅ Gemini API key is securely stored in Firebase Secret Manager (not in code)
- ✅ Firebase config in HTML files is public by design (safe to include)
- ✅ ElevenLabs Agent ID is public (safe to include)
- ❌ NEVER include config.local.js in submission.zip
- ❌ NEVER include users.json (contains user data)
- ✅ APP_OVERVIEW_AND_TODO.md is great to include for judges (shows documentation)
