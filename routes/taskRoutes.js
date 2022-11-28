const express = require('express')
const taskController = require('./../controllers/taskController')
const authController = require('./../controllers/authController')
const { route } = require('./viewRoute')
const router = express.Router()

router.patch('/updateTask', authController.isLoggedIn, taskController.updateUserTask);
router.delete('/deleteTask', authController.isLoggedIn, taskController.deleteUserTask);
router.patch('/applyforTask', authController.isLoggedIn, taskController.applyforTask);
router.patch('/acceptUser', authController.isLoggedIn, taskController.acceptUser);

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