# Email Summary Setup Guide

## Overview
Users can now receive automated weekly summary emails about their workout progress! The email includes:
- AI-generated encouragement from Samantha
- Weekly stats (total workouts, minutes, average pain level)
- Detailed workout log table
- Gemini-powered insights

## Setup Steps

### 1. Enable Gmail App Password

Since you'll be using `lavarocklabsllc@gmail.com` to send emails:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Under "2-Step Verification", scroll down to **App Passwords**
5. Click "App passwords"
6. Generate a new app password:
   - App: "Mail"
   - Device: "Other (Custom name)" → Type "PorchFitness"
7. Copy the 16-character password (it will look like: `xxxx xxxx xxxx xxxx`)

### 2. Set Firebase Secrets

```bash
# Set Gmail credentials
firebase functions:secrets:set GMAIL_USER
# Enter: lavarocklabsllc@gmail.com

firebase functions:secrets:set GMAIL_APP_PASSWORD
# Paste the 16-character app password you generated
```

### 3. Install Dependencies

```bash
cd functions
npm install nodemailer
cd ..
```

### 4. Deploy the Function

```bash
firebase deploy --only functions:sendWeeklySummaryEmail
```

## How to Use

### From the Web App

Add a "Email My Stats" button to the user's profile or settings page:

```javascript
async function sendWeeklyEmail() {
  const user = firebase.auth().currentUser;
  
  if (!user || !user.email) {
    alert('Please sign in with Google to receive email summaries');
    return;
  }

  try {
    const response = await fetch(
      'https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/sendWeeklySummaryEmail',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email
        })
      }
    );

    const data = await response.json();
    
    if (data.success) {
      alert('📧 Check your email! Your weekly summary is on its way.');
    } else {
      alert('Error sending email. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error sending email. Please try again.');
  }
}
```

### Scheduled Weekly Emails (Optional)

You can set up a scheduled Cloud Function to automatically send weekly emails every Sunday:

```javascript
const {onSchedule} = require("firebase-functions/v2/scheduler");

exports.sendWeeklyEmailsScheduled = onSchedule(
  {
    schedule: "0 9 * * 0", // Every Sunday at 9 AM
    timeZone: "America/Los_Angeles",
    secrets: [geminiApiKey, gmailUser, gmailAppPassword]
  },
  async (event) => {
    const db = admin.firestore();
    
    // Get all users who signed up with email
    const usersSnapshot = await db.collection('users').get();
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      
      if (userData.email && userData.wantsWeeklySummary) {
        // Send email to this user
        // ... (call the email sending logic)
      }
    }
  }
);
```

## Email Content

The email includes:
1. **Personalized AI message** - Gemini creates a warm, encouraging message based on their workouts
2. **Stats summary**:
   - Total workouts completed
   - Total minutes exercised
   - Average pain level
3. **Workout table** - Shows each workout with date, exercise name, pain level, and notes
4. **Link back to app** - Easy way to continue their fitness journey

## Troubleshooting

### "API key not configured"
- Make sure you set the GEMINI_API_KEY secret:
  ```bash
  firebase functions:secrets:set GEMINI_API_KEY
  ```

### "Auth error" / Email not sending
- Verify Gmail App Password is correct
- Check that 2-Step Verification is enabled on the Gmail account
- Make sure you used the app password, NOT your regular Gmail password

### "No workouts this week"
- User needs at least 1 logged workout in the past 7 days
- The function returns success but doesn't send email if there's no data

## Testing

Test the email function:

```bash
# Get your user ID from Firebase Console
# Then use curl or Postman to test:

curl -X POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/sendWeeklySummaryEmail \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "YOUR_USER_ID",
    "userEmail": "your-test-email@gmail.com"
  }'
```

## Cost Considerations

- **Firebase Functions**: Free tier includes 2M invocations/month
- **Gemini API**: Free tier includes 60 requests/minute
- **Email (Gmail)**: Free for reasonable volumes (up to 500 emails/day)

For a small user base, this should stay within free tiers.

## Next Steps

1. Add "Email My Stats" button to the UI
2. Add user preference toggle (allow users to opt in/out)
3. Consider scheduled weekly emails
4. Add daily/monthly summary options
5. Allow users to customize email frequency

## Privacy Note

Users must sign in with Google (OAuth) to provide their email address. The app only sends emails to users who explicitly request them or opt-in to scheduled summaries.
