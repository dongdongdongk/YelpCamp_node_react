const express = require('express');
const mongoose = require('mongoose'); // 몽구스 연결
const CampGround = require('./models/campground')
const Review = require("./models/review")
const cors = require('cors')
const catchAsync = require("./util/catchAsync");
const ExpressError = require('./util/ExpressError');
const { campgroundSchema , reviewSchema } = require("./validate")

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/yelp-camp') // 몽구스를 이용해서 몽고DB 연결

// 연결 확인 코드 
const db = mongoose.connection; // MongoDB 연결에 대한 정보를 얻는다. 이 정보를 db 변수에 할당 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // 최신 버전의 드라이버와의 호환성을 유지
    useUnifiedTopology: true,
});
db.once("open", () => { // 한 번만 실행되는 이벤트 리스너 등록 MongoDB에 성공적으로 연결되었을 때 메세지
    console.log("Database connected");
});


// 조회
app.get('/campground', catchAsync(async (req, res) => {
    const campground = await CampGround.find({});
    res.send(campground);
}));

// 상세 조회
app.get('/campground/:id', catchAsync(async (req, res) => {
    const { id } = req.params

    const campground = await CampGround.findById(id).populate('reviews');
    if (!campground) throw new ExpressError("Invalid Campground Data", 400)
    res.send(campground);

}))

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        throw new ExpressError(errorMessage, 400)
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body, { abortEarly : false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(',');
        throw new ExpressError(errorMessage, 400)
    } else {
        next();
    }
}


// 추가 
app.post('/campground/new',validateCampground, catchAsync(async (req, res) => {
    // if (!req.body.newCamp) throw new ExpressError('Invalid Campground Data', 400);
    const newCamp = new CampGround(req.body);
    await newCamp.save();
    res.send("SaveSuccess")
}));

// 업데이트 
app.put('/campground/:id',validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await CampGround.findById(id);

    if (!camp) throw new ExpressError("CampFindFail", 404)
    if (!req.body.camp) throw new ExpressError('Invalid Campground Data(Update)', 400);


    camp.set(req.body);
    await camp.save();

    res.send(camp);

}))

// 리뷰 추가 
app.post('/campground/:id/review',validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await CampGround.findById(id);
    const { body, rating} = req.body;
    const review = new Review({body, rating});
    campground.reviews.push(review._id);
    await review.save();
    await campground.save();
    console.log(campground)
    console.log("reviewSuccess")
    res.send(campground);  
}))

// 리뷰 삭제 
app.delete('/campground/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id,reviewId } = req.params;
    await CampGround.findByIdAndUpdate(id, { $pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.send("Delete Test")
}))



//캠프 삭제 
app.delete('/campground/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const result = await CampGround.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            res.status(200).send("DELETE SUCCESS")
        } else {
            res.status(404).send("ID NOT FOUND");
        }
    } catch (error) {
        console.log('DELETE FAIL')
        res.send(500).send("DELETE FAIL")
    }
}))

app.use((err, req, res, next) => {
    console.log(err.name)
    next(err);
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found'), 404)
})


app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).send(message)
})


app.listen(4000, () => {
    console.log("serving on port 4000");
})
