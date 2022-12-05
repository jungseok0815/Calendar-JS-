const path = require("path");
const user = require("../models/userModel");
const passport = require("passport");

module.exports.home = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/main.html"));
};
module.exports.postJoin = async (req, res) => {
  const { email, pw, name } = req.body;
  if (email || pw || name === null) {
    console.log("아이디와 비밀번호를 입력해주세요");
    return res.redirect("/");
  } else {
    try {
      await user.create({
        //db 모델에 맞는 데이터 생성
        name,
        email,
        pw,
      });

      console.log("회원가입 완료");
      return res.redirect("/");
    } catch (err) {
      //err 확인 코드
      console.log(err);
    }
  }
};

module.exports.postLogin = async (req, res, next) => {
  const { email, pw } = req.body;
  console.log(email, pw);
  try {
    const userEmail = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!userEmail) {
      console.log("이메일이 잘못되었습니다.");
    } else {
      const userpw = await user.findOne({
        where: {
          pw: pw,
        },
      });
      if (!userpw) {
        console.log("비밀번호가 잘못되었습니다.");
      } else {
        console.log("로그인 성공");
        return res.redirect("/calendar");
      }
    }
    console.log("email이 존재합니다.");
    return res.json(userEmail);
  } catch (err) {
    console.log(err);
  }
};
