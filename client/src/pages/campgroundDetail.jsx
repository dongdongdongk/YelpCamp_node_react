import { useEffect, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
                <div>
                    <h1>{camp.title}</h1>
                    <h2>{camp.location}</h2>
                </div>
            ) : (
                <p>캠프를 불러오는 중입니다...</p>
            )}
            <Link to={"/campground"}>홈으로</Link>
            <Link to={`/campground/${params.id}/edit`}>캠프수정</Link>
            <button type='button' onClick={deleteCamp}>삭제하기</button>
        </>
    )
}

export default CampGroundDetail;