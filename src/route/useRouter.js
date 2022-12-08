const express = require("express");
const user = require("../controller/userController");

const userRouter = express.Router(); //라우터 생성

userRouter.get("/", user.home);
userRouter.get("/calendar", user.claendar);
userRouter.route("/join").post(user.postJoin);
userRouter.route("/login").post(user.postLogin);

module.exports = userRouter;
