import React from 'react';

function LanguageSelector(props) {
  const { languages, selectedLanguage, onLanguageChange } = props;

  return (
    <div>
      <label htmlFor="language-select">Select a language:</label>
      <select id="language-select" value={selectedLanguage} onChange={onLanguageChange}>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSelector;