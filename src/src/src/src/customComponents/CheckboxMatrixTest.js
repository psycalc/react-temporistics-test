import React from 'react';
import { Form } from 'react-bootstrap';


function CheckboxMatrixTest({ label, rows, cols }) {
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
                            name={`checkbox${row}`}
                            type="checkbox"
                            id={`checkbox${row}${col}`}
                        />
                    ))}
                </div>
            ))}
        </fieldset>
    );
}

export default CheckboxMatrixTest;