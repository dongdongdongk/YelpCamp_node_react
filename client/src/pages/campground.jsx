import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'; 

const CampGround = () => {
    const [camp, setCamp] = useState([]);

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
    },[])

    return (
        <>
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
                    
                    // <li key={camp.id}>
                    // <Link to={`/campground/${camp._id}`}>{camp.title}</Link>    
                    // </li>
                ))}
            </ul>   
        </>
    )
}

export default CampGround;