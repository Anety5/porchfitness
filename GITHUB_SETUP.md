# 🐙 GitHub Setup Steps

## Step 1: Install Git (if needed)
Download: https://git-scm.com/download/win

## Step 2: Configure Git
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Repository
```powershell
cd c:\Users\Annet\Documents\porchfitness-elevenlabs-challenge
git init
git add .
git commit -m "Initial commit: PorchFitness for ElevenLabs Challenge"
```

## Step 4: Create GitHub Repository
1. Go to: https://github.com/new
2. **Repository name:** `porchfitness` or `porch-fitness`
3. **Description:** Voice-coached chair exercises for seniors (ElevenLabs Challenge)
4. **Public** (required for Devpost)
5. **Don't** initialize with README (you already have one)
6. Click "Create repository"

## Step 5: Connect and Push
GitHub will show you commands. Use these:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/porchfitness.git
git branch -M main
git push -u origin main
```

## Done! ✅
Your code is now on GitHub at:
`https://github.com/YOUR_USERNAME/porchfitness`

---

## Optional: Add .gitignore
Already created! Excludes:
- .firebase/
- node_modules/
- .env files
