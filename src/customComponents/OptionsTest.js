import React from 'react';
import { Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function OptionsTest({ label, options }) {
    const [value, setValue] = React.useState('');

    const handleChange = (val) => {
        setValue(val);
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <ToggleButtonGroup type="radio" name="options" value={value} onChange={handleChange}>
                {options.map((option) => (
                    <ToggleButton key={option} value={option} className="m-1">
                        {option}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Form.Group>
    );
}

export default OptionsTest;
