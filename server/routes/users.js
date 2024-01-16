const express = require('express');
const router = express.Router();
const User = require('../models/user')
const catchAsync = require('../util/catchAsync')
const passport = require('passport');
const jwt = require('jsonwebtoken');

// 회원 가입
router.post('/register', catchAsync(async (req, res) => {
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
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    // Passport의 local 전략을 사용하여 로그인 시도 후 성공하면 'Success Login' 응답 전송

    // 사용자 정보 추출
    const userInfo = {
        id: req.user._id,
        username: req.user.username,
    };
    console.log(userInfo)
    // Access Token 생성
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_SECRET, { expiresIn: '5m', issuer: 'dhk9309' });

    // Refresh Token 생성
    const refreshToken = jwt.sign(userInfo, process.env.REFRESH_SECRET, { expiresIn: '1w', issuer: 'dhk9309' });

    // token 전송
    res.cookie('accessToken', accessToken, {
        secure: false, //http 와 https 의 차이를 명시 
        httpOnly: true
    })

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
    })

    res.status(200).json("login Success")

});

// 토큰 확인 (엑세스 토큰 로그인 확인)
router.get('/login/success', async (req, res) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            // 토큰이 없는 경우 처리
            return res.status(401).json({ message: 'Token not provided' });
        }

        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        if (data) {
            // data에 사용자 ID가 있다고 가정하고, 해당 ID를 사용하여 사용자를 찾음
            const userData = await User.findById(data.id); // JWT에서는 주로 sub (subject)를 사용하여 사용자를 식별하는 것이 표준적이므로 data.sub를 사용하는 것이 더 일반적 _id 보다

            if (userData) {
                // 사용자 데이터에서 비밀번호를 제외한 필요한 정보를 추출
                const { password, ...others } = userData;
                res.status(200).json(others);
            } else {
                // 해당 ID에 대한 사용자가 데이터베이스에 없는 경우 처리
                res.status(404).json({ message: 'User not found' });
            }
        }
    } catch (error) {
        // 토큰 검증 실패 또는 기타 오류 처리
        res.status(500).json(error);
    }
})

//로그아웃
router.post('/logout', (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json("Logout Success");
    } catch (error) {
        res.status(500).json(error);
    }
})




// 모듈 내보내기
module.exports = router;