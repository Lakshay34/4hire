const express = require("express")
const app = express()
const path = require("path");
const userRouter = require('./routes/userRoutes')
const viewRouter = require("./routes/viewRoute");
const cookieParser = require("cookie-parser")
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true, 
    directives: { 
      'script-src': ["'self'", "https://cdnjs.cloudflare.com/"]  
    }
  }
})
);
app.use(express.json())
app.use(cookieParser( ))

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
app.use('/api/v1/users', userRouter)
app.use("/", viewRouter);

app.use(express.static(path.join(__dirname, "views")));
module.exports = app