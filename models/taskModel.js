const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter title'],
    },

    description: {
        type: String,
        required: [true, 'Enter description']
    }, 

    postDate: {
        type: String
    },

    dueDate: {
        type: String
    },

    report: {
        type: Number,
        minimum: 0,
        maximum: 3,
    },

    applied:{
        type: String,
        enum:[]
    },

    postedBy:{
        type:String,
    }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task