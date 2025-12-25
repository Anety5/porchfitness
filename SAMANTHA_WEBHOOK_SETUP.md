# Samantha Webhook Setup Guide

## Overview
You need to configure 3 webhook tools in your ElevenLabs Conversational AI dashboard for Samantha to log workouts, get user history, and provide weekly summaries.

## Firebase Functions URLs
All three functions are deployed at:
- **getRecentHistory**: `https://us-central1-porchfitness-98628.cloudfunctions.net/getRecentHistory`
- **logWorkout**: `https://us-central1-porchfitness-98628.cloudfunctions.net/logWorkout`
- **getWeeklySummary**: `https://us-central1-porchfitness-98628.cloudfunctions.net/getWeeklySummary`

---

## Tool 1: Get Recent History

**Purpose**: Fetches the user's last 3 workouts and generates a personalized greeting with Gemini AI.

### Configuration:
1. Go to ElevenLabs Dashboard → Your Agent (Samantha) → Tools
2. Click **"Add Tool"** → Select **"Webhook"**
3. Fill in the details:

**Tool Name**: `getRecentHistory`

**Description**:
```
Retrieves the user's last 3 workout sessions from Firestore and generates a personalized greeting based on their recent activity and progress. Use this when the user asks about their recent workouts, progress, or when starting a conversation to provide personalized context.
```

**Webhook Configuration**:
- **URL**: `https://us-central1-porchfitness-98628.cloudfunctions.net/getRecentHistory`
- **Method**: `POST`
- **Headers**: None needed
- **Wait for response**: ✅ Checked
- **Disable interruptions**: ✅ Checked

**Parameters** (Body):
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | The Firebase Auth user ID |

**Example Body**:
```json
{
  "userId": "{{userId}}"
}
```

**Response Format**:
```json
{
  "success": true,
  "summary": "Welcome back! You've been doing great with your seated exercises..."
}
```

---

## Tool 2: Log Workout

**Purpose**: Saves a completed workout session to Firestore with pain level and notes.

### Configuration:
1. Click **"Add Tool"** → Select **"Webhook"**
2. Fill in the details:

**Tool Name**: `logWorkout`

**Description**:
```
Logs a completed workout to the user's Firestore database. Records exercise name, pain level (0-10), optional notes, reps completed, and duration. Use this after the user completes an exercise and wants to track their activity. Always ask for pain level before logging.
```

**Webhook Configuration**:
- **URL**: `https://us-central1-porchfitness-98628.cloudfunctions.net/logWorkout`
- **Method**: `POST`
- **Headers**: None needed
- **Wait for response**: ✅ Checked
- **Disable interruptions**: ✅ Checked

**Parameters** (Body):
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | The Firebase Auth user ID |
| exerciseName | string | Yes | Name of the exercise completed |
| painLevel | integer | Yes | Pain level from 0 (no pain) to 10 (severe) |
| notes | string | No | Optional user notes about the workout |
| repsCompleted | integer | No | Number of repetitions completed |
| durationSeconds | integer | No | Duration in seconds |

**Example Body**:
```json
{
  "userId": "{{userId}}",
  "exerciseName": "Seated Hamstring Stretch",
  "painLevel": 2,
  "notes": "Felt good, slight stretch in left leg",
  "repsCompleted": 10,
  "durationSeconds": 300
}
```

**Response Format**:
```json
{
  "success": true,
  "message": "Great job! Logged Seated Hamstring Stretch workout with pain level 2/10."
}
```

---

## Tool 3: Get Weekly Summary

**Purpose**: Calculates weekly workout statistics and generates an AI-powered summary.

### Configuration:
1. Click **"Add Tool"** → Select **"Webhook"**
2. Fill in the details:

**Tool Name**: `getWeeklySummary`

**Description**:
```
Generates a comprehensive weekly workout summary including total workouts, average pain level, workout streak, most frequent exercise, and AI-generated insights from Gemini. Use this when the user asks about their weekly progress, wants to see their stats, or needs motivation based on their recent activity.
```

**Webhook Configuration**:
- **URL**: `https://us-central1-porchfitness-98628.cloudfunctions.net/getWeeklySummary`
- **Method**: `POST`
- **Headers**: None needed
- **Wait for response**: ✅ Checked
- **Disable interruptions**: ✅ Checked

**Parameters** (Body):
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | The Firebase Auth user ID |

**Example Body**:
```json
{
  "userId": "{{userId}}"
}
```

**Response Format**:
```json
{
  "success": true,
  "summary": "Great progress this week! You completed 5 workouts...",
  "stats": {
    "totalWorkouts": 5,
    "avgPainLevel": 2.4,
    "totalMinutes": 45,
    "streak": 3,
    "mostFrequentExercise": "Seated Hamstring Stretch",
    "uniqueDaysWorkedOut": 4
  }
}
```

---

## Testing Your Webhooks

### Test in ElevenLabs Dashboard:
1. After adding each tool, click **"Test"** button
2. Provide sample data (use a real userId from your Firebase Auth)
3. Verify the response comes back successfully

### Test with Samantha:
1. Open your PorchFitness app: https://porchfitness-98628.web.app
2. Sign in with Google
3. Click the Samantha widget to start a conversation
4. Try these commands:
   - "Can you show me my recent workouts?"
   - "I just completed the Seated Hamstring Stretch, pain level was 2"
   - "How did I do this week?"

---

## Important Notes

1. **User ID**: The `userId` parameter must match the Firebase Auth UID. When users sign in, this is automatically available in the client-side JavaScript.

2. **Pain Level Scale**: 
   - 0 = No pain
   - 1-3 = Mild discomfort
   - 4-6 = Moderate pain
   - 7-9 = Significant pain
   - 10 = Severe/unbearable pain

3. **Error Handling**: All functions return error messages if:
   - Required parameters are missing
   - Invalid pain level (not 0-10)
   - Firebase/Firestore errors
   - Gemini API errors

4. **CORS**: All functions have CORS enabled (`cors: "*"`) so they can be called from the ElevenLabs platform.

---

## Troubleshooting

**"Method not allowed" error**: 
- Make sure you selected **POST** method, not GET

**"Missing userId" error**: 
- Verify the userId parameter is being passed correctly
- Check that the user is signed in to Firebase Auth

**"API key not configured" error**: 
- Run: `firebase functions:secrets:set GEMINI_API_KEY` in your terminal
- Redeploy functions: `firebase deploy --only functions`

**Timeout errors**: 
- Functions have 60 second timeout by default
- If Gemini API is slow, consider increasing timeout in functions/index.js

---

## Deployment Commands

If you need to redeploy the functions:

```bash
# Deploy all three functions
firebase deploy --only functions:getRecentHistory,functions:logWorkout,functions:getWeeklySummary

# Or deploy all functions
firebase deploy --only functions
```

Current deployment status: **logWorkout function added, needs deployment**
