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

As a physical therapist, I've seen countless seniors struggle with at-home exercise programs: confusing printed sheets, no guidance on form, and no accountability. During the pandemic, this gap became a health crisis. I envisioned an AI coach that could provide the same encouragement and real-time feedback I give in clinic, but capable of performing anywhere, even on their front porch.

### What it does

Porch Fitness delivers 15 gentle exercises (12 seated, 3 standing) through Samantha, an AI fitness coach powered by ElevenLabs Conversational AI. The app works in two ways:

**Quick Logging Mode:** Users browse exercise cards with clear descriptions and protocol badges. Click "Log Workout" to manually track completion with a pain slider (0-10 scale) and optional notes.

**Voice Coaching Mode:** Click Samantha's chat widget to have a natural conversation. She guides you through exercises with proper pacing, asks about pain levels, and logs workouts automatically via voice. Samantha remembers your history and greets you with personalized insights powered by Google Gemini AI.

The app tracks workout history and pain patterns, then generates weekly progress summaries with personalized recommendations. Users can communicate in English, Spanish, or French with native-quality voices.

### How we built it

- **Frontend**: Vanilla JavaScript with Tailwind CSS, designed for large text and high contrast (senior-accessible)
- **Voice AI**: ElevenLabs Conversational AI with custom agent personality and client tools integration
- **Intelligence**: Google Gemini 2.0 Flash for workout analysis, memory retrieval, and progress insights
- **Backend**: Firebase Cloud Functions, Firestore for user data persistence, Firebase Authentication
- **Architecture**: Client tools bridge ElevenLabs voice to Firebase/Gemini, enabling real-time workout logging and history retrieval during conversations

**Technical Flow:**
1. User signs in → Firebase Authentication (Google OAuth)
2. Chooses exercise → Talks to Samantha (ElevenLabs Conversational AI)
3. Samantha greets user → Calls `getRecentHistory` webhook → Firebase Function queries Firestore → Gemini analyzes history → Returns personalized greeting
4. Samantha guides exercise → Counts slowly with proper 2-3 second pacing
5. Samantha asks about pain → User responds → Calls `logWorkout` webhook → Saves to Firestore
6. User asks "How did I do this week?" → Samantha calls `getWeeklySummary` webhook → Firebase Function calls Gemini → Returns AI-generated insights

### Challenges we ran into

**Voice + Data Integration**: Connecting ElevenLabs conversational AI to Firebase/Gemini required building custom client tools that could execute during live voice conversations. Making Samantha reliably call `logWorkout` after each exercise while maintaining natural conversation flow took extensive prompt engineering.

**Multilingual Voice Quality**: ElevenLabs auto-translation produced poor Spanish accents. However they have different voices you can add to yur agent voices and specify when to use those voices.  Solution: configured separate native voices for English, Spanish, and French rather than relying on translation.

**Senior-Friendly UX**: Balancing accessibility (large fonts, high contrast) with information density. Iterated to 18px base font, eliminated clutter, made every interactive element 56px+ for easy clicking.

**Dual UX Design**: Balancing two interaction modes: (1) quick manual logging for users who don't want conversation, and (2) full voice guidance for those who need coaching. Made both paths equally accessible without overwhelming new users.

### Accomplishments that we're proud of

- **Real AI Memory**: Samantha genuinely remembers users across sessions. "Welcome back! Last time you did neck stretches with pain level 2"
- **Pain Pattern Detection**: Gemini analyzes weekly workout data to warn users if pain is increasing or suggest safer exercises
- **True Multilingual Support**: Not just translated text, but native-quality voices in 3 languages
- **Zero Learning Curve**: Seniors can use it without training. Just click and talk, or use simple manual logging
- **Clinical Accuracy**: All 15 exercises are evidence-based PT protocols for mobility and pain management
- **True Integration, Not Side-by-Side**: ElevenLabs triggers Gemini analysis via Firebase Functions, results feed back naturally into conversation

### What we learned

- Voice-first design is fundamentally different from screen-first. Success meant letting go of visual confirmation and trusting the voice interaction.
- Gemini 2.0 Flash is incredibly fast for real-time analysis. Workout history queries return in under 500ms.
- Prompt engineering is everything with conversational AI. Samantha's personality evolved through 20+ iterations to find the right balance of encouraging without being patronizing.
- Accessibility benefits everyone, not just seniors. The large, clear design tested well with all age groups.
- Dual UX paths work: Some users love talking to Samantha, others just want quick manual logging. Supporting both increased adoption without adding complexity.

### What's next for Porch Fitness

**Sustainability & Scale (Q1-Q2 2026)**

*Current Challenge:* Operating costs (ElevenLabs Conversational AI, Google Gemini API, Firebase cloud storage and functions) make unlimited free access unsustainable at scale. However, we're committed to accessibility.

*Our Approach:*
- **Core features remain free forever:** Manual workout logging, progress tracking, and basic charts accessible to everyone
- **Premium voice tier ($6.99/month):** Unlimited Samantha conversations for users who want full AI coaching
- **Winning ElevenLabs API credits would enable:** 6-month free pilot with 500+ seniors to validate clinical outcomes and gather real-world usage data before implementing pricing

*Primary Revenue Path - B2B Partnerships:*
- **Senior living facilities** ($199-299/month per facility) - Residents get free access, facilities reduce fall risk and improve resident engagement
- **Healthcare provider tier** - PT/OT clinics monitor patient compliance between visits, improving outcomes
- **Corporate wellness** - Accessible seated exercises for employees with limited mobility

This sustainable model lets us serve more people long-term while keeping the mission-driven core accessible to everyone.

**Advanced Analytics**: Trend graphs showing pain levels over time, exercise frequency heatmaps

**Personalized Routines**: Gemini-generated custom workout plans based on user's pain patterns and goals

**Social Features**: Connect with friends, share progress, group challenges

**Provider Portal**: Physical therapists can monitor patient compliance and adjust programs remotely

**Expand Languages**: Add Chinese, Hindi, Portuguese with native voice support

**Mobile App**: Native iOS/Android versions with offline mode and push notifications for workout reminders (target: end of January 2026)

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

**Introduction (40 sec)**
"Hi! I'm exciting to share PorchFitness with you. Porch Fitness includes chair-based exercises designed for anyone, but especially great for seniors and people with limited mobility or balance challenges. Meet Samantha - she's a senior fitness coach and an ElevenLabs Conversational AI agent who guides you through the entire experience with her natural voice. Behind the scenes, Google Gemini API analyzes your workout history, detects pain patterns, and generates personalized insights. It's a truly voice-driven experience - no screen required. Let me show you."

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

## YouTube Video Metadata

### Video Title (100 chars max)
PorchFitness - Voice AI Fitness Coach | ElevenLabs + Google Gemini Challenge

### Video Description
```
PorchFitness: Voice-First AI Fitness Coaching for Everyone

Built for the ElevenLabs Challenge, PorchFitness combines ElevenLabs Conversational AI with Google Gemini API to create Samantha - a senior fitness coach who guides users through chair-based exercises entirely by voice.

🎯 Key Features:
• 15 gentle exercises (12 seated, 3 standing)
• Natural voice coaching with ElevenLabs AI
• AI-powered workout analysis with Google Gemini
• Pain tracking and personalized insights
• Weekly progress summaries
• Multilingual support (English, Spanish, French)

⏱️ Timestamps:
0:00 - Introduction & Challenge Overview
0:40 - Homepage Tour
0:55 - Google Sign-In
1:05 - Choosing an Exercise
1:25 - Voice Coaching with Samantha
2:25 - Manual Logging Option
2:45 - Progress Tracking Charts
3:10 - AI-Generated Weekly Summary
3:40 - Closing Thoughts

🔗 Try It Live: https://porchfitness.com
📊 Progress Dashboard: https://porchfitness.com/progress.html
📈 Weekly Summary: https://porchfitness.com/weekly-summary.html
💻 GitHub: https://github.com/Anety5/porchfitness

🛠️ Built With:
• ElevenLabs Conversational AI
• Google Gemini 2.0 Flash API
• Firebase (Hosting, Functions, Firestore, Auth)
• Vanilla JavaScript + Tailwind CSS
• Chart.js for data visualization

♿ Designed for accessibility with large fonts, high contrast, and voice-first interaction - perfect for seniors and anyone with limited mobility.

🏆 Submitted to: ElevenLabs + Google Cloud AI Challenge

---

Made with ❤️ by Lava Rock Labs
https://lavarocklabs.com

#ElevenLabs #GoogleGemini #AI #VoiceAI #Accessibility #Healthcare #SeniorFitness #ConversationalAI #Firebase #PWA
```

### Video Tags (Copy-paste)
```
ElevenLabs, Google Gemini, conversational ai, voice ai, senior fitness, accessibility, healthcare technology, firebase, ai challenge, physical therapy, workout tracker, ElevenLabs agent, voice first, fitness app, pwa
```

### Category
Science & Technology

### Thumbnail Suggestions
**Option 1:** Screenshot of Samantha widget with text overlay "Voice AI Fitness Coach"
**Option 2:** Split screen: Samantha on left, weekly summary chart on right
**Option 3:** Text-based with icons: "ElevenLabs + Gemini" logos with "Voice-First Fitness" headline

### Playlist Suggestions
- ElevenLabs Challenge Submissions
- AI Projects 2025
- Healthcare Technology
- Voice AI Applications

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
