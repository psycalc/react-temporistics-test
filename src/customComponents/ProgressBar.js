import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function TestProgressBar({ currentStep, totalSteps }) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <>
            <p>
                Вопрос №{currentStep + 1} из {totalSteps}
            </p>
            <ProgressBar now={progress} />
        </>
    );
}

export default TestProgressBar;
