# PorchFitness - ElevenLabs Accelerate Challenge

**Voice-Powered Chair Exercises for Everyone**

---

## Project Overview

PorchFitness is a voice-first web application that guides users through gentle chair exercises and standing exercises (using a chair for balance support) using ElevenLabs Conversational AI powered by Google Gemini. The AI coach remembers your progress, tracks your workouts, and provides personalized insights—all without app downloads or complicated interfaces. Perfect for seniors, people with limited mobility, those recovering from injury, or anyone seeking accessible fitness.

---

## Key Features

- **Voice-First Design** - Natural conversation with AI coach (Samantha)
- **15 Gentle Exercises** - 12 seated, 3 standing (with support)
- **Expandable Exercise Cards** - Click any exercise to see detailed step-by-step instructions with images
- **AI Memory & Progress Tracking** - Remembers your workouts and provides personalized insights
- **Pain Level Monitoring** - Track discomfort levels (1-10 scale) over time
- **Weekly AI Summaries** - Gemini-powered insights on your progress
- **Voice & Manual Logging** - Log workouts by talking to Samantha or using the UI
- **Google Sign-In** - Simple, secure authentication
- **Safety-First** - Built-in medical guardrails and reminders
- **Accessible Anywhere** - No app download required, works on any device

---

## Quick Start

1. Visit https://porchfitness.com
2. Sign in with Google (one click)
3. Click any exercise card to see detailed instructions
4. Talk to Samantha - she'll guide you through the exercise
5. Rate your pain level after each workout
6. Check your progress anytime at the Progress or Weekly Summary pages

---

## Exercise List

### Seated Exercises (12 total)
1. Seated Piriformis Stretch (Modified)
2. Seated Hamstring Stretch
3. Sit to Stands
4. Seated Cat-Cow Stretch
5. Seated Arm Raises
6. Seated Ankle Circles
7. Seated Side Bends
8. Seated Spinal Twist
9. Figure 4 Stretch
10. Seated Shoulder Rolls
11. Seated Neck Stretches
12. Seated Marching

### Standing Exercises (3 total)
13. Standing Hip Extension
14. Standing Side Bend
15. Standing Calf Stretch

**Protocol:**
- Stretches: 3 reps × 20 seconds = 60 seconds total
- Strength: 2 sets × 10 reps = 20 reps total
- Samantha counts out loud with proper pacing

---

## Technical Stack

- **Frontend:** HTML, CSS (Tailwind CSS), JavaScript
- **Voice AI:** ElevenLabs Conversational AI (Agent ID: agent_1501kd4t27ftf2br1c7p1tm53kjg)
- **Language AI:** Google Gemini API (progress insights, personalized greetings)
- **Backend:** Firebase Cloud Functions (3 functions: getRecentHistory, logWorkout, getWeeklySummary)
- **Database:** Firebase Firestore (workout history, user sessions)
- **Authentication:** Firebase Auth (Google Sign-In)
- **Security:** Firebase Secret Manager (API key storage)
- **Hosting:** Firebase Hosting + Custom Domain (porchfitness.com)
- **PWA:** Progressive Web App with offline support

---

## Challenge Category

**ElevenLabs Accelerate Hackathon**
- Category: Accessibility / Healthcare / Voice-First
- Focus: Bridging digital divide for seniors
- Impact: Promoting healthy aging through accessible technology
- Integration: True AI partnership between ElevenLabs and Google Gemini

---

## Live URLs

- **Production Site:** https://porchfitness.com
- **Firebase Hosting:** https://porchfitness-98628.web.app
- **Progress Dashboard:** https://porchfitness.com/progress.html
- **Weekly Summary:** https://porchfitness.com/weekly-summary.html

---

## Project Status

**Date:** December 26, 2025  
**Status:** ✅ Deployed and ready for submission  
**Latest Update:** Added expandable exercise cards with detailed step-by-step instructions  
**Infrastructure:** All Firebase services configured and working

---

## Documentation

For complete setup and technical details, see:
- [APP_OVERVIEW_AND_TODO.md](APP_OVERVIEW_AND_TODO.md) - Complete technical documentation
- [DEVPOST_SUBMISSION.md](DEVPOST_SUBMISSION.md) - Submission checklist and content
- [TODO.md](TODO.md) - Current tasks and priorities
- [SAMANTHA_SYSTEM_PROMPT.md](SAMANTHA_SYSTEM_PROMPT.md) - AI coach configuration

---

## License

MIT License - See LICENSE file for details

---

Built with ❤️ for seniors who deserve safe, accessible fitness coaching  
**Developed by:** Lava Rock Labs (https://lavarocklabs.com)
