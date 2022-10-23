const express = require("express")
const app = express()
const path = require("path");
const userRouter = require('./routes/userRoutes')
const viewRouter = require("./routes/viewRoute");
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser( ))
app.use('/api/v1/users', userRouter)
app.use("/", viewRouter);

app.use(express.static(path.join(__dirname, "views")));
module.exports = app