import React from "react";
import { Form} from 'react-bootstrap';

function AudioTest({ label }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type="file" accept="audio/*" capture />
        </Form.Group>
    );
}

export default AudioTest;