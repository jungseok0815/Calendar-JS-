const passport = require("passport");
const local = require("./localStrategy");
const user = require("../models/userModel");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // router의 req.login 요청이 들어오면 실행된다.
    // 역할: 서버 메모리를 아끼기 위해 많은 사용자 정보 중에서 필요한 부분만 메모리에 저장하도록함. (여기에서는 id)
    // 서버쪽에 [{ id: 3, cookie: 'asvxzc' }] 저장, cookie는 프론트로 보냄
    return done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    user.findOne({ where: { email } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local();
};
