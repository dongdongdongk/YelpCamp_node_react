// Passport 및 JWT 모듈을 불러옵니다.
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// User 모델을 불러옵니다. '../models/user'에서 상대 경로를 통해 모델에 접근합니다.
const User = require('../models/user');

// JWT 설정 옵션입니다.
const jwtOptions = {
  // HTTP 요청에서 JWT를 추출하는 방법을 설정합니다.
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // JWT의 서명을 확인하기 위한 시크릿 키를 설정합니다. 환경 변수를 사용하여 보안성을 강화합니다.
  secretOrKey: process.env.ACCESS_SECRET,
};

// Passport에 JWT 전략을 등록합니다.
passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  // JWT에 담긴 사용자 ID로 실제 사용자를 찾습니다.
  User.findById(payload.sub, (err, user) => {
    // 에러가 발생한 경우, done을 통해 Passport에게 에러와 함께 인증 실패를 알립니다.
    if (err) return done(err, false);

    // 사용자를 찾은 경우, done을 통해 Passport에게 사용자 정보와 함께 인증 성공을 알립니다.
    if (user) return done(null, user);

    // 사용자를 찾지 못한 경우, done을 통해 Passport에게 인증 실패를 알립니다.
    return done(null, false);
  });
}));