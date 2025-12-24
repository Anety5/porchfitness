# 🌍 Enable Multilingual Voice Coaching - Quick Guide

## Current Status ✅

**What's Working:**
- ✅ Firebase Secret Manager with Gemini API key (verified working)
- ✅ Gemini detects language from workout notes
- ✅ Returns greeting text in user's language (Spanish, Chinese, etc.)
- ⚠️ **BUT: Samantha still speaks in English only**

**What We Need:**
- Enable ElevenLabs to speak in multiple languages (voice, not just text)

---

## Solution: Enable ElevenLabs Multilingual Voices

### Step 1: Access Your Agent Dashboard
1. Go to: https://elevenlabs.io/app/conversational-ai
2. Find your agent: **agent_5201kd2291x0ffysp0e4z7c57ksr**
3. Click to edit

### Step 2: Enable Languages
1. Click **Settings** or **Configuration** tab
2. Look for **Languages** section
3. Click **Add Language** or **Enable Languages**
4. Select languages you want to support:
   - ☑️ Spanish (es)
   - ☑️ Chinese/Mandarin (zh)
   - ☑️ French (fr)
   - ☑️ German (de)
   - ☑️ Portuguese (pt)
   - ☑️ Japanese (ja)
   - ☑️ Italian (it)
   - And 25+ more!

### Step 3: Configure Language Detection
**Option A: Automatic (Recommended)**
- Enable "Auto-detect language"
- Agent listens to user and responds in matching language

**Option B: Manual**
- Set default language to English
- User can switch by saying "Speak Spanish" or "Habla español"

### Step 4: Save & Publish
1. Click **Save**
2. Click **Publish** to deploy changes
3. Wait 30 seconds for update to propagate

### Step 5: Test
1. Open: https://porchfitness-98628.web.app
2. Sign in with Google
3. Click an exercise card
4. Click Samantha's voice button
5. Say: **"Hola Samantha, ¿cómo estás?"**
6. She should respond in **Spanish voice** (not just text)

---

## How It Works (Technical)

### Full Multilingual Flow:

```
USER speaks Spanish → 
  ElevenLabs detects Spanish → 
    Calls getRecentHistory → 
      Gemini reads Spanish workout notes → 
        Returns Spanish greeting text → 
          ElevenLabs speaks in Spanish voice → 
            USER hears Spanish audio
```

**Example:**
1. User: "Hola Samantha, comencemos"
2. Samantha detects Spanish, calls getRecentHistory(userId)
3. Gemini sees past notes: "Me siento bien, sin dolor"
4. Gemini returns: "¡Bienvenido de nuevo! La última vez hiciste estiramientos..."
5. Samantha speaks response in Spanish voice
6. User hears natural Spanish audio

---

## Supported Languages

ElevenLabs supports **32+ languages** with natural voices:

### Popular Languages:
- 🇪🇸 Spanish (Spain & Latin America)
- 🇨🇳 Chinese/Mandarin
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
- 🇵🇹 Portuguese (Portugal & Brazil)
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇷🇺 Russian
- 🇳🇱 Dutch
- 🇵🇱 Polish
- 🇹🇷 Turkish
- 🇸🇪 Swedish
- 🇮🇳 Hindi
- 🇦🇪 Arabic

### Full list:
https://elevenlabs.io/docs/languages

---

## Alternative: Google Cloud Translation API (If Needed)

If ElevenLabs multilingual isn't available in your plan, you can add explicit translation:

### Step 1: Enable Translation API
```powershell
# In Google Cloud Console
https://console.cloud.google.com/apis/library/translate.googleapis.com?project=porchfitness-98628
```

### Step 2: Add Translation to Cloud Function
```javascript
// In functions/index.js
const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({projectId: 'porchfitness-98628'});

// In getRecentHistory function, before returning:
if (detectedLanguage !== 'en') {
  const [translation] = await translate.translate(summary, detectedLanguage);
  return {success: true, summary: translation};
}
```

### Step 3: Deploy
```powershell
firebase deploy --only functions
```

**Cost:** $20 per 1M characters (free tier: $300 credit = 15M characters)

---

## Google Cloud Text-to-Speech (Alternative Voice Provider)

If you want different voices per language:

### Enable API:
https://console.cloud.google.com/apis/library/texttospeech.googleapis.com?project=porchfitness-98628

### Voices Available:
- **English:** 20+ voices (male/female, various accents)
- **Spanish:** 12+ voices (Spain, Mexico, US)
- **Chinese:** 8+ voices (Mandarin, Cantonese)
- **French:** 10+ voices
- **German:** 8+ voices
- And 40+ languages total

### Sample Code:
```javascript
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

async function speak(text, languageCode = 'en-US') {
  const request = {
    input: {text},
    voice: {
      languageCode, // 'es-ES', 'zh-CN', 'fr-FR'
      ssmlGender: 'FEMALE',
      name: 'es-ES-Standard-A' // Optional: specific voice
    },
    audioConfig: {audioEncoding: 'MP3'}
  };
  
  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent; // Base64 MP3
}
```

**Cost:** $4-16 per 1M characters
**Docs:** https://cloud.google.com/text-to-speech/docs

---

## Recommended Setup 🎯

### For PorchFitness:

**✅ USE: ElevenLabs Multilingual (5 minutes)**
- Already integrated
- Natural conversational voice
- Included in your plan (likely)
- No code changes needed
- Just enable in dashboard

**⚠️ SKIP: Translation API**
- Only needed if ElevenLabs doesn't support your language
- Or if you want explicit translation control

**⚠️ SKIP: Text-to-Speech API**
- Only if you want to switch voice provider
- More complex integration
- Additional costs

---

## Testing Checklist ✅

### Test 1: Spanish Voice
1. Open app: https://porchfitness-98628.web.app
2. Click Samantha
3. Say: "Hola, ¿cómo estás?"
4. ✅ Should respond in Spanish voice

### Test 2: Chinese Voice
1. Say: "你好 Samantha"
2. ✅ Should respond in Mandarin voice

### Test 3: Memory with Language
1. Complete exercise
2. When asked, respond in Spanish: "Me siento bien, sin dolor"
3. Return next day
4. ✅ Samantha should greet in Spanish: "¡Bienvenido de nuevo!"

### Test 4: Language Switching
1. Start in English: "Hello Samantha"
2. Switch: "Please speak Spanish"
3. ✅ Should switch to Spanish voice

---

## Troubleshooting

### Issue: Samantha still speaks English
**Solution:**
1. Check ElevenLabs dashboard → Agent → Settings → Languages
2. Verify languages are enabled and saved
3. Click "Publish" to deploy changes
4. Wait 30-60 seconds
5. Refresh webpage and test again

### Issue: Language detection not working
**Solution:**
1. In ElevenLabs settings, enable "Auto-detect language"
2. Or explicitly say: "Habla español" / "Speak Spanish"
3. Verify Gemini prompt includes language detection instructions

### Issue: Translation API errors
**Solution:**
1. Check API is enabled: https://console.cloud.google.com/apis/library/translate.googleapis.com?project=porchfitness-98628
2. Verify billing is enabled (free tier should work)
3. Check function logs: `firebase functions:log --only getRecentHistory`

---

## Summary

✅ **Gemini API Key:** WORKING (verified with test)
✅ **Multilingual Text:** Already implemented in Gemini prompt
🔲 **Multilingual Voice:** Enable in ElevenLabs dashboard (5 min)
🔲 **Translation API:** Optional, only if needed
🔲 **Text-to-Speech:** Optional alternative

**Next Action:** Enable languages in ElevenLabs dashboard → Test with "Hola Samantha"
