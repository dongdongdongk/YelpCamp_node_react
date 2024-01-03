import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CampGroundUpdate = () => {
    const params = useParams();
    const navigate = useNavigate();

    // 상태초기화
    const [formData, setFormData] = useState({
        title: '',
        location: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/campground/${params.id}`)
                console.log(params.id)
                setFormData(response.data)
            } catch (error) {
                console.error("CAMP LOAD FAIL");
            }
        }
        fetchData();
    }, [params.id])

    // 입력값 변경 시 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // 폼 제출 핸들러
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // 폼 데이터 전송
        try {
            await axios.put(`http://localhost:4000/campground/${params.id}`, formData);
            navigate('/campground');
        } catch (error) {
            console.error('SAVE FAIL', error);
        }
    };


    return (
        <>
            <h1>CampGroundUpdate</h1>
            <form>
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
                <button type="submit" onClick={onSubmitHandler}>Update</button>
            </form>
            <Link to={'/campground'}>홈으로</Link>
        </>
    )
}

export default CampGroundUpdate;