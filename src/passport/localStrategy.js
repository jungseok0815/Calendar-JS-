const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require("../models/userModel");
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        // 프론트에서 req.body에 넣어주는 정보. 객체 key 값을 정확히 적어줘야한다.
        usernameField: "email", // req.body = { userId: 'abcd', passport: 'xxx' }
        passwordField: "pw",
      },
      async (email, pw, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            // student에 유저가 있는지 확인 후 유저가 없다면
          }
          const result = await bcrypt.compare(pw, user.pw);
          if (result) {
            // 유저가 있다면 비밀번호 확인 후 done 두 번째 인자로 유저 정보 넘김
            console.log("로그인 되었습니다..");
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀립니다." }); // 비밀번호 틀렸을 때
        } catch (e) {
          console.error(e);
          return done(e); // 서버 에러가 있는 경우 done 첫 번째 인자로 error 정보 넘김
        }
      }
    )
  );
};
