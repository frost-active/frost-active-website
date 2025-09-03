// src/utils/translateText.js
import axios from 'axios';

const decodeHtmlEntities = (str) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

const translateText = async (texts = [], targetLanguage) => {
  const apiKey = 'AIzaSyCNU1RyV3Xn8ERkK7EgyegQlUWDHVqA56E';  // Replace this
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await axios.post(url, {
      q: texts,
      target: targetLanguage
    });

    const translations = response.data.data.translations.map(t => decodeHtmlEntities(t.translatedText));
    return translations;
  } catch (error) {
    console.error('Translation API Error:', error);
    return texts;  // fallback
  }
};

export default translateText;
