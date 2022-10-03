const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const app = require('./app')

const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD
)

mongoose.connect(DB).then((con) => {
    // console.log(con.connections)
    console.log('DB connection successful')
}).catch(error => console.log(error));


app.listen(4001, () => {
    console.log(`App running on port 4001`)
})