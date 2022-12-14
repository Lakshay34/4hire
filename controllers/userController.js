const User = require('./../models/userModel')
const Task = require('./../models/taskModel')
const AppError = require('./../utils/appError')
const sharp = require('sharp');
const multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'views/img/userImg/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});
// const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype=='application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Not the corrrect format! Please upload only images or pdf.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserfile = upload.fields([{name:"photo"}, {name:"cv"}]);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.updateMe = async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email', 'language','skills', 'description', 'address');
    if (req.body.photo !== 'undefined' || req.body.cv !== "undefined"){
      filteredBody.photo = req.files['photo'][0].filename
      filteredBody.cv = req.files['cv'][0].filename
    }
    if (req.body.name == "" || req.body.email == "") {
      return next(
        new AppError(
          'Enter your credentials',
          400
        )
      );
    }
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  };
  
  exports.deleteMe = async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'success',
      data: null
    });
  };
  

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.createUser = async (req, res) => {
    try {
        const users = await User.create(req.body);
        // console.log(req.body.name);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.getUser = async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.updateUser = async (req, res) => {
    try {
        const users = await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        res.json({data: users, status: 'Success'});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}