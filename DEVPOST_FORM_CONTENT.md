# Devpost Submission Form Content

## Project Title
PorchFitness - AI-Coached Gentle Exercises for Everyone

## Tagline (60 chars max)
Voice-first exercise coaching with AI memory and insights

## Category
- Accessibility
- Healthcare
- Voice-First Applications
- AI-Powered Applications

## Technologies Used
**Copy-paste this list:**
```
ElevenLabs Conversational AI
Google Gemini API
Firebase Hosting
Firebase Cloud Functions
Firebase Firestore
Firebase Authentication
Firebase Secret Manager
HTML5
CSS3 (Tailwind CSS)
JavaScript
Chart.js
Progressive Web App (PWA)
```

## Project Description

**Copy this entire section into Devpost:**

### Inspiration

As a physical therapist, I've seen countless seniors struggle with at-home exercise programs: confusing printed sheets, no guidance on form, and no accountability. During the pandemic, this gap became a health crisis. I envisioned an AI coach that could provide the same encouragement and real-time feedback I give in clinic, but accessible from their living room chair - or for anyone with limited mobility, recovering from injury, or just starting their fitness journey.

### What it does

PorchFitness delivers **15 voice-guided exercises** (12 seated, 3 standing with chair support) through Samantha, an AI fitness coach powered by ElevenLabs Conversational AI. The app works in two ways:

**Simple Mode:** Users browse exercise cards with clear descriptions, images, and protocol badges showing sets/reps. Click "Log Workout" to manually track completion with a pain slider (1-10 scale) and optional notes.

**Voice Mode:** Click Samantha's chat widget to have a natural conversation. She guides you through exercises with proper pacing ("Twenty... breathe... Nineteen..."), asks about pain levels after each one, and logs workouts automatically via voice. Samantha remembers your history and greets you with personalized insights powered by Google Gemini AI.

**Key Features:**
- **15 Gentle Exercises** - 12 seated, 3 standing (with chair for balance)
- **Dual Logging Options** - Voice with Samantha OR manual UI with pain slider
- **AI Memory & Progress Tracking** - Samantha remembers past workouts across sessions
- **Pain Level Monitoring** - Track discomfort (1-10 scale) to identify trends
- **Weekly AI Summaries** - Gemini analyzes patterns and provides motivational insights
- **Google Sign-In** - Simple, secure authentication
- **Progress Charts** - Visualize workout frequency, pain trends, exercise variety
- **No app download** - Works on any device with a browser
- **Accessible Design** - Large text, high contrast, keyboard navigation, screen reader support

### How we built it

**True AI Partnership:**

We built PorchFitness as a demonstration of true AI integration between ElevenLabs and Google Gemini - not just two APIs used separately, but working together seamlessly:

1. **User signs in** → Firebase Authentication (Google OAuth)
2. **Chooses exercise** → Talks to Samantha (ElevenLabs Conversational AI)
3. **Samantha greets user** → Calls `getRecentHistory` webhook → Firebase Cloud Function queries Firestore for last 3 workouts → Gemini analyzes history → Returns personalized greeting
4. **Samantha guides exercise** → Counts slowly with proper 2-3 second pacing
5. **Samantha asks about pain** → User responds → Calls `logWorkout` webhook → Saves to Firestore
6. **User asks "How did I do this week?"** → Samantha calls `getWeeklySummary` webhook → Firebase Function calls Gemini → Returns AI-generated insights

**Technical Architecture:**
- **Frontend:** HTML5, Tailwind CSS, JavaScript, Chart.js
- **Voice AI:** ElevenLabs Conversational AI with 3 client tools (webhooks)
- **Intelligence:** Google Gemini API for progress analysis and personalized insights
- **Backend:** Firebase Cloud Functions as middleware between ElevenLabs and Gemini
- **Database:** Firebase Firestore for persistent workout history
- **Auth:** Firebase Authentication with Google Sign-In
- **Security:** Firebase Secret Manager for API key storage
- **Hosting:** Firebase Hosting with custom domain (porchfitness.com)

### Challenges we ran into

1. **Voice + Data Integration** - Connecting ElevenLabs Conversational AI to Firebase/Gemini required building custom client tools (webhooks) that execute during live voice conversations. Making Samantha reliably call `logWorkout` after each exercise while maintaining natural conversation flow took extensive prompt engineering.

2. **OAuth Propagation Delays** - After configuring Google Sign-In redirect URIs, we had to wait 12+ hours for Google's OAuth system to propagate changes. Prepared Anonymous Auth fallback to avoid submission delays.

3. **Dual UX Design** - Balancing two interaction modes: (1) quick manual logging for users who don't want conversation, and (2) full voice guidance for those who need coaching. Made both paths equally accessible without overwhelming new users.

4. **Senior-Friendly Interface** - Creating large, clear UI (18px+ text, 56px touch targets, high contrast) while still fitting 15 exercises on one page without scrolling fatigue. Iterated through multiple layouts before finding the right balance.

5. **Service Worker Cache Management** - Ensuring users see updated content (especially when we added 2 new exercises) required careful cache versioning strategy. Learned to bump cache version for major UI changes.

### Accomplishments that we're proud of

1. **Real AI Memory** - Samantha genuinely remembers users across sessions. "Welcome back! Last time you did Neck Stretches - 3 reps, 60 seconds, pain level 2. Ready to continue?"

2. **True Integration, Not Side-by-Side** - ElevenLabs triggers Gemini analysis via Firebase Functions, results feed back naturally. Not just two APIs used separately.

3. **Pain Pattern Detection** - Gemini analyzes workout history to provide insights: "Your pain decreased from 4 to 2 over three sessions - great progress!"

4. **Zero Learning Curve** - Seniors can use it immediately. Either click "Log Workout" for quick tracking, or talk to Samantha for full guidance. No training needed.

5. **Clinical Accuracy** - All 15 exercises are evidence-based protocols for mobility and pain management. Each shows proper protocol (3 reps × 20 sec for stretches, 2 sets × 10 reps for strength).

6. **Accessibility for Everyone** - Built for seniors but perfect for anyone with limited mobility, recovering from injury, or new to fitness. Large text, high contrast, keyboard navigation.

### What we learned

1. **Voice-first design is fundamentally different** - Pacing matters more than we expected. Samantha counts "Twenty... breathe... Nineteen..." not "20, 19, 18". Success meant letting go of visual confirmation and trusting the voice interaction.

2. **Gemini 2.5 Flash is incredibly fast** - Workout history analysis returns in under 500ms, enabling real-time personalized greetings during conversation.

3. **Prompt engineering is everything** - Samantha's personality evolved through 20+ iterations to find the right balance: encouraging without being patronizing, remembering without being creepy, coaching without being pushy.

4. **Firebase is powerful for rapid development** - Cloud Functions, Firestore, Auth, Secret Manager, and Hosting working together seamlessly let us build production-ready infrastructure in days.

5. **Accessibility benefits everyone** - The large, clear design built for seniors works great for all age groups. What helps one helps many.

6. **Dual UX paths work** - Some users love talking to Samantha, others just want quick manual logging. Supporting both increased adoption without adding complexity.

### What's next for PorchFitness

**Phase 1: Enhanced Analytics (Q1 2026)**
- Detailed progress charts (pain trends, exercise frequency heatmaps, streaks)
- Export workout data as CSV
- Monthly AI-generated reports

**Phase 2: Mobile App (January 2026)** 🎯
- Native Android app release on Google Play Store (target: end of January 2026)
- Offline mode with local workout storage
- Push notifications for workout reminders
- **Note:** Seeking ElevenLabs API credits to support mobile user base growth

**Phase 3: Personalization**
- Gemini-generated custom workout plans based on mobility level and pain patterns
- Adaptive difficulty (AI suggests modifications in real-time)
- Multi-language expansion (Chinese, Hindi, Portuguese with native voice support)

**Phase 4: Healthcare Integration**
- Provider portal for physical therapists to monitor patient compliance
- Share progress reports with healthcare providers
- Integration with wearable devices (heart rate, movement tracking)
- HIPAA compliance for clinical use

**Phase 5: Community Features**
- Connect with friends for accountability
- Group challenges
- Community encouragement and success stories

## Links

**Live Demo:** https://porchfitness.com  
**Firebase Hosting:** https://porchfitness-98628.web.app  
**GitHub:** https://github.com/Anety5/porchfitness  
**Progress Dashboard:** https://porchfitness.com/progress.html  
**Weekly Summary:** https://porchfitness.com/weekly-summary.html  

## Built With (Tags)
elevenlabs, gemini, firebase, ai, voice-ai, accessibility, healthcare, pwa, javascript, html5, css3, tailwind-css, cloud-functions, firestore

## Team
Lava Rock Labs (https://lavarocklabs.com)

---

## Video Demo Script (2-3 minutes)

**Introduction (20 sec)**
"Hi! I'm showing PorchFitness - voice-first exercise coaching for everyone. It uses ElevenLabs and Google Gemini to create an AI coach that remembers your progress."

**Show Homepage (15 sec)**
[Screen: porchfitness.com]
"Here's the homepage with 15 exercises - 12 seated, 3 standing with chair support."

**Sign In (10 sec)**
[Click "Sign In with Google"]
"Simple Google sign-in - one click and you're ready."

**Choose Exercise (20 sec)**
[Click "Seated Neck Stretches"]
"Each exercise shows protocol - this one is 3 reps times 20 seconds."

**Talk to Samantha (60 sec)**
[Click Samantha widget]
"Hello Samantha"
[Samantha responds with personalized greeting]
"She remembers my last workout! Now she guides me through the exercise..."
[Samantha counts: "Twenty... breathe... Nineteen..."]
"Notice the slow pacing - perfect for safe movement."
[Samantha asks about pain]
"About a 2"
[Samantha logs workout]

**Manual Logging (20 sec)**
[Click "Log Workout" button on another exercise]
"You can also log manually with the pain slider and notes."
[Show modal, adjust slider, save]

**Progress Tracking (25 sec)**
[Navigate to progress.html]
"Here's my workout history with charts showing trends."
[Scroll through charts]

**Weekly Summary (30 sec)**
[Navigate to weekly-summary.html]
"And here's the AI-generated weekly summary from Gemini."
[Show stats and insights]

**Closing (20 sec)**
"This shows true AI partnership - ElevenLabs provides voice and personality, Gemini provides intelligence and insights. Together they create a coach that learns and adapts. Thanks for watching!"

---

## Screenshots Needed (6 images)

1. **Homepage** - Full view with 15 exercise cards
2. **Exercise Card Detail** - Showing badges and "Log Workout" button
3. **Samantha Widget** - Active conversation
4. **Workout Logging Modal** - Pain slider and notes
5. **Progress Charts** - Workout history visualization
6. **Weekly Summary** - AI-generated insights from Gemini

---

## Pre-Submission Checklist

- [ ] All secrets removed from submission.zip
- [ ] Demo video recorded and uploaded (YouTube/Vimeo)
- [ ] 6 screenshots taken
- [ ] Devpost form filled out
- [ ] GitHub repository public
- [ ] Live site tested (porchfitness.com)
- [ ] All links working
- [ ] Team information added
- [ ] Submit before deadline!

---

## After Submission

Remember to:
- Share on social media (Twitter, LinkedIn)
- Add to portfolio
- Consider continuing development (Phase 2 features)
- Document lessons learned
