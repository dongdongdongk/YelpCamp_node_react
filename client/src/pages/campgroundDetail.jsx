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
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "bootstrap";

const CampGroundDetail = () => {
    const params = useParams();
    const [camp, setCamp] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/campground/${params.id}`)
                setCamp(response.data);
            } catch (error) {
                console.log("FAIL LOAD CAMPGROUND DETAIL");
                setCamp([]);
            }
        }
        fetchData();
    }, [])

    const deleteCamp = async () => {
        try {
            await axios.delete(`http://localhost:4000/campground/${params.id}`)
            navigate('/campground');
        } catch (error) {
            console.error('DELETE FAIL', error);
        }
    }


    return (
        <>

            {camp ? (
                <div className="row">
                    <div className="col-6 offset-3">
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
                </div>
            ) : (
                <p>캠프를 불러오는 중입니다...</p>
            )}
            
        </>
    )
}

export default CampGroundDetail;