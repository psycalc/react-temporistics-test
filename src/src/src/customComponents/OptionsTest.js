import React from 'react';
import { Form } from 'react-bootstrap';

function OptionsTest({ options, onSelect }) {
 const [selectedOption, setSelectedOption] = React.useState(null);

 React.useEffect(() => {
 setSelectedOption(null);
 }, [options]);

 return (
 <Form.Group>
 {Object.entries(options).map(([label, value]) => (
 <Form.Check
 key={label}
 type="radio"
 label={label}
 checked={selectedOption === value}
 onChange={() => {
 setSelectedOption(value);
 onSelect(value);
 }}
 />
 ))}
 </Form.Group>
 );
}

export default OptionsTest;
