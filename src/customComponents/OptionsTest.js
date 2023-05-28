import React from 'react';
import { Form } from 'react-bootstrap';

function OptionsTest({ options, onSelect }) {
    return (
        <Form.Group>
            {Object.entries(options).map(([label, value]) => (
                <Form.Check
                    key={label}
                    type="radio"
                    label={label}
                    onChange={() => onSelect(value)}
                />
            ))}
        </Form.Group>
    );
}

export default OptionsTest;
