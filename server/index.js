const express = require('express');
const mongoose = require('mongoose'); // 몽구스 연결
const CampGround = require('./models/campground')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/yelp-camp') // 몽구스를 이용해서 몽고DB 연결

// 연결 확인 코드 
const db = mongoose.connection; // MongoDB 연결에 대한 정보를 얻는다. 이 정보를 db 변수에 할당 
db.on("error", console.error.bind(console, "connection error"),{
    useNewUrlParser: true, // 최신 버전의 드라이버와의 호환성을 유지
    useUnifiedTopology: true,
});
db.once("open", () => { // 한 번만 실행되는 이벤트 리스너 등록 MongoDB에 성공적으로 연결되었을 때 메세지
    console.log("Database connected");
});


// 조회
app.get('/campground', async (req, res) => {
    const campground = await CampGround.find({});
    res.send(campground);
})

// 상세 조회
app.get('/campground/:id', async (req, res) => {
    const { id } = req.params
    const campground = await CampGround.findById(id);
    res.send(campground);
})

// 추가 
app.post('/campground/new' ,async (req,res) => {
    const newCamp = new CampGround(req.body);
    await newCamp.save();
    res.send("SaveSuccess")
})

// 업데이트 
app.put('/campground/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const camp = await CampGround.findById(id);

        if(!camp) {
            return res.status(404).send("CampFindFail");
        }

        camp.set(req.body);
        await camp.save();

        res.send(camp);
    } catch(error) {
        console('campUpdateFail',error);
        res.status(500).send('campUpdateFail');
    }
})

// 삭제 
app.delete('/campground/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await CampGround.deleteOne({_id : id});
        if(result.deletedCount > 0) {
            res.status(200).send("DELETE SUCCESS")
        } else {
            res.status(404).send("ID NOT FOUND");
        }
    } catch(error) {
        console.log('DELETE FAIL')
        res.send(500).send("DELETE FAIL")
    }
})


app.listen(4000, () => {
    console.log("serving on port 4000");
})