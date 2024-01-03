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
                    <li key={camp.id}>
                    <Link to={`/campground/${camp._id}`}>{camp.title}</Link>    
                    </li>
                ))}
            </ul>   
        </>
    )
}

export default CampGround;