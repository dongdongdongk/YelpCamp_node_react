import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CampGroundAdd = () => {
    const navigate = useNavigate();
    //상태 초기화 
    const [formData, setFormData] = useState({
        title: '',
        location: ''
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

        //폼 데이터 전송
        try {
            await axios.post('http://localhost:4000/campground/new', formData);
            navigate('/campground');

        } catch (error) {
            console.error("SAVE FAIL", error);
        }
    }

    return (
        <>
            <div className="row">
                <h1 className="text-center">CampGroundAdd</h1>
                <div className="col-6 offset-3">
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="title">Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="location">Location</label>
                            <input
                                className="form-control"
                                type="text"
                                name="location"
                                id="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="image">Image</label>
                            <input
                                className="form-control"
                                type="text"
                                name="image"
                                id="image"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="price">Campground Price</label>
                            <div className="input-group">
                                <span className="input-group-text" id="price-label">$</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    placeholder="0.00"
                                    aria-label="price"
                                    aria-describedby="price-label"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <textarea
                                className="form-control"
                                type="text"
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleChange}>
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-success" type="submit" value="submit">AddCampGround</button>
                        </div>
                    </form>
                    <Link to={"/campground"}>All Campground</Link>
                </div>
            </div>

        </>
    )


}


export default CampGroundAdd