
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Register = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    //상태 초기화 
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // 입력값 변경 핸들러 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevDate) => ({
            ...prevDate, [name]: value
        }));
    }


    // 폼 제출 핸들러 
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        setValidated(false);

        // 폼 데이터 전송
        try {
            await axios.post('http://localhost:4000/register', formData);
        } catch (error) {
            console.error("SAVE FAIL", error);
        }
    }


    return (
        <>
        <h1>UserRegister</h1>
            <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="username">
                        <Form.Label>UserName</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid username.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>
        </>
    )


}


export default Register;