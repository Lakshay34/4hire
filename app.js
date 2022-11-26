const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const viewRouter = require("./routes/viewRoute");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require('cors')
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const moment = require("moment");

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "script-src": ["'self'", "'unsafe-inline'", "example.com"],
//       },
//     },
//   })
// );
// app.use(helmet.contentSecurityPolicy())
app.set("view engine", "ejs");

// app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use((req, res, next)=>{
  res.locals.moment = moment;
  next();
});

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// Data sanitization
app.use(mongoSanitize());
app.use(xss());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/", viewRouter);

app.use(express.static(path.join(__dirname, "views")));
module.exports = app;
