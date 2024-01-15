const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    }
});
UserSchema.plugin(passportLocalMongoose) // 이게 사용자 이름 비밀번호 중복여부를 체크


module.exports = mongoose.model('User',UserSchema);