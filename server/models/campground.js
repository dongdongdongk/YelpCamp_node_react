const mongoose = require('mongoose'); // 몽구스 연결
const { Schema } = mongoose; // 몽구스 스키마를 스키마로 저장 ( 자주 사용하기 위해 단축키 느낌 )
const Review = require('./review');


const CampGroundSchema = new Schema ({ // CampGround 스키마 정의 
    title : String,
    image : String, 
    price : Number,
    description : String,
    location : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
});

CampGroundSchema.post('findOneAndDelete', async function(doc) {
    console.log(doc)
    if(doc) {
        await Review.deleteMany({
            _id : {
                $in : doc.reviews
            }
        })
    }

}) 


module.exports = mongoose.model('CampGround', CampGroundSchema); // 모델 내보내기 
