const Task = require('./../models/taskModel')
const AppError = require('./../utils/appError')

exports.applyforTask = async (req, res, next) => {
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id);
        const currentuser = req.user.id
        res.json({data: data, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
  }

exports.updateTask = async (req, res, next) => {
     
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'title', 'description', 'dueDate');
  
    // 3) Update user document
    const updatedTask = await Task.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedTask
      }
    });
  };
  
  exports.deleteTask = async (req, res, next) => {
    await Task.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  };
  

exports.getAllTask = async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({data: tasks, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.createTask = async (req, res) => {
    try {
        const tasks = await Task.create(req.body);
        console.log(req.body.name);
        res.json({data: tasks, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getTask = async (req, res) => {
    try {
        const tasks = await Task.findById(req.params.id);
        res.json({data: tasks, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}


exports.updateTask = async (req, res) => {
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id);
        res.json({data: tasks, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id);
        res.json({data: tasks, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}