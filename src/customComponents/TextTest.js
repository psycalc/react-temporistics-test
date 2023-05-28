import { FloatingLabel, Form } from "react-bootstrap";

function TextTest({ label }) {
    return (
        <FloatingLabel label={label} className="mb-3">
            <Form.Control as="textarea" placeholder="Введіть текст" />
        </FloatingLabel>
    );
}

export default TextTest;