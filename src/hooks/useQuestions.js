import { useState, useEffect } from 'react';

const useQuestions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return { loading, error, questions };
};

export default useQuestions;
