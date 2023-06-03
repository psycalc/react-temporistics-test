import React from 'react';
import { Form } from 'react-bootstrap';

function RadioMatrixTest({ label, rows, cols }) {
    return (
        <fieldset>
            <Form.Label as="legend">{label}</Form.Label>
            {rows.map((row) => (
                <div key={row} style={{ display: 'flex' }}>
                    {cols.map((col) => (
                        <Form.Check
                            key={col}
                            inline
                            label={`${row},${col}`}
                            name={`radio${row}`}
                            type="radio"
                            id={`radio${row}${col}`}
                        />
                    ))}
                </div>
            ))}
        </fieldset>
    );
}

export default RadioMatrixTest;