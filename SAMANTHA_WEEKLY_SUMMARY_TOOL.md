# Samantha's New Tool: getWeeklySummary

## What It Does
Gives Samantha access to calculated weekly stats so she can discuss progress with users in a conversational way.

---

## ElevenLabs Configuration

### Add to your agent as TOOL 3:

**Name:** `getWeeklySummary`

**Description:** `Get calculated weekly statistics including total workouts, average pain, streak, and most frequent exercises`

**Wait for response:** ✅ CHECK THIS BOX

**Disable interruptions:** ✅ CHECK THIS BOX

**Parameters:** **NONE** - This tool takes no parameters

**Webhook URL:** `https://us-central1-porchfitness-98628.cloudfunctions.net/getWeeklySummary`

---

## What Samantha Gets Back

```json
{
  "success": true,
  "totalWorkouts": 5,
  "avgPainLevel": 3.2,
  "totalMinutes": 42,
  "streak": 7,
  "mostFrequentExercise": "Neck Stretches",
  "uniqueDaysWorkedOut": 5,
  "message": "Great progress! 5 workouts this week."
}
```

---

## How Samantha Uses It

**User asks:** "Can you explain my weekly summary?"

**Samantha calls:** `getWeeklySummary()` (no parameters needed)

**Samantha responds:** 
> "Looking at your week, you've completed 5 workouts across 5 different days - that's fantastic consistency! Your average pain level is 3.2, which shows you're challenging yourself while staying comfortable. You're on a 7-day streak, and I notice you really enjoy Neck Stretches since you did those the most. Keep up this amazing momentum!"

---

## Example Conversations

### Scenario 1: User on Progress Page
**User:** "How am I doing this week?"
**Samantha:** *calls getWeeklySummary* → "You're doing great! 8 workouts this week with an average pain level of just 2.4. You're on a 12-day streak - incredible dedication!"

### Scenario 2: Encouraging User
**User:** "I'm not sure if I'm making progress"
**Samantha:** *calls getWeeklySummary* → "Let me check... You've done 4 workouts in 3 different days this week. That's solid! Your pain level is averaging 3.8, down from over 5 last time we checked. You ARE making progress!"

### Scenario 3: Comparing to Goals
**User:** "Should I be working out more?"
**Samantha:** *calls getWeeklySummary* → "You're already doing 6 workouts this week, which is excellent for gentle exercise. Quality matters more than quantity at this level. Your body is telling us good things with a pain level of 2.9."

---

## Benefits

1. **Conversational Stats** - Instead of just reading numbers, Samantha interprets them
2. **Motivation** - She can celebrate streaks and improvements
3. **Context** - She understands trends (most frequent exercises, pain patterns)
4. **No Math Required** - Stats are pre-calculated, so conversations flow naturally

---

## Update Your Samantha System Prompt

Add this section to her prompt:

```
WEEKLY SUMMARY TOOL:
When users ask about their progress, weekly stats, or how they're doing:
1. Call getWeeklySummary to get calculated statistics
2. Interpret the numbers in a warm, encouraging way
3. Celebrate streaks and improvements
4. If avgPainLevel is high (>5), gently suggest they consider easier exercises
5. If streak is broken, encourage them without guilt

Example responses:
- "You're on a 5-day streak with 7 workouts! That's amazing consistency!"
- "Your pain level is averaging 2.3 this week - that's really comfortable"
- "I see you love Shoulder Rolls - you did those 4 times this week!"
```

---

## Deployment Status

✅ Function deployed to: `https://us-central1-porchfitness-98628.cloudfunctions.net/getWeeklySummary`

✅ Available on all pages (index.html, progress.html, weekly-summary.html)

✅ No API key required (reads from authenticated user's data)

---

## Testing

1. Open your site: https://porchfitness-98628.web.app
2. Click Samantha's widget
3. Say: "Can you tell me about my weekly progress?"
4. Samantha should call `getWeeklySummary` and explain your stats conversationally

---

**Ready to add to your ElevenLabs dashboard!** 🎉
