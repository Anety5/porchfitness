# PorchFitness - TODO List

## ✅ DONE
- [x] 13 exercise cards with descriptions
- [x] ElevenLabs widget integration
- [x] Samantha voice coach (client tools)
- [x] Firebase Auth (Google + Anonymous)
- [x] Firestore database structure
- [x] Progress dashboard (Chart.js)
- [x] Manual logging modal
- [x] Cloud Functions (4 functions)
- [x] Responsive design (Tailwind)
- [x] Documentation (HOW_IT_WORKS.md)

---

## 🔴 CRITICAL (Before Submission)

### Pre-Deploy Setup
```bash
cd functions && npm install
firebase functions:secrets:set GEMINI_API_KEY
```

- [ ] Add Firebase config to all HTML files (index, progress, weekly-summary)
- [ ] Verify ElevenLabs agent ID in index.html
- [ ] Check Gemini API key is set
- [ ] Install all dependencies

### Deploy & Test
```bash
firebase deploy
```

- [ ] Deploy hosting + functions + rules
- [ ] Test production URL works
- [ ] Test `getRecentHistory` (Gemini greeting)
- [ ] Test `logWorkout` (saves to Firestore)
- [ ] Test `getWeeklySummary` (AI insights)
- [ ] Check Firebase Functions logs for errors

### ElevenLabs
- [ ] Samantha widget loads
- [ ] `getRecentHistory` tool callable
- [ ] `logWorkout` tool callable
- [ ] Full conversation flow works
- [ ] Multilingual support (Spanish/Chinese)

### Progress Dashboard
- [ ] Charts render with real data
- [ ] Test: new user (no data)
- [ ] Test: 1-2 workouts
- [ ] Test: 10+ workouts
- [ ] Weekly Summary page loads
- [ ] Mobile responsive

### Demo Video (2-3 min)
- [ ] Homepage overview
- [ ] Exercise selection
- [ ] Voice coaching session
- [ ] Automatic logging
- [ ] Progress graphs
- [ ] Weekly summary page with AI insights
- [ ] Upload to YouTube (unlisted)

---

## 🟡 NICE TO HAVE

### Email Feature (Future)
- [ ] Set up Gmail App Password
- [ ] Configure Nodemailer
- [ ] Send weekly summary emails
- [ ] Add email preferences

### UX
- [ ] Loading states
- [ ] Toast notifications
- [ ] Better manual logging UX
- [ ] Workout streaks/badges

### Data
- [ ] CSV export
- [ ] Date range filters
- [ ] Week comparison view
- [ ] Goal setting

### Accessibility
- [ ] ARIA labels
- [ ] Screen reader test
- [ ] Keyboard navigation
- [ ] WCAG AA compliance

### Performance
- [ ] Query pagination
- [ ] Chart caching
- [ ] Service worker (PWA)
- [ ] Image optimization

---

## 🟢 DOCUMENTATION

### Devpost Submission
- [ ] Project description (200 chars)
- [ ] What it does
- [ ] How we built it
- [ ] Challenges faced
- [ ] Accomplishments
- [ ] What we learned
- [ ] What's next

### GitHub
- [ ] README.md (setup, env vars, deploy)
- [ ] LICENSE file (MIT)
- [ ] .gitignore (no secrets)
- [ ] Release tag

### Code
- [ ] JSDoc comments (functions)
- [ ] ElevenLabs config docs
- [ ] Inline comments (complex logic)
- [ ] Firebase security rules docs

---

## 🔵 TESTING

### Functional
- [ ] All 13 exercise descriptions
- [ ] Anonymous sign-in
- [ ] Google sign-in
- [ ] Manual logging
- [ ] Dashboard (no data)
- [ ] Dashboard (with data)
- [ ] Email delivery
- [ ] Samantha end-to-end

### Browsers
- [ ] Chrome (desktop/mobile)
- [ ] Firefox
- [ ] Safari (iOS)
- [ ] Edge

### Error Handling
- [ ] Network disconnected
- [ ] Invalid Firestore data
- [ ] Email failure
- [ ] Gemini timeout
- [ ] ElevenLabs failure

---

## 🎯 NEXT SESSION (2 hours)

1. **Deploy Functions** (30m) - Install deps, set secrets, deploy
2. **Test Samantha** (20m) - Full conversation flow
3. **Record Demo** (30m) - Complete user journey
4. **Write Devpost** (30m) - Description + screenshots
5. **Final Test** (20m) - All browsers + edge cases

---

## 📊 GIT COMMITS

### Current Commit
```bash
git add .
git commit -m "feat: Complete AI fitness coach

- 13 chair exercises for seniors
- ElevenLabs Conversational AI
- Gemini-powered summaries
- Chart.js progress tracking
- Nodemailer email system
- Firebase Functions architecture
- Comprehensive documentation"
```

### Next Commit
```bash
git commit -m "test: Verify features and fix bugs

- Test ElevenLabs client tools
- Verify Gemini responses
- Test email delivery
- Fix [bugs found]
- Update deployment notes"
```
