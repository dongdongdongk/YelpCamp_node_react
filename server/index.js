const express = require('express');
const mongoose = require('mongoose'); // 몽구스 연결
const cors = require('cors')
const ExpressError = require('./util/ExpressError');
// campground 라우트 
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/review')
const session = require('express-session')

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

const sessionConfig = {
    secret : 'apple',
    resave : false,
    saveUninitialized : true,
    cookie : { // 쿠키 만료기간 설정 ( 1주일 뒤 )
        httpOnly: true, // 클라이언트 측 JavaScript를 통해 쿠키에 접근하는 것을 막음
        expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge : 1000 * 60 * 60 * 24 * 7 
    }
}


app.use(session(sessionConfig))
app.use('/campground', campgrounds)
app.use('/campground/:id/reviews', reviews )

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
