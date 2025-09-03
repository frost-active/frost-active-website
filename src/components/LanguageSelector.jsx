// src/components/FullPageTranslator.jsx
import { useState } from 'react';
import translateText from '../utils/translateText';

const FullPageTranslator = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = async (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    if (selectedLang === 'en') {
      window.location.reload(); // Reload original language
      return;
    }

    // Get all visible text nodes (skip script, style, input)
    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        if (
          node.parentNode.nodeName !== 'SCRIPT' &&
          node.parentNode.nodeName !== 'STYLE' &&
          node.parentNode.nodeName !== 'NOSCRIPT' &&
          node.parentNode.nodeName !== 'TEXTAREA' &&
          node.parentNode.nodeName !== 'INPUT' &&
          node.nodeValue.trim() !== ''
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_REJECT;
      }
    });

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    const originalTexts = textNodes.map(node => node.nodeValue.trim());

    // Translate texts in batches (Google API allows up to 128K chars per request)
    const translatedTexts = await translateText(originalTexts, selectedLang);

    // Update text nodes with translations
    textNodes.forEach((node, index) => {
      node.nodeValue = translatedTexts[index];
    });
  };

  return (
    <select
      value={language}
      onChange={handleLanguageChange}
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 10000,
        padding: '6px 10px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>
      <option value="hi">Hindi</option>
      <option value="zh-CN">Chinese</option>
    </select>
  );
};

export default FullPageTranslator;
