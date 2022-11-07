const express = require('express')
const taskController = require('./../controllers/taskController')
const authController = require('./../controllers/authController')
const { route } = require('./viewRoute')
const router = express.Router()

router.patch('/updateTask', authController.protect, taskController.updateTask);
router.delete('/deleteTask', authController.protect, taskController.deleteTask);

// router.use(authController.restrictTo('admin'));
router
    .route('/')
    .get(taskController.getAllTask)
    .post(taskController.createTask)

router
    .route('/:id')
    .get(taskController.getTask)
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask)

module.exports = router