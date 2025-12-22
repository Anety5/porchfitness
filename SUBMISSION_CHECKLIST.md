# 🚀 PorchFitness - Devpost Submission Checklist

## 📋 Pre-Submission Tasks

### 1. ✅ COMPLETED
- [x] Website design (senior-accessible)
- [x] 13 exercise cards with images
- [x] ElevenLabs AI voice coach integration
- [x] PWA manifest and service worker
- [x] Accessibility features (ARIA, keyboard nav)

### 2. 🎨 Logo/Icons (Do This First)
- [ ] Save your 512x512 logo as: `images/icon-512.png`
- [ ] Create 192x192 version as: `images/icon-192.png`
  - Use: https://www.iloveimg.com/resize-image
  - Or: I can resize it via PowerShell

### 3. 📦 GitHub Repository (Optional but Recommended)
```powershell
# Initialize Git
cd c:\Users\Annet\Documents\porchfitness-elevenlabs-challenge
git init
git add .
git commit -m "Initial commit: PorchFitness for ElevenLabs Challenge"

# Create repo on github.com then:
git remote add origin https://github.com/YOUR_USERNAME/porchfitness.git
git branch -M main
git push -u origin main
```

**Why GitHub?**
- ✅ Required for Devpost submission (show your code)
- ✅ Portfolio piece
- ✅ Version control

### 4. 🔥 Firebase Hosting Deployment

**Step 1: Install Firebase CLI**
```powershell
npm install -g firebase-tools
```

**Step 2: Login to Firebase**
```powershell
firebase login
```

**Step 3: Create Firebase Project**
- Go to: https://console.firebase.google.com
- Click "Add Project"
- Name: **porchfitness** (or PorchFitness)
- Disable Google Analytics (optional)
- Create

**Step 4: Initialize Firebase in Your Project**
```powershell
cd c:\Users\Annet\Documents\porchfitness-elevenlabs-challenge
firebase init hosting
```

**When prompted:**
- **Existing project?** Yes → Select "porchfitness"
- **Public directory?** `.` (dot for current folder)
- **Single-page app?** Yes
- **Automatic builds with GitHub?** No (for now)
- **Overwrite index.html?** NO!

**Step 5: Update .firebaserc**
Edit the file and replace `your-project-id` with your actual Firebase project ID (e.g., `porchfitness`)

**Step 6: Deploy!**
```powershell
firebase deploy --only hosting
```

You'll get a URL like: `https://porchfitness.web.app`

### 5. ❌ NO GCS Bucket Needed!
Firebase Hosting handles everything:
- Serves HTML, CSS, JS, images
- CDN with HTTPS
- No separate GCS bucket required
- Firebase Hosting IS the storage solution

### 6. 📝 Devpost Submission

**Required Info:**
- **Project Title:** PorchFitness - Voice-Coached Chair Exercises for Seniors
- **Tagline:** Accessible fitness coaching with ElevenLabs AI for older adults
- **Category:** Healthcare, Accessibility, Voice-First
- **Live Demo URL:** Your Firebase URL
- **GitHub URL:** Your repo link
- **Technologies:** ElevenLabs Conversational AI, HTML/CSS/JS, Firebase, PWA
- **Video:** (Optional but recommended - 2-3 min demo)

**Description Template:**
```
PorchFitness brings gentle chair exercises to seniors through voice-first AI coaching powered by ElevenLabs Conversational AI.

## Inspiration
[Why you built this]

## What it does
- 13 gentle seated and standing exercises
- Natural voice guidance from ElevenLabs AI coach
- Senior-accessible design (large text, high contrast, screen reader support)
- No app download needed - works in any browser
- Progressive Web App for offline use

## How we built it
- ElevenLabs Conversational AI for voice coaching
- HTML/CSS/JavaScript (Tailwind)
- Firebase Hosting
- PWA (Progressive Web App)
- WCAG AAA accessibility standards

## Challenges
[What was hard]

## Accomplishments
[What you're proud of]

## What we learned
[Key takeaways]

## What's next
[Future plans]
```

### 7. 📸 Screenshots/Video (Important!)
- **Homepage screenshot** (desktop)
- **Exercise card screenshot** (mobile)
- **AI coach in action** (video or screenshot)
- **Demo video** (2-3 minutes showing the voice coaching)

---

## 🎯 Quick Deployment Order

1. **Add logo icons** (5 min)
2. **Create GitHub repo** (10 min)
3. **Deploy to Firebase** (15 min)
4. **Test live site** (10 min)
5. **Prepare Devpost submission** (30 min)
6. **Submit to Devpost** (10 min)

**Total Time: ~90 minutes**

---

## 📞 Need Help?
- Firebase setup: https://firebase.google.com/docs/hosting/quickstart
- Devpost guidelines: https://elevenlabs.devpost.com/
- Git help: https://docs.github.com/en/get-started

---

**🎉 You're 80% done! Just deployment and submission left!**
