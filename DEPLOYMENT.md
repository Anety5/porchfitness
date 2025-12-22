# 🚀 Firebase Hosting Deployment Guide

## Prerequisites
1. Install Firebase CLI:
```powershell
npm install -g firebase-tools
```

2. Login to Firebase:
```powershell
firebase login
```

## Deployment Steps

### 1. Initialize Firebase Project
```powershell
cd c:\Users\Annet\Documents\porchfitness-elevenlabs-challenge
firebase init hosting
```

**When prompted:**
- Select existing project or create new one
- **Public directory:** `.` (current directory)
- **Configure as single-page app:** `Yes`
- **Set up automatic builds:** `No`
- **Overwrite index.html:** `No`

### 2. Update .firebaserc
Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID

### 3. Deploy to Firebase
```powershell
firebase deploy --only hosting
```

### 4. Get Your URL
After deployment, you'll get a URL like:
`https://your-project-id.web.app`

## PWA Icons - IMPORTANT!
Replace these placeholder files with actual PNG images:
- `/images/icon-192.png` - 192x192px logo
- `/images/icon-512.png` - 512x512px logo

You can create these with:
- Canva (free)
- Figma (free)
- Use the 🏡 emoji as your icon
- Online PWA icon generators

## Test PWA Installation
1. Open your deployed site in Chrome
2. Look for "Install" button in address bar
3. Click to install as PWA
4. App should open in standalone window

## Custom Domain (Optional)
```powershell
firebase hosting:channel:deploy production --expires 30d
```

Then add custom domain in Firebase Console:
https://console.firebase.google.com → Hosting → Add custom domain

---

**✅ What's Configured:**
- ✅ PWA manifest with app metadata
- ✅ Service worker for offline support
- ✅ Firebase hosting config with caching
- ✅ Responsive meta tags
- ✅ Install prompts enabled

**🎯 Ready to deploy!**
