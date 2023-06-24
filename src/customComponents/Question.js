import AudioTest from './/AudioTest';
import CheckboxMatrixTest from './CheckboxMatrixTest';
import ImageTest from './ImageTest';
import OptionsTest from './OptionsTest';
import RadioMatrixTest from './RadioMatrixTest';
import TextTest from './TextTest';

const questionComponents = {
  options: OptionsTest,
  text: TextTest,
  audio: AudioTest,
  image: ImageTest,
  'radio-matrix': RadioMatrixTest,
  'checkbox-matrix': CheckboxMatrixTest,
};

const Question = ({ type, ...props }) => {
  const Component = questionComponents[type] || null;

  return Component ? <Component {...props} /> : null;
};

export default Question;
