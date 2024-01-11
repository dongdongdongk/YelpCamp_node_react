const express = require('express');
const mongoose = require('mongoose'); // ������ ����
const cors = require('cors')
const ExpressError = require('./util/ExpressError');
// campground ���Ʈ 
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/review')
const session = require('express-session')

const app = express();
app.use(cors())
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

const sessionConfig = {
    secret : 'apple',
    resave : false,
    saveUninitialized : true,
    cookie : { // ��Ű ����Ⱓ ���� ( 1���� �� )
        httpOnly: true, // Ŭ���̾�Ʈ �� JavaScript�� ���� ��Ű�� �����ϴ� ���� ����
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
