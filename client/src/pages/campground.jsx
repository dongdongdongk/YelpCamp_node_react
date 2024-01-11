import { useEffect, useState } from "react"
import { Link, useLocation  } from 'react-router-dom'
import axios from 'axios'; 
import { Alert } from 'react-bootstrap'

const CampGround = () => {
    const [camp, setCamp] = useState([]);
    const location = useLocation();
    const [registrationComplete, setRegistrationComplete] = useState(false); // 등록 완료 상태
    useEffect(() => {
        const fetchData = async () => {

            try{
               const response = await axios.get('http://localhost:4000/campground')
               setCamp(response.data);
            } catch(error) {
                console.error("FAIL LOAD CAMPGROUND DATA")
                setCamp([]);
            }
        }

        fetchData();

         // location state에 registrationComplete 값이 있으면 얼럿을 띄우고, 값을 삭제
         if (location.state && location.state.registrationComplete) {
            setRegistrationComplete(true);
            // 얼럿을 한 번만 표시하고 나면 state 초기화
            setTimeout(() => {
                setRegistrationComplete(false);
            }, 5000);
        }
    },[location.state])

    return (
        <>
            {registrationComplete && (
                <Alert variant="success" onClose={() => setRegistrationComplete(false)} dismissible>
                    등록이 완료되었습니다!
                </Alert>
            )}

            <h1>CampGround</h1>
            <ul>
                {camp.map((camp) => (
                    <div className="card" key={camp._id}>
                        <div className="row">
                            <div className="col-mb-4">
                                <img className="img-fluid" alt="" src= {camp.image}/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{camp.title}</h5>
                                    <p className="card-text">{camp.description}</p>
                                    <p className="card-text">
                                        <small className="text-muted">{camp.location}</small>
                                    </p>
                                    <Link to={`/campground/${camp._id}`}><button className="btn btn-primary">View</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </ul>   
        </>
    )
}

export default CampGround;