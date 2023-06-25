import { useState, useEffect } from 'react';
import i18n from 'i18next';

const useQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      setQuestions([]);

      try {
        const response = await fetch(`/api/questions/${i18n.language}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return { loading, error, questions };
};

export default useQuestions;