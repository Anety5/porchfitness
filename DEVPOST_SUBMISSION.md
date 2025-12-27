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
- Difficulty level tracking (easy/medium/hard)
- Visual progress charts showing workout trends
- Weekly summaries with AI-generated insights

♿ Built for Accessibility:
- Large fonts (18px+ base), high contrast design
- 56px+ touch targets for easy interaction
- Full keyboard navigation and ARIA labels
- Clean white-first design with subtle color accents
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
- Manual workout logging with pain tracking (0-10 scale) and difficulty level (easy/medium/hard)
- AI-generated personalized greetings based on workout history
- AI-generated weekly summaries with motivational insights
- 15 gentle exercises (12 seated, 3 standing) with clear instructions
- Real-time progress charts showing workout trends
- Senior-accessible design with clean white-first aesthetic (WCAG compliant)
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

---

## Standard Devpost Submission Sections

### 📝 Inspiration
What inspired us to create PorchFitness was watching family members struggle to find accessible exercise options. Many seniors and people with limited mobility want to stay active but face barriers like expensive gym memberships, intimidating fitness classes, or complicated technology. We saw an opportunity to combine ElevenLabs' natural conversational AI with Google's Gemini to create something truly special - a voice-first fitness companion that feels like having a personal coach on your porch.

The name "PorchFitness" embodies our vision: exercise should be as comfortable and accessible as sitting on your front porch. No special equipment needed, no pressure, just gentle movements guided by Samantha's supportive voice.

### 💡 What It Does
PorchFitness is a luxury wellness app that makes gentle exercise accessible through AI-powered voice coaching and intelligent progress tracking:

**Voice Coaching with Samantha (ElevenLabs):**
- Natural conversation for logging workouts: "I did the hamstring stretch, pain level 3, it felt easy"
- Samantha automatically extracts exercise name, pain level, and difficulty
- Real-time guidance during exercises
- Personalized greetings based on your recent workout history

**AI-Powered Insights (Google Gemini):**
- Generates motivational weekly summaries analyzing your progress
- Creates personalized workout greetings
- Identifies pain trends and provides encouragement
- Adapts messaging based on your consistency

**15 Gentle Exercises:**
- 12 seated exercises (perfect for limited mobility)
- 3 standing exercises (for those who want more challenge)
- Evidence-based movements targeting flexibility, strength, and mobility
- Clear instructions with rep counts and hold times

**Smart Progress Tracking:**
- Visual charts showing workout frequency
- Pain level tracking over time for safety monitoring
- Difficulty progression tracking (easy/medium/hard)
- Weekly statistics and trends

**Accessible Design:**
- Clean white-first aesthetic with subtle color guidance
- Large fonts (18px base) and high-contrast text
- 56px+ touch targets for easy clicking
- Full keyboard navigation and screen reader support
- Mobile-responsive on all devices

### 🛠️ How We Built It
**Frontend:**
- HTML5 with Tailwind CSS for responsive, accessible design
- Progressive Web App (PWA) with service worker for offline capability
- Clean white-first design system with CSS variables for consistency
- Large fonts and touch targets optimized for seniors

**AI Integration:**
- **ElevenLabs Conversational AI:** Embedded widget (agent_1501kd4t27ftf2br1c7p1tm53kjg) with 3 custom client tools
  - `getRecentHistory`: Returns recent workouts for personalized greetings
  - `logWorkout`: Logs exercises with 6 parameters (exerciseName, painLevel, notes, repsCompleted, durationSeconds, difficultyLevel)
  - `getWeeklySummary`: Returns weekly stats for Gemini to analyze
- **Google Gemini API (gemini-2.0-flash-001):** Generates personalized insights and weekly summaries

**Backend (Firebase/Google Cloud):**
- Firebase Hosting for static site deployment
- Cloud Functions (Node.js) for serverless API endpoints
- Firestore for real-time database (users/{userId}/sessions collection)
- Firebase Authentication (Google Sign-In)
- Secret Manager for secure API key storage

**Development Process:**
1. Designed 15 evidence-based exercises with clear instructions
2. Built accessible UI with senior-friendly design principles
3. Integrated ElevenLabs widget and configured client tools for voice logging
4. Created Firebase Cloud Functions to handle workout logging and AI queries
5. Connected Gemini API for intelligent weekly summaries
6. Implemented progress tracking with visual charts
7. Optimized for mobile and tested accessibility features
8. Deployed to Firebase Hosting

### 🚧 Challenges We Ran Into
**1. ElevenLabs Widget Not Loading:**
Widget wouldn't appear - script URL had changed from `elevenlabs.io/convai-widget/index.js` to `unpkg.com/@elevenlabs/convai-widget-embed`. Critical fix that unblocked voice features.

**2. Agent Credits Exhausted:**
Original ElevenLabs agent ran out of credits mid-development. Had to create new agent (agent_1501kd4t27ftf2br1c7p1tm53kjg) and update all configuration.

**3. Gemini API Cost Management:**
Initially used gemini-1.5-pro which was expensive. Switched to gemini-2.0-flash-001 for better cost efficiency while maintaining quality insights.

**4. Firestore Timestamp Issues:**
Progress page showed no data. Fixed by converting JavaScript Dates to `firebase.firestore.Timestamp.fromDate()` for proper query comparisons.

**5. UI/UX Iterations:**
Started with colorful emoji-heavy design that overwhelmed seniors. Pivoted to clean white-first aesthetic with selective color only for guidance. Multiple font size adjustments to find the right balance (settled on 18px base).

**6. Authentication Flow:**
Duplicate sign-in buttons across pages confused users. Centralized auth to homepage only, simplifying the entire user experience.

**7. Mobile Widget Blocking Buttons:**
ElevenLabs widget covered action buttons on mobile. Resized widget in dashboard and adjusted positioning to fix UI conflicts.

### 🎓 What We Learned
**Technical Insights:**
- ElevenLabs client tools are incredibly powerful for voice-first apps - they extract structured data from natural speech
- Always use CDN package URLs (`unpkg.com`) for third-party widgets rather than direct domain links
- Firebase Timestamp handling requires careful date conversion - never compare Date objects directly
- Authentication state management should be centralized to avoid UX confusion

**AI Integration:**
- Combining ElevenLabs (conversational) with Gemini (analytical) creates a powerful duo - each AI handles what it does best
- Gemini's `gemini-2.0-flash-001` model is perfect for generating personalized, empathetic fitness insights
- Structured prompts with clear context (workout history, pain trends) produce much better AI responses

**Design for Accessibility:**
- Seniors prefer clean, uncluttered designs with generous white space over colorful, busy interfaces
- Font size matters more than we thought - 18px base is the minimum, not a luxury
- High contrast and large touch targets (56px+) make a huge difference in usability
- Testing on actual mobile devices reveals issues that desktop responsive mode doesn't catch

**Development Process:**
- Start with accessibility requirements first, not as an afterthought
- Progressive enhancement works - build core features that work without JavaScript, then enhance
- Good documentation (like our EXERCISE_KNOWLEDGE.txt) helps both development and judges understand the project

### 🚀 What's Next for PorchFitness
**Immediate:**
- Add more exercises (balance, breathing, coordination)
- Goal-setting feature: "I want to do 3 workouts this week"
- Shareable progress reports for healthcare providers

**Growth:**
- Multi-language support for diverse communities
- Video demonstrations alongside images
- iOS/Android native apps
- Partner with senior centers and physical therapists

We want PorchFitness to become the trusted platform for accessible exercise, helping people stay active and independent through the power of conversational AI.
