# PorchFitness - How It Works

## Overview for Devpost Submission

PorchFitness is a complete AI-powered fitness companion that helps seniors stay active with 13 gentle chair exercises. Here's how all the pieces work together:

---

## 🎙️ **Samantha - The AI Voice Coach (ElevenLabs)**

### What She Does:
- **Voice-guides users through exercises** with clear, slow counting
- **Remembers each user's workout history** using client tools
- **Tracks pain levels, reps, and notes** after each session
- **Provides multilingual support** (Spanish, Chinese, etc.)
- **Gives personalized encouragement** based on progress

### How Users Interact:
1. Click "Get Voice Coaching" button on any exercise card
2. Click the Samantha widget in bottom-right corner (shows her face)
3. Say: "Hi Samantha! Can you guide me through [exercise name]?"
4. She coaches them through with slow counting: "One... breathe... Two... Three..."
5. After exercise, she asks: "How did that feel? Rate pain 1-10"
6. She logs the workout automatically using `logWorkout` tool

### Client Tools Samantha Uses:
```javascript
1. getRecentHistory() 
   - Calls Firebase Cloud Function
   - Gets last 3 workouts
   - Gemini creates personalized greeting
   - Example: "Welcome back! Last time you did neck stretches 
              and they felt great. Ready to continue?"

2. logWorkout(exerciseName, painLevel, notes, reps, duration)
   - Saves to Firestore database
   - Records date, time, pain level, notes
   - Used for progress tracking
```

---

## 🤖 **Gemini AI Integration**

### Where Gemini is Used:

#### 1. **Recent History Summaries**
When user starts a session, `getRecentHistory` Cloud Function:
- Fetches last 3 workouts from Firestore
- Sends to Gemini with prompt: "Create warm greeting for returning user"
- Gemini analyzes: exercises done, pain levels, notes, dates
- Returns personalized message in user's language
- Samantha speaks this to greet them

#### 2. **Weekly Progress Summaries**
Cloud Function `getWeeklySummary`:
- Gets all workouts from past 7 days
- Calculates: total workouts, avg pain, high pain sessions, streak
- Gemini creates encouraging summary with safety warnings
- Highlights patterns: "You worked out 4 times! Avg pain was low (2/10)"
- Suggests focus areas for next week
- Displayed on dedicated Weekly Summary page

#### 3. **Email Summaries**
Cloud Function `sendWeeklySummaryEmail`:
- Collects weekly workout data
- Gemini generates personalized email message
- Creates beautiful HTML email with:
  - AI-written encouragement
  - Stats table (date, exercise, pain, notes)
  - Progress metrics
- Sent via Gmail (Nodemailer)

---

## 📊 **Progress Tracking System**

### Data Collected Per Workout:
```javascript
{
  exerciseName: "Hamstring Stretch",
  painLevel: 2,  // 1-10 scale
  notes: "Right leg felt tight",
  repsCompleted: 3,
  durationSeconds: 60,
  date: timestamp
}
```

### Firestore Structure:
```
users/
  {userId}/
    sessions/
      {sessionId}/
        exerciseName
        painLevel
        notes
        repsCompleted
        durationSeconds
        date
```

### Progress Dashboard (`progress.html`):

#### Visual Charts (Chart.js):

1. **Workout Frequency Chart** (Line Graph)
   - Shows workouts per day over last 30 days
   - Upward trend = consistency!
   - Like Fitbit/Apple Health step charts

2. **Pain Level Trend** (Bar Chart)
   - Weekly average pain levels
   - Color-coded: Green (low), Yellow (medium), Red (high)
   - Lower bars over time = progress!

3. **Exercise Breakdown** (Doughnut Chart)
   - Shows most popular exercises
   - Helps users see variety in routine

#### Stats Cards:
- 💪 **Total Workouts** - All-time count
- 📅 **This Week** - Current week activity
- ❤️ **Avg Pain** - Lower is better
- ⏱️ **Total Minutes** - Time invested

#### Recent Activity Feed:
- Lists last 10 workouts
- Shows date, exercise, pain level, notes
- Color-coded by pain level

---

## 🎯 **User Flow - Complete Journey**

### Step 1: Choose Exercise
- User sees 13 exercise cards with descriptions
- Each card shows: name, type (seated/standing), brief instructions
- Example: "Sit on chair edge, extend leg, reach toward toes. Hold 20-30 seconds."

### Step 2: Get Voice Coaching
- Click "🎤 Get Voice Coaching"
- Samantha widget appears (bottom-right)
- Click "Start a call"
- Samantha greets: "Welcome back! Last time you did..." (uses Gemini)
- User says: "Can you guide me through hamstring stretch?"

### Step 3: Exercise Guidance
- Samantha: "Let's do hamstring stretch. Remember, stop if you feel pain."
- Samantha: "Sit on edge of your chair... extend right leg..."
- Samantha counts SLOWLY: "One... breathe deeply... Two... nice and slow... Three..."
- Continues through all reps with encouragement

### Step 4: Log Workout
- Samantha: "How did that feel? Rate your pain 1-10"
- User: "About a 2, felt good"
- Samantha calls `logWorkout` tool automatically
- Data saved to Firestore
- Samantha: "Great! I've logged 3 reps for 60 seconds. Ready for another?"

### Step 5: Track Progress
- User clicks "📈 View My Progress"
- See graphs showing:
  - Workout frequency trending up
  - Pain levels trending down
  - Most popular exercises
  - Recent activity log

### Step 6: View Weekly Summary
- Click "📊 Weekly Summary"
- System fetches 7 days of data
- Gemini creates personalized message
- Beautiful summary page shows:
  - AI-written encouragement
  - Stats cards (workouts, pain, minutes, streak)
  - Detailed workout table
- User sees motivational message + progress metrics

---

## 🔧 **Technical Architecture**

### Frontend (index.html):
- Tailwind CSS for responsive design
- Firebase Auth (Google Sign-In + Anonymous)
- Firebase Firestore (database)
- ElevenLabs Conversational AI Widget
- Manual logging modal for fallback

### Backend (Firebase Cloud Functions):
- **getRecentHistory** - Gemini-powered workout memory
- **getWeeklySummary** - Gemini-powered weekly insights page
- **logWorkout** - Direct Firestore writes

### AI Services:
- **ElevenLabs Conversational AI** - Voice interaction with Samantha
- **Google Gemini Pro** - Natural language summaries and insights
- **Firebase Firestore** - Real-time data storage
- **Chart.js** - Beautiful, accessible graphs

---

## 🎨 **What Makes It Special**

### For Seniors:
✅ **Voice-first** - No typing, just talking
✅ **Large text** - 18px base font, high contrast
✅ **Simple interface** - Big buttons, clear cards
✅ **Slow counting** - Samantha pauses 2-3 seconds between reps
✅ **Safety reminders** - Stop if pain, move slowly
✅ **Encouraging** - Celebrates every effort

### For the Challenge:
✅ **ElevenLabs Agent** - Uses client tools (getRecentHistory, logWorkout)
✅ **Gemini Integration** - Powers summaries and insights
✅ **Progress Tracking** - Visual graphs show improvement
✅ **Weekly Summary Page** - AI-generated encouragement and stats
✅ **Multilingual** - Works in any language
✅ **PWA-ready** - Works offline, installable

---

## 📈 **Why the Graphs Matter**

### "Up and to the Right" Progress:

1. **Workout Frequency Going Up** ↗️
   - Shows consistency building
   - Like stock charts showing growth
   - Motivates continued effort

2. **Pain Levels Going Down** ↘️
   - Lower bars = less discomfort
   - Shows exercises are helping
   - Validates their work

3. **Exercise Variety**
   - Doughnut chart shows balance
   - Encourages trying different movements
   - Prevents overuse injuries

### Similar to Fitbit/Aura:
- **Daily steps → Daily workouts**
- **Heart rate zones → Pain levels**
- **Sleep score → Recovery tracking**
- **Badges/streaks → Workout counts**

The graphs provide visual proof of progress, which is incredibly motivating for older adults who may doubt their abilities.

---

## 🚀 **Demo Script for Devpost**

1. **Show homepage** - "13 gentle exercises for seniors"
2. **Click Hamstring Stretch card** - "See the description"
3. **Click Get Voice Coaching** - "Meet Samantha"
4. **Demonstrate conversation** - She guides through exercise
5. **Show Progress Dashboard** - "Beautiful graphs tracking improvement"
6. **Point out upward trend** - "Workout frequency increasing"
7. **Point out downward trend** - "Pain levels decreasing"
8. **Show Weekly Summary page** - "AI-generated insights"

### Key Talking Points:
- "Samantha remembers every user's history using ElevenLabs client tools"
- "Gemini AI creates personalized summaries in any language"
- "Progress graphs show 'up and to the right' improvement"
- "Complete solution: voice coaching + tracking + insights + email"

---

## ✅ **Completion Checklist**

Before deploying/submitting:

- [ ] Install nodemailer: `cd functions && npm install`
- [ ] Set Gmail credentials as Firebase secrets
- [ ] Deploy Cloud Functions
- [ ] Test email sending
- [ ] Record demo video
- [ ] Write Devpost submission

See **TODO.md** for detailed task list.

---

## 📧 **Contact**
- aloha@lavarocklabs.com
- lavarocklabsllc@gmail.com
- LavaRock Labs - https://lavarocklabs.com
