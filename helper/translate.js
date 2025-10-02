// helper/translate.js

import axios from "axios";

export async function translateText(text, targetLang) {
  try {
    const res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2`,
      {},
      {
        params: {
          q: text,
          target: targetLang,
          key: process.env.GOOGLE_TRANSLATE_API_KEY, // from .env.local
        },
      }
    );

    return res.data.data.translations[0].translatedText;
  } catch (err) {
    console.error("Translation error:", err);
    return text; // fallback to original
  }
}
