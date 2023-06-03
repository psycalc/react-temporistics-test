import React from 'react';
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

function TemporisticsTestForm() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);
    const navigate = useNavigate();


    React.useEffect(() => {
        fetch('/questions.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`An error occurred: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setQuestions(data))
            .catch((error) => {
                console.error(error);
            });
    }, []);


    const handleNext = () => {
        if (currentStep < questions.length) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    const handleSubmit = () => {
        // перевірка правильності відповідей
        // ...
        // setShowResults(true);
        navigate('/results');
    };

    if (questions.length === 0) {
        return <div>Завантаження...</div>;
    }

    if (showResults) {
        return <Results answers={answers} />;
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

    const handleAnswer = (answer) => {
        setAnswers((prevAnswers) => [...prevAnswers, answer]);
        if (currentStep === questions.length - 1) {
            handleSubmit();
        } else {
            handleNext();
        }
    };

    const componentProps = {
        options: { options: question.options, onSelect: handleAnswer },
        text: { onSubmit: handleAnswer },
        'radio-matrix': { rows: question.rows, cols: question.cols },
        'checkbox-matrix': { rows: question.rows, cols: question.cols },
    };

    let component = null;
    if (QuestionComponent) {
        component = <QuestionComponent {...componentProps[question.type]} />;
    }

    return (
        <Center>
            <Timer duration={60} />
            <Form style={{ width: '50%', fontSize: '1.2rem' }}>
                <TestProgressBar currentStep={currentStep} totalSteps={questions.length} />
                <Form.Label>{question.label}</Form.Label>
                {component}
                <div className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={handlePrev} disabled={currentStep === 0}>
                        Назад
                    </Button>
                    {currentStep === questions.length - 1 ? (
                        <Button variant="primary" onClick={handleSubmit}>
                            Відправити
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleNext}>
                            Далі
                        </Button>
                    )}
                </div>
            </Form>
        </Center>
    );
}

export default TemporisticsTestForm;
