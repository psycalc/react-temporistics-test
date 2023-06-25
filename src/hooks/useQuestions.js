import { useState, useEffect } from 'react';
import i18n from 'i18next';

const useQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setQuestions([]);

    const language = i18n.language;
    const questionsFile = `questions_${language}.json`;

    fetch(questionsFile)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [i18n.language]);

  return { loading, error, questions };
};

export default useQuestions;