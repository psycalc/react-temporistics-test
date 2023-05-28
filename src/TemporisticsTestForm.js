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

function TemporisticsTestForm() {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [questions, setQuestions] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);

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
        setShowResults(true);
    };

    if (questions.length === 0) {
        return <div>Завантаження...</div>;
    }

    if (showResults) {
        return <Results answers={answers} />;
    }

    const question = questions[currentStep];

    let component;
    switch (question.type) {
        case 'options':
            component = (
                <OptionsTest
                    options={question.options}
                    onSelect={(answer) =>
                        setAnswers((prevAnswers) => [...prevAnswers, answer])
                    }
                />
            );
            break;
        case 'text':
            component = (
                <TextTest
                    onSubmit={(answer) =>
                        setAnswers((prevAnswers) => [...prevAnswers, answer])
                    }
                />
            );
            break;
        case 'audio':
            component = <AudioTest />;
            break;
        case 'image':
            component = <ImageTest />;
            break;
        case 'radio-matrix':
            component = (
                <RadioMatrixTest rows={question.rows} cols={question.cols} />
            );
            break;
        case 'checkbox-matrix':
            component = (
                <CheckboxMatrixTest rows={question.rows} cols={question.cols} />
            );
            break;
        default:
            component = null;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Timer duration={60} />
            <Form style={{ width: '50%', fontSize: '1.2rem' }}>
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
        </div>
    );
}

export default TemporisticsTestForm;
