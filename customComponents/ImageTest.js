import React from "react";
import { Form } from "react-bootstrap";
function ImageTest({ label }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type="file" accept="image/*" capture />
        </Form.Group>
    );
}

export default ImageTest;