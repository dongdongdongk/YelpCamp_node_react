import { useState } from "react"
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const CampGroundAdd = () =>{
    const navigate = useNavigate();
    //상태 초기화 
    const [formData, setFormData] = useState({
        title : '',
        location : ''
    });

    // 입력값 변경 핸들러 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevDate) => ({
            ...prevDate,[name] : value
        }));
    }

    // 폼 제출 핸들러 
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        //폼 데이터 전송
        try {
            await axios.post('http://localhost:4000/campground/new', formData);
            navigate('/campground');

        } catch(error) {
            console.error("SAVE FAIL", error);
        }
    }

    return(
        <>
            <h1>CampGroundAdd</h1>
            <form onSubmit={onSubmitHandler}>
                <label htmlFor="title">title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <label htmlFor="location">location</label>
                <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <button type="submit" value="submit">Submit</button>
            </form>
        
        </>
    )


}


export default CampGroundAdd