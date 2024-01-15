const express = require('express');
const router = express.Router();
const User = require('../models/user')
const catchAsync = require('../util/catchAsync')
const passport = require('passport');

// 회원 가입
router.post('/register', catchAsync(async(req, res) => {
    try {
        // 요청 바디에서 이메일, 사용자 이름, 비밀번호 추출
        const { email, username, password } = req.body;
        
        // User 모델을 이용해 새로운 사용자 생성
        const user = new User({ email, username });
        
        // Passport의 User 모델 메소드인 register를 사용하여 사용자 등록
        const registerUser = await User.register(user, password);
        
        // 등록이 성공하면 콘솔에 등록된 사용자 정보 출력 및 성공 응답 전송
        console.log(registerUser);
        res.send('Success');
    } catch (error) {
        // 등록 실패 시 401 상태 코드와 에러 메시지 전송
        res.status(401).send('Fail', error);
    }
}))

// 로그인
router.post('/login', passport.authenticate('local'), (req, res) => {
    // Passport의 local 전략을 사용하여 로그인 시도 후 성공하면 'Success Login' 응답 전송
    res.send('Success Login');
})

// 모듈 내보내기
module.exports = router;