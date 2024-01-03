const express = require('express');
const mongoose = require('mongoose'); // ������ ����
const CampGround = require('./models/campground')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/yelp-camp') // �������� �̿��ؼ� ����DB ����

// ���� Ȯ�� �ڵ� 
const db = mongoose.connection; // MongoDB ���ῡ ���� ������ ��´�. �� ������ db ������ �Ҵ� 
db.on("error", console.error.bind(console, "connection error"),{
    useNewUrlParser: true, // �ֽ� ������ ����̹����� ȣȯ���� ����
    useUnifiedTopology: true,
});
db.once("open", () => { // �� ���� ����Ǵ� �̺�Ʈ ������ ��� MongoDB�� ���������� ����Ǿ��� �� �޼���
    console.log("Database connected");
});


// ��ȸ
app.get('/campground', async (req, res) => {
    const campground = await CampGround.find({});
    res.send(campground);
})

// �� ��ȸ
app.get('/campground/:id', async (req, res) => {
    const { id } = req.params
    const campground = await CampGround.findById(id);
    res.send(campground);
})

// �߰� 
app.post('/campground/new' ,async (req,res) => {
    const newCamp = new CampGround(req.body);
    await newCamp.save();
    res.send("SaveSuccess")
})

// ������Ʈ 
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

// ���� 
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