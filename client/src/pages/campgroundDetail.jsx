import { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBBtn
} from 'mdb-react-ui-kit';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "bootstrap";

const CampGroundDetail = () => {
    const params = useParams();
    const [camp, setCamp] = useState({});
    const [reviews, setReviews] = useState([]); // 리뷰 상태 추가
    const [validated, setValidated] = useState(false);
    //상태 초기화 
    const [formData, setFormData] = useState({
        body: '',
        rating: 2,
    });

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/campground/${params.id}`)
                setCamp(response.data);
                setReviews(response.data.reviews);
            } catch (error) {
                console.log("FAIL LOAD CAMPGROUND DETAIL");
                setCamp({});
            }
        }
        fetchData();
    }, [params.id])

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
            await axios.post(`http://localhost:4000/campground/${params.id}/reviews`, formData);
            // 새로운 리뷰를 추가한 후에 다시 데이터를 불러와서 업데이트
            const response = await axios.get(`http://localhost:4000/campground/${params.id}`);
            // 인풋창 초기화 
            setFormData({ body: '', rating: 2 })
            setReviews(response.data.reviews);
        } catch (error) {
            console.error("ReviewFail", error);
        }
    }
    // 리뷰 삭제 핸들러
    const deleteReview = async (reviewId) => {
        try {
            await axios.delete(`http://localhost:4000/campground/${params.id}/reviews/${reviewId}`);
            // 리뷰를 삭제한 후에 다시 데이터를 불러와서 업데이트
            const response = await axios.get(`http://localhost:4000/campground/${params.id}`);
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Review Delete Fail', error);
        }
    }

    // 캠프 삭제 
    const deleteCamp = async () => {
        try {
            await axios.delete(`http://localhost:4000/campground/${params.id}`)
            navigate('/campground');
        } catch (error) {
            console.error('DELETE FAIL', error);
        }
    }

    // 입력값 변경 핸들러 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevDate) => ({
            ...prevDate, [name]: value
        }));
    }


    return (
        <>

            {camp ? (
                <div className="row">
                    <div className="col-6">
                        <MDBCard>
                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                <MDBCardImage src={camp.image} fluid alt='...' />
                                <a>
                                    <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                </a>
                            </MDBRipple>
                            <MDBCardBody>
                                <MDBCardTitle>{camp.title}</MDBCardTitle>
                                <MDBCardText>
                                    {camp.description}
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBListGroup flush>
                                <MDBListGroupItem className="text-muted">{camp.location}</MDBListGroupItem>
                                <MDBListGroupItem>${camp.price}/night</MDBListGroupItem>
                                <MDBListGroupItem>Vestibulum at eros</MDBListGroupItem>
                            </MDBListGroup>
                            <MDBCardBody>
                                <Link to={`/campground/${params.id}/edit`} ><MDBBtn className="me-2 btn-info">Edit</MDBBtn></Link>
                                <MDBBtn onClick={deleteCamp} className="btn-danger">Delete</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>

                        <Link to={"/campground"}>Back To CampGround</Link>
                    </div>
                    <div className="col-6">
                        {/* 폼제출 */}
                        <h1>Leave a Review</h1>
                        <Form noValidate validated={validated} onSubmit={onSubmitHandler}>
                            <Row className="mt-3">
                                <div>
                                    <label htmlFor="rating" className="form-label">Rating</label>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="0" max="5"
                                        id="rating"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}

                                    ></input>
                                </div>
                                <Form.Group as={Col} md="12" controlId="body">
                                    <Form.Label>Review</Form.Label>
                                    <InputGroup hasValidation>
                                        <FloatingLabel controlId="Review" label="Review">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Leave a review here"
                                                value={formData.body}
                                                onChange={handleChange}
                                                name="body"
                                                style={{ height: '100px' }}
                                                required
                                            />
                                        </FloatingLabel>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <MDBBtn className="btn-success mt-3">Submit</MDBBtn>
                        </Form>
                        <div className="mt-4">
                            <h2>Reviews</h2>
                            {reviews.map((review) => (
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div key={review._id}>
                                            <h5 className="card-title">Rating : {review.rating}</h5>
                                            <p className="card-text">Review :{review.body}</p>
                                        </div>
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteReview(review._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <p>캠프를 불러오는 중입니다...</p>
            )}

        </>
    )
}

export default CampGroundDetail;