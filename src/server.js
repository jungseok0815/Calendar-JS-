const express = require("express");
//const passport = require("passport");
const path = require("path");
const morgan = require("morgan");
const { sequelize } = require("./models/index");
//const passportConfig = require("./passport/passport");
const session = require("express-session");
const userRouter = require("./route/useRouter");
const MySQLStore = require("express-mysql-session");
const dotenv = require("dotenv");

// const cookieParser = require("cook");

dotenv.config();

const app = express();
const options = {
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "9401",
  database: "cloudcomputing",
};
const sessionStore = new MySQLStore(options);

app.use(
  session({
    secret: "jugnseok123124",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.set("port" || process.env.PORT || 3000);

app.use("/", express.static(path.join(__dirname + "../../")));
app.use(morgan("dev")); // 요청과 응답에 대한 정보를 콘솔에 기록한다.
app.use(express.json()); // 폼 데이터나 AJAX요청의 데이터를 처리하는데 사용
//app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Port 3000 is opened");
});
