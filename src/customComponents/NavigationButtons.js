import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonGroup } from 'react-bootstrap';

const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <ButtonGroup style={{ marginTop: '1rem' }}>
      {currentStep > 0 && (
        <Button variant="secondary" onClick={onPrev}>
          {t('prev')}
        </Button>
      )}
      {currentStep < totalSteps - 1 && (
        <Button variant="primary" onClick={onNext}>
          {t('next')}
        </Button>
      )}
      {currentStep === totalSteps - 1 && (
        <Button variant="success" onClick={onSubmit}>
          {t('submit')}
        </Button>
      )}
    </ButtonGroup>
  );
};

export default NavigationButtons;