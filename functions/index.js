const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Initialize Firebase Admin
admin.initializeApp();

// Define secrets
const geminiApiKey = defineSecret("GEMINI_API_KEY");
const gmailUser = defineSecret("GMAIL_USER");
const gmailAppPassword = defineSecret("GMAIL_APP_PASSWORD");

// Cloud Function to get recent workout history formatted for Samantha
exports.getRecentHistory = onRequest(
    {
      secrets: [geminiApiKey],
      cors: "*",
    },
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({error: "Method not allowed"});
        return;
      }

      try {
        const {userId} = req.body;

        if (!userId) {
          res.status(400).json({error: "Missing userId"});
          return;
        }

        // Get last 3 workout sessions from Firestore
        const db = admin.firestore();
        const sessionsSnapshot = await db
            .collection("users")
            .doc(userId)
            .collection("sessions")
            .orderBy("date", "desc")
            .limit(3)
            .get();

        if (sessionsSnapshot.empty) {
          res.status(200).json({
            success: true,
            summary: "This is your first workout! " +
              "I'm excited to start this journey with you.",
          });
          return;
        }

        // Collect session data
        const sessions = [];
        sessionsSnapshot.forEach((doc) => {
          const data = doc.data();
          sessions.push({
            exercise: data.exerciseName,
            painLevel: data.painLevel,
            notes: data.notes,
            reps: data.repsCompleted || 0,
            duration: data.durationSeconds || 0,
            date: data.date.toDate().toLocaleDateString(),
          });
        });

        const apiKey = geminiApiKey.value();
        if (!apiKey) {
          res.status(500).json({error: "API key not configured"});
          return;
        }

        // Use Gemini to create a natural language summary for Samantha
        const prompt = `You are helping a senior fitness coach named ` +
          `Samantha remember a user's recent workouts. ` +
          `Create a brief, warm summary she can use to greet the user.

IMPORTANT: Detect the language used in the user's workout notes and ` +
          `respond in that same language. If notes are in Spanish, respond ` +
          `in Spanish. If in Chinese, respond in Chinese. If unclear or no ` +
          `notes, default to English.

Recent workout history:
${sessions.map((s, i) =>
    `${i + 1}. ${s.date}: ${s.exercise} - ` +
    `${s.reps} reps, ${s.duration} seconds. ` +
    `Pain level ${s.painLevel}/10. Notes: ${s.notes || "none"}`,
  ).join("\n")}

Create a 2-3 sentence summary that:
- Welcomes them back warmly in their language
- Mentions what they did last time
- Notes any pain concerns if painLevel was above 3
- Encourages them to continue

Example (English): "Welcome back! Last time you did neck stretches and ` +
          `they felt good with minimal discomfort. ` +
          `Ready to continue building on that progress?"

Example (Spanish): "¡Bienvenido de nuevo! La última vez hiciste ` +
          `estiramientos de cuello y te sentiste bien con molestias mínimas. ` +
          `¿Listo para seguir construyendo ese progreso?"

Keep it friendly, concise, and encouraging in the user's language.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/` +
            `models/gemini-pro:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                contents: [{parts: [{text: prompt}]}],
              }),
            },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Gemini API error:", errorData);
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const summary = data.candidates[0].content.parts[0].text;

        res.status(200).json({
          success: true,
          summary: summary,
          rawSessions: sessions,
        });
      } catch (error) {
        console.error("Error getting history:", error);
        res.status(500).json({
          error: "Failed to get workout history",
          details: error.message,
        });
      }
    },
);

// Cloud Function to generate weekly progress summary
exports.getWeeklySummary = onRequest(
    {
      secrets: [geminiApiKey],
      cors: "*",
    },
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({error: "Method not allowed"});
        return;
      }

      try {
        const {userId} = req.body;

        if (!userId) {
          res.status(400).json({error: "Missing userId"});
          return;
        }

        // Get last 7 days of workout sessions
        const db = admin.firestore();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sessionsSnapshot = await db
            .collection("users")
            .doc(userId)
            .collection("sessions")
            .where(
                "date",
                ">=",
                admin.firestore.Timestamp.fromDate(sevenDaysAgo),
            )
            .orderBy("date", "desc")
            .get();

        if (sessionsSnapshot.empty) {
          res.status(200).json({
            success: true,
            summary: "No workouts this week yet. Let's get started!",
          });
          return;
        }

        // Collect session data
        const sessions = [];
        sessionsSnapshot.forEach((doc) => {
          const data = doc.data();
          sessions.push({
            exercise: data.exerciseName,
            painLevel: data.painLevel,
            notes: data.notes,
            reps: data.repsCompleted || 0,
            duration: data.durationSeconds || 0,
            date: data.date.toDate().toLocaleDateString(),
          });
        });

        const apiKey = geminiApiKey.value();
        if (!apiKey) {
          res.status(500).json({error: "API key not configured"});
          return;
        }

        // Calculate stats
        const totalWorkouts = sessions.length;
        const painSum = sessions.reduce((sum, s) => sum + s.painLevel, 0);
        const avgPain = (painSum / totalWorkouts).toFixed(1);
        const highPainSessions = sessions.filter(
            (s) => s.painLevel >= 5,
        ).length;

        const workoutList = sessions.map((s, i) =>
          `${i + 1}. ${s.date}: ${s.exercise} - ` +
          `Pain: ${s.painLevel}/10. Notes: ${s.notes || "none"}`,
        ).join("\n");

        const painWarning = highPainSessions >= 2 ?
          "⚠️ IMPORTANT: Multiple high pain sessions detected. " +
          "Strongly suggest easier exercises and consulting doctor." :
          "Encourages them to continue";

        const prompt = `You are a senior fitness coach reviewing ` +
          `a user's weekly progress.

` +
          `Weekly workout data (last 7 days):
${workoutList}

` +
          `Stats:
` +
          `- Total workouts: ${totalWorkouts}
` +
          `- Average pain level: ${avgPain}/10
` +
          `- High pain sessions (5+): ${highPainSessions}

` +
          `Create a friendly 3-4 sentence weekly summary that:
` +
          `1. Celebrates their consistency and effort
` +
          `2. Notes pain trends (if avg pain high, express concern)
` +
          `3. ${painWarning}
` +
          `4. Suggests what to focus on next week

` +
          `If pain levels are concerning (avg > 4 or multiple ` +
          `high pain sessions), prioritize safety:
` +
          `- Recommend gentler exercises
` +
          `- Suggest taking rest days
` +
          `- Encourage consulting their healthcare provider

` +
          `Keep it warm, encouraging, but honest about pain concerns.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/` +
            `models/gemini-pro:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                contents: [{parts: [{text: prompt}]}],
              }),
            },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Gemini API error:", errorData);
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const summary = data.candidates[0].content.parts[0].text;

        res.status(200).json({
          success: true,
          summary: summary,
          stats: {
            totalWorkouts,
            avgPain,
            highPainSessions,
          },
        });
      } catch (error) {
        console.error("Error generating weekly summary:", error);
        res.status(500).json({
          error: "Failed to generate weekly summary",
          details: error.message,
        });
      }
    },
);

// Cloud Function for Samantha to get weekly stats
exports.getWeeklySummary = onRequest(
    {
      cors: "*",
    },
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({error: "Method not allowed"});
        return;
      }

      try {
        const {userId} = req.body;

        if (!userId) {
          res.status(400).json({error: "Missing userId"});
          return;
        }

        // Get last 7 days of workout sessions
        const db = admin.firestore();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sessionsSnapshot = await db
            .collection("users")
            .doc(userId)
            .collection("sessions")
            .where(
                "date",
                ">=",
                admin.firestore.Timestamp.fromDate(sevenDaysAgo),
            )
            .orderBy("date", "desc")
            .get();

        if (sessionsSnapshot.empty) {
          res.status(200).json({
            success: true,
            totalWorkouts: 0,
            avgPainLevel: 0,
            totalMinutes: 0,
            streak: 0,
            mostFrequentExercise: "None yet",
            message: "No workouts this week. Let's get started!",
          });
          return;
        }

        // Calculate stats
        let totalPain = 0;
        let totalDuration = 0;
        const exercises = {};
        const dates = new Set();

        sessionsSnapshot.forEach((doc) => {
          const data = doc.data();
          totalPain += data.painLevel || 0;
          totalDuration += data.durationSeconds || 0;

          // Count exercise frequency
          const exercise = data.exerciseName;
          exercises[exercise] = (exercises[exercise] || 0) + 1;

          // Track unique dates
          const dateStr = data.date.toDate().toLocaleDateString();
          dates.add(dateStr);
        });

        const totalWorkouts = sessionsSnapshot.size;
        const avgPain = (totalPain / totalWorkouts).toFixed(1);
        const totalMinutes = Math.round(totalDuration / 60);

        // Find most frequent exercise
        let mostFrequent = "Various exercises";
        let maxCount = 0;
        for (const [exercise, count] of Object.entries(exercises)) {
          if (count > maxCount) {
            maxCount = count;
            mostFrequent = exercise;
          }
        }

        // Calculate streak (consecutive days)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let streak = 0;
        const checkDate = new Date(today);

        while (streak < 30) { // Max 30 day check
          const dateStr = checkDate.toLocaleDateString();
          if (dates.has(dateStr)) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else if (streak > 0) {
            break; // Streak broken
          } else {
            checkDate.setDate(checkDate.getDate() - 1);
          }
        }

        res.status(200).json({
          success: true,
          totalWorkouts,
          avgPainLevel: parseFloat(avgPain),
          totalMinutes,
          streak,
          mostFrequentExercise: mostFrequent,
          uniqueDaysWorkedOut: dates.size,
          message: `Great progress! ${totalWorkouts} workouts this week.`,
        });
      } catch (error) {
        console.error("Error getting weekly summary:", error);
        res.status(500).json({
          error: "Failed to get weekly summary",
          details: error.message,
        });
      }
    },
);

// Cloud Function to send weekly summary email to user
exports.sendWeeklySummaryEmail = onRequest(
    {
      secrets: [geminiApiKey, gmailUser, gmailAppPassword],
      cors: "*",
    },
    async (req, res) => {
      if (req.method !== "POST") {
        res.status(405).json({error: "Method not allowed"});
        return;
      }

      try {
        const {userId, userEmail} = req.body;

        if (!userId || !userEmail) {
          res.status(400).json({error: "Missing userId or userEmail"});
          return;
        }

        // Get last 7 days of workout sessions
        const db = admin.firestore();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const sessionsSnapshot = await db
            .collection("users")
            .doc(userId)
            .collection("sessions")
            .where(
                "date",
                ">=",
                admin.firestore.Timestamp.fromDate(sevenDaysAgo),
            )
            .orderBy("date", "desc")
            .get();

        if (sessionsSnapshot.empty) {
          res.status(200).json({
            success: true,
            message: "No workouts this week to summarize",
          });
          return;
        }

        // Collect session data
        const sessions = [];
        sessionsSnapshot.forEach((doc) => {
          const data = doc.data();
          sessions.push({
            exercise: data.exerciseName,
            painLevel: data.painLevel,
            notes: data.notes,
            reps: data.repsCompleted || 0,
            duration: data.durationSeconds || 0,
            date: data.date.toDate().toLocaleDateString(),
          });
        });

        const apiKey = geminiApiKey.value();
        if (!apiKey) {
          res.status(500).json({error: "API key not configured"});
          return;
        }

        // Calculate stats
        const totalWorkouts = sessions.length;
        const painSum = sessions.reduce((sum, s) => sum + s.painLevel, 0);
        const avgPain = (painSum / totalWorkouts).toFixed(1);
        const highPainSessions = sessions.filter(
            (s) => s.painLevel >= 5,
        ).length;
        const totalMinutes = Math.round(
            sessions.reduce((sum, s) => sum + s.duration, 0) / 60,
        );

        const workoutList = sessions.map((s) =>
          `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${s.date}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${s.exercise}
            </td>
            <td style="padding: 8px; border: 1px solid #ddd; 
              text-align: center;">${s.painLevel}/10</td>
            <td style="padding: 8px; border: 1px solid #ddd;">
              ${s.notes || "-"}
            </td>
          </tr>`,
        ).join("");

        // Use Gemini to create encouraging email summary
        const prompt = `You are Samantha, a warm senior fitness coach. ` +
          `Create an encouraging email message about the user's weekly ` +
          `workout progress.

Weekly stats:
- Total workouts: ${totalWorkouts}
- Total minutes: ${totalMinutes}
- Average pain level: ${avgPain}/10
- High pain sessions (5+): ${highPainSessions}

Create 2-3 paragraphs that:
1. Celebrate their consistency and effort this week
2. Comment on pain trends (if concerning, suggest gentler exercises)
3. Encourage them to keep going next week

Keep it warm, personal, and motivating. Don't use HTML, just plain text.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/` +
            `models/gemini-pro:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({
                contents: [{parts: [{text: prompt}]}],
              }),
            },
        );

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        const aiMessage = data.candidates[0].content.parts[0].text;

        // Create email transporter
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser.value(),
            pass: gmailAppPassword.value(),
          },
        });

        // Email HTML content
        const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #1e3a8a;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .stats {
      background: white;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      border-left: 4px solid #2563eb;
    }
    .stat-item {
      margin: 10px 0;
      font-size: 16px;
    }
    .stat-label {
      font-weight: bold;
      color: #1e3a8a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
    }
    th {
      background: #2563eb;
      color: white;
      padding: 12px;
      text-align: left;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🏡 Your PorchFitness Weekly Summary</h1>
    </div>
    <div class="content">
      <p style="white-space: pre-wrap;">${aiMessage}</p>
      
      <div class="stats">
        <h3>Your Week at a Glance</h3>
        <div class="stat-item">
          <span class="stat-label">Total Workouts:</span> ${totalWorkouts}
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Time:</span> ${totalMinutes} minutes
        </div>
        <div class="stat-item">
          <span class="stat-label">Average Pain Level:</span> ${avgPain}/10
        </div>
      </div>

      <h3>Workout Details</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Exercise</th>
            <th>Pain</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${workoutList}
        </tbody>
      </table>

      <p style="margin-top: 30px;">
        <strong>Keep up the great work! 💪</strong><br>
        <a href="https://porchfitness.web.app" 
           style="color: #2563eb;">Continue your journey →</a>
      </p>
    </div>
    <div class="footer">
      <p>PorchFitness - Voice-Coached Gentle Exercises</p>
      <p>
        <a href="mailto:aloha@lavarocklabs.com">aloha@lavarocklabs.com</a> | 
        <a href="https://lavarocklabs.com">LavaRock Labs</a>
      </p>
    </div>
  </div>
</body>
</html>
`;

        // Send email
        await transporter.sendMail({
          from: `"PorchFitness - Samantha" <${gmailUser.value()}>`,
          to: userEmail,
          subject: `🏡 Your PorchFitness Weekly Summary - ${totalWorkouts} ` +
            `Workouts This Week!`,
          html: emailHTML,
        });

        res.status(200).json({
          success: true,
          message: "Weekly summary email sent successfully",
          stats: {
            totalWorkouts,
            avgPain,
            totalMinutes,
          },
        });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
          error: "Failed to send email",
          details: error.message,
        });
      }
    },
);
