const express = require('express');
const mongoose = require('mongoose'); // ������ ����
const cors = require('cors')
const ExpressError = require('./util/ExpressError');
// campground ���Ʈ 
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/users')
const session = require('express-session')
const passport = require('passport'); // Passport ���
const LocalStrategy = require('passport-local') // Passport�� LocalStrategy ���
const cookieParser = require('cookie-parser');
const User = require('./models/user')
const dotenv = require('dotenv');

const app = express();
app.use(cors({
    // Ŭ���̾�Ʈ ���ø����̼��� �ּҸ� �����մϴ�.
    origin: 'http://localhost:3000',
    
    // ����� HTTP �޼��带 �迭�� �����մϴ�.
    methods: ['GET', 'POST', 'OPTIONS'],
    
    // ��Ű�� ������ ��û�� ����ϱ� ���� credentials �ɼ��� true�� �����մϴ�.
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/yelp-camp') // �������� �̿��ؼ� ����DB ����

// ���� Ȯ�� �ڵ� 
const db = mongoose.connection; // MongoDB ���ῡ ���� ������ ��´�. �� ������ db ������ �Ҵ� 
db.on("error", console.error.bind(console, "connection error"), {
    useNewUrlParser: true, // �ֽ� ������ ����̹����� ȣȯ���� ����
    useUnifiedTopology: true,
});
db.once("open", () => { // �� ���� ����Ǵ� �̺�Ʈ ������ ��� MongoDB�� ���������� ����Ǿ��� �� �޼���
    console.log("Database connected");
});

// const sessionConfig = {
//     secret : 'apple',
//     resave : false,
//     saveUninitialized : true,
//     cookie : { // ��Ű ����Ⱓ ���� ( 1���� �� )
//         httpOnly: true, // Ŭ���̾�Ʈ �� JavaScript�� ���� ��Ű�� �����ϴ� ���� ����
//         expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge : 1000 * 60 * 60 * 24 * 7 
//     }
// }


dotenv.config();
app.use(cookieParser());
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate())) // Passport���� ���� ���� ������ ����ϵ��� �����ϴ� �κ�


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
