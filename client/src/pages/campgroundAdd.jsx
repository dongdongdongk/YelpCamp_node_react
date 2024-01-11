
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const CampGroundAdd = () => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    //상태 초기화 
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        image: '',
        price: '',
        description: ''
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
            await axios.post('http://localhost:4000/campground/new', formData);
            navigate('/campground', { state: { registrationComplete: true } });
        } catch (error) {
            console.error("SAVE FAIL", error);
        }
    }


    return (
        <>
            <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid title.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid location.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid image.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="price"
                                aria-describedby="inputGroupPrepend"
                                value={formData.price}
                                onChange={handleChange}
                                name="price"
                                pattern="[0-9]+"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a price.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <InputGroup hasValidation>
                            <FloatingLabel controlId="description" label="description">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a description here"
                                    value={formData.description}
                                    onChange={handleChange}
                                    name="description"
                                    style={{ height: '100px' }}
                                    required
                                />
                            </FloatingLabel>
                            {/* <Form.Control.Feedback type="invalid" style={{ display: validated ? 'block' : 'none' }}>
                                Please provide a valid description.
                            </Form.Control.Feedback> */}
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
            </Form>
        </>
    )


}


export default CampGroundAdd