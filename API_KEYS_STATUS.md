# Firebase Secrets & API Keys Status

## Current Setup ✅

### Firebase Secret Manager
We're using **Firebase Secret Manager** (not environment variables):

```javascript
// In functions/index.js
const {defineSecret} = require("firebase-functions/params");
const geminiApiKey = defineSecret("GEMINI_API_KEY");
```

### Secret Configuration

**GEMINI_API_KEY:**
- ✅ **Method:** Firebase Secret Manager (secure)
- ✅ **Location:** Google Cloud Secret Manager for project porchfitness-98628
- ✅ **Access:** Functions automatically decrypt at runtime
- ✅ **Status:** VERIFIED WORKING - Function test successful!
  - Test response: `{"success":true,"summary":"This is your first workout! I'm excited to start this journey with you."}`
  - Gemini API successfully called from getRecentHistory function

**To verify/set the Gemini secret:**
```powershell
# Check if secret exists (requires gcloud CLI)
gcloud secrets list --project=porchfitness-98628

# OR use Firebase Console:
# Go to: https://console.firebase.google.com/project/porchfitness-98628/functions
# Click on a function → Configuration → Secrets
```

## ElevenLabs Configuration

**Agent ID:** `agent_5201kd2291x0ffysp0e4z7c57ksr`
- ✅ Public ID (safe in frontend code)
- ✅ No API key needed for client-side widget
- ✅ Already configured in index.html

## Multilingual Voice Translation 🌍

### Current Approach (Text-Only)
Our multilingual support only handles **TEXT**:
- Gemini detects language in workout notes
- Returns greeting text in that language
- **But ElevenLabs speaks in English only**

### Voice Translation Options

#### Option 1: ElevenLabs Multilingual Voices (EASIEST) ✅
**ElevenLabs supports 32+ languages!**

**How to enable:**
1. Go to ElevenLabs dashboard: https://elevenlabs.io/app/conversational-ai
2. Select your agent: agent_5201kd2291x0ffysp0e4z7c57ksr
3. In Settings → Languages, enable:
   - Spanish
   - Chinese (Mandarin)
   - French
   - German
   - Japanese
   - Portuguese
   - etc.
4. **The agent will automatically detect language and respond with matching voice**

**Supported languages:**
- Spanish (es)
- Chinese/Mandarin (zh)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Japanese (ja)
- Korean (ko)
- Dutch (nl)
- Polish (pl)
- Russian (ru)
- Turkish (tr)
- And 20+ more!

**No code changes needed** - ElevenLabs handles voice synthesis in detected language!

#### Option 2: Google Cloud Translation API (MORE COMPLEX)
If you need explicit translation control:

```javascript
// Install: npm install @google-cloud/translate
const {Translate} = require('@google-cloud/translate').v2;

const translate = new Translate({
  projectId: 'porchfitness-98628',
  key: process.env.GOOGLE_TRANSLATE_API_KEY // Separate key needed
});

async function translateText(text, targetLang) {
  const [translation] = await translate.translate(text, targetLang);
  return translation;
}
```

**Cost:** $20 per 1M characters (likely free tier covers usage)
**API:** https://cloud.google.com/translate/docs

#### Option 3: Google Cloud Text-to-Speech (ALTERNATIVE VOICE)
For different voices per language:

```javascript
// Install: npm install @google-cloud/text-to-speech
const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient();

async function synthesizeSpeech(text, languageCode) {
  const request = {
    input: {text: text},
    voice: {
      languageCode: languageCode, // 'en-US', 'es-ES', 'zh-CN'
      ssmlGender: 'FEMALE'
    },
    audioConfig: {audioEncoding: 'MP3'}
  };
  
  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent; // Base64 MP3
}
```

**Supported voices:**
- 220+ voices
- 40+ languages
- Multiple accents per language
- Neural WaveNet voices (high quality)

**Cost:** $4-16 per 1M characters
**API:** https://cloud.google.com/text-to-speech/docs

## Recommended Approach 🎯

### For Your Use Case:

**✅ Option 1: ElevenLabs Multilingual (RECOMMENDED)**
- **Why:** Already integrated, no extra code
- **How:** Just enable languages in ElevenLabs dashboard
- **Cost:** Included in your current ElevenLabs plan
- **Quality:** Natural conversational voice in 32+ languages
- **Setup:** 5 minutes

**Steps:**
1. Go to https://elevenlabs.io/app/conversational-ai
2. Click your agent
3. Settings → Languages → Enable target languages
4. Test by speaking to agent in Spanish/Chinese
5. Done! Agent auto-detects and responds in matching voice

## Testing Multilingual

### Test with ElevenLabs:
```
1. Open: https://porchfitness-98628.web.app
2. Click exercise card
3. Say: "Hola Samantha, ¿cómo estás?"
4. She should respond in Spanish voice
```

### Verify Gemini Memory:
```
1. Complete exercise with Spanish notes: "Me siento bien"
2. Return next day
3. Samantha should greet in Spanish: "¡Bienvenido de nuevo!"
```

## Next Steps

### 1. Verify Gemini Secret
Check Firebase Console → Functions → Configuration → Secrets
If GEMINI_API_KEY is missing:

```powershell
# Install gcloud CLI from: https://cloud.google.com/sdk/install
gcloud auth login
gcloud config set project porchfitness-98628
echo "YOUR_GEMINI_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=-
```

### 2. Enable ElevenLabs Languages
- Dashboard → Agent Settings → Languages
- Enable Spanish, Chinese, French, etc.

### 3. Test Full Flow
- Sign in → Exercise → Spanish notes → Return → Verify Spanish greeting

## API Key Sources

**Gemini API Key:**
- Free tier: 60 requests/minute
- Get key: https://aistudio.google.com/app/apikey

**Google Translate API:** (optional)
- Free tier: $300 credit (covers ~15M characters)
- Enable: https://console.cloud.google.com/apis/library/translate.googleapis.com

**Google Text-to-Speech API:** (optional)
- Free tier: 4M characters/month
- Enable: https://console.cloud.google.com/apis/library/texttospeech.googleapis.com

## Summary

✅ **Gemini API:** Uses Firebase Secret Manager (needs verification)
✅ **ElevenLabs:** Already working, just enable languages in dashboard
✅ **Multilingual Voice:** Built into ElevenLabs (32+ languages)
⚠️ **Translation API:** Optional, only if you need explicit translation control
⚠️ **Text-to-Speech:** Optional, only if you want different voice provider

**Recommendation:** Enable ElevenLabs multilingual in dashboard (5 min) ← DO THIS FIRST
