import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import useQuestions from './hooks/useQuestions';
import NavigationButtons from './customComponents/NavigationButtons';
import Question from './customComponents/Question';
import Results from './customComponents/Results';
import Timer from './customComponents/Timer';
import Center from './customComponents/Center';
import TestProgressBar from './customComponents/ProgressBar';
import LanguageSelector from './customComponents/LanguageSelector';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        loading: 'Loading...',
        error: 'Error loading questions',
      },
    },
    fr: {
      translation: {
        loading: 'Chargement...',
        error: 'Erreur lors du chargement des questions',
      },
    },
    es: {
      translation: {
        loading: 'Cargando...',
        error: 'Error al cargar las preguntas',
      },
    },
  },
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const TemporisticsTestForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [language, setLanguage] = useState(i18n.language);
  const { loading, error, questions } = useQuestions();

  const handleNext = () => setCurrentStep(currentStep + 1);
  const handlePrev = () => setCurrentStep(currentStep - 1);
  const handleSubmit = () => navigate('/results', { state: { answers } });
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentStep === questions.length - 1) {
      handleSubmit();
    } else {
      handleNext();
    }
  };
  const handleLanguageChange = (event) => {
    console.log('Language changed to', event.target.value);
    i18n.changeLanguage(event.target.value).catch((error) => {
      console.error('Failed to change language', error);
    });
    setLanguage(event.target.value);
  };

  useEffect(() => {
    console.log('i18n initialized with language', i18n.language);
    i18n.changeLanguage(i18n.language);
    setLanguage(i18n.language);
  }, []);

  if (loading) return <div>{i18n.t('loading')}</div>;
  if (error) return <div>{i18n.t('error')}</div>;

  const question = questions[currentStep];
  const questionProps = {
    options: { options: question.options, onSelect: handleAnswer },
    text: { onSubmit: handleAnswer },
    'radio-matrix': { rows: question.rows, cols: question.cols },
    'checkbox-matrix': { rows: question.rows, cols: question.cols },
  };

  console.log('Current question:', question);

  return (
    <Center>
      <LanguageSelector
        languages={[
          { code: 'en', name: 'English' },
          { code: 'fr', name: 'French' },
          { code: 'es', name: 'Spanish' },
        ]}
        selectedLanguage={language}
        onLanguageChange={handleLanguageChange}
      />
      <Timer duration={60} />
      <Form style={{ width: '50%', fontSize: '1.2rem' }}>
        <TestProgressBar currentStep={currentStep} totalSteps={questions.length} />
        <Form.Label>{i18n.t(question.label)}</Form.Label>
        <Question type={question.type} {...questionProps[question.type]} />
        <NavigationButtons
          currentStep={currentStep}
          totalSteps={questions.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </Form>
      <Results answers={answers} />
    </Center>
  );
};

export default React.memo(TemporisticsTestForm);