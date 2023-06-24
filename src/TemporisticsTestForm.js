import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useQuestions from './hooks/useQuestions';
import NavigationButtons from './customComponents/NavigationButtons';
import Question from './customComponents/Question';
import Results from './customComponents/Results';
import Timer from './customComponents/Timer';
import Center from './customComponents/Center';
import TestProgressBar from './customComponents/ProgressBar';

const TemporisticsTestForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
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

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}</div>;

  const question = questions[currentStep];
  const questionProps = {
    options: { options: question.options, onSelect: handleAnswer },
    text: { onSubmit: handleAnswer },
    'radio-matrix': { rows: question.rows, cols: question.cols },
    'checkbox-matrix': { rows: question.rows, cols: question.cols },
  };

  return (
    <Center>
      <Timer duration={60} />
      <Form style={{ width: '50%', fontSize: '1.2rem' }}>
        <TestProgressBar currentStep={currentStep} totalSteps={questions.length} />
        <Form.Label>{t(question.label)}</Form.Label>
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
