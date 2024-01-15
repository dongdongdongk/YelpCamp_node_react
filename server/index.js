const express = require('express');
const mongoose = require('mongoose'); // 몽구스 연결
const cors = require('cors')
const ExpressError = require('./util/ExpressError');
// campground 라우트 
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/users')
const session = require('express-session')
const passport = require('passport'); // Passport 모듈
const LocalStrategy = require('passport-local') // Passport의 LocalStrategy 모듈
const User = require('./models/user')

const app = express();
app.use(cors({
    // 클라이언트 애플리케이션의 주소를 지정합니다.
    origin: 'http://localhost:3000',
    
    // 허용할 HTTP 메서드를 배열로 지정합니다.
    methods: ['GET', 'POST', 'OPTIONS'],
    
    // 쿠키를 포함한 요청을 허용하기 위해 credentials 옵션을 true로 설정합니다.
    credentials: true,
}));
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


app.use(session(sessionConfig)) // app.use(passport.session()); 전에 있어야 한다
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())) // Passport에게 로컬 인증 전략을 사용하도록 지시하는 부분
passport.serializeUser(User.serializeUser()); // 사용자 정보를 세션에 저장할 때 어떤 필드를 사용할지를 정의하는 메소드
passport.deserializeUser(User.deserializeUser()); // 세션에 저장된 사용자 정보를 어떻게 복원할지를 정의하는 메소드

app.get('fakeUser', async(req, res) => {

})

app.use('/campground', campgroundRoutes)
app.use('/campground/:id/reviews', reviewRoutes )
app.use('/', userRoutes)

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
