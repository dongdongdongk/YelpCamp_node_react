const mongoose = require('mongoose'); // 몽구스 연결

const Schema = mongoose.Schema; // 몽구스 스키마를 스키마로 저장 ( 자주 사용하기 위해 단축키 느낌 )

const CampGroundSchema = new Schema ({ // CampGround 스키마 정의 
    title : String, 
    price : String,
    description : String,
    location : String
});


module.exports = mongoose.model('CampGround', CampGroundSchema); // 모델 내보내기 