import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext, onSubmit }) => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-between">
      <Button variant="secondary" onClick={onPrev} disabled={currentStep === 0}>
        {t('back')}
      </Button>
      {currentStep === totalSteps - 1 ? (
        <Button variant="primary" onClick={onSubmit}>
          {t('submit')}
        </Button>
      ) : (
        <Button variant="primary" onClick={onNext}>
          {t('next')}
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
