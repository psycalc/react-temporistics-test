import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AudioTest from './customComponents/AudioTest';
import CheckboxMatrixTest from './customComponents/CheckboxMatrixTest';
import ImageTest from './customComponents/ImageTest';
import OptionsTest from './customComponents/OptionsTest';
import RadioMatrixTest from './customComponents/RadioMatrixTest';
import TextTest from './customComponents/TextTest';
import Results from './customComponents/Results';
import Timer from './customComponents/Timer';
import Center from './customComponents/Center';
import TestProgressBar from './customComponents/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TemporisticsTestForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Correct usage of useNavigate


  const { t } = useTranslation();

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
      }
    };
    fetchQuestions();
  }, []);

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleSubmit = () => {
    navigate('/results', { state: { answers } });
  };

  const handleAnswer = answer => {
    setAnswers(prevAnswers => [...prevAnswers, answer]);
    if (currentStep === questions.length - 1) {
      handleSubmit();
    } else {
      handleNext();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const question = questions[currentStep];

  const questionComponents = {
    options: OptionsTest,
    text: TextTest,
    audio: AudioTest,
    image: ImageTest,
    'radio-matrix': RadioMatrixTest,
    'checkbox-matrix': CheckboxMatrixTest,
  };

  const QuestionComponent = questionComponents[question.type];

  const componentProps = {
    options: { options: question.options, onSelect: handleAnswer },
    text: { onSubmit: handleAnswer },
    'radio-matrix': { rows: question.rows, cols: question.cols },
    'checkbox-matrix': { rows: question.rows, cols: question.cols },
  };

  const component = QuestionComponent ? <QuestionComponent key={currentStep} {...componentProps[question.type]} /> : null;

  return (
    <Center>
      <Timer duration={60} />
      <Form style={{ width: '50%', fontSize: '1.2rem' }}>
        <TestProgressBar currentStep={currentStep} totalSteps={questions.length} />
        <Form.Label>{t(question.label)}</Form.Label>
        {component}
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handlePrev} disabled={currentStep === 0}>
            {t('back')}
          </Button>
          {currentStep === questions.length - 1 ? (
            <Button variant="primary" onClick={handleSubmit}>
              {t('submit')}
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNext}>
              {t('next')}
            </Button>
          )}
        </div>
      </Form>
      <Results answers={answers} />
    </Center>
  );
};

export default React.memo(TemporisticsTestForm);