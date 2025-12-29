# PorchFitness - Devpost Submission

## About This Submission Package

This submission package contains the complete source code for PorchFitness. To keep the submission file size under 35MB (per Devpost requirements), **exercise images are hosted on Firebase Hosting** rather than included in this zip.

### Live Demo
🔗 **https://porchfitness.com** - Fully functional with all images and features

### What's Included
- ✅ All HTML files (index.html, progress.html, weekly-summary.html, privacy.html)
- ✅ PWA assets (manifest.json, service-worker.js, PWA icons)
- ✅ Firebase configuration (firebase.json, firestore.rules)
- ✅ Firebase Cloud Functions source code (functions/index.js, functions/package.json)
- ✅ Configuration files (config.js)
- ✅ Documentation (README.md, LICENSE)
- ✅ Project structure documentation (docs/)

### Exercise Images (Hosted on Firebase)
The 15 exercise images (~36 MB total) are hosted at:
- **https://porchfitness.com/images/seated-neck-stretches.jpg**
- **https://porchfitness.com/images/seated-shoulder-rolls.jpg**
- **https://porchfitness.com/images/seated-ankle-circles.jpg**
- _(and 12 more)_

All image paths in HTML files use relative URLs (`images/...`) which automatically resolve to Firebase Hosting when deployed.

### PWA Icons Included
Essential PWA assets are included in `images/` folder:
- `icon-192.png` (192x192 - required for PWA)
- `icon-512.png` (512x512 - required for PWA)
- `samantha-avatar.png` (AI coach avatar)

### How to Run Locally

**Option 1: View Live Site (Recommended)**
```
Visit: https://porchfitness.com
```

**Option 2: Run Locally with Firebase**
```bash
# Install dependencies
npm install -g firebase-tools
cd functions && npm install

# Serve locally (will use Firebase Hosting for images)
firebase serve
```

**Option 3: Quick Local Test**
```bash
# Simple HTTP server (some features require Firebase backend)
python -m http.server 8000
# or
npx http-server -p 8000
```

### Firebase Setup
This app uses:
- **Firebase Hosting**: Serves app and exercise images
- **Firebase Cloud Functions**: Handles ElevenLabs webhooks and Gemini API calls
- **Firebase Firestore**: Stores workout history and user data
- **Firebase Authentication**: Google OAuth sign-in

### API Keys Required
For full functionality, you need:
- **ElevenLabs API Key** (Conversational AI agent)
- **Google Gemini API Key** (AI workout analysis)
- **Firebase Project** (Backend services)

See `README.md` for detailed setup instructions.

### Technologies
- ElevenLabs Conversational AI
- Google Gemini 2.0 Flash API
- Firebase (Hosting, Functions, Firestore, Auth)
- Vanilla JavaScript + Tailwind CSS
- Chart.js for progress visualization
- Progressive Web App (PWA)

### Repository
📦 **GitHub**: https://github.com/Anety5/porchfitness

### Team
Lava Rock Labs - https://lavarocklabs.com

---

**Note**: This PWA is designed to work offline after first visit. Exercise images are cached by the service worker for optimal performance.
