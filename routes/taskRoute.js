const express = require("express");
const { model } = require("mongoose");
const router = express.Router();

const taskController =require ('../controller/taskController');
const {Task} =require ('../model/taskModel');

router.get('/all',taskController.getTasks);
router.get('/:number',taskController.getOneTask);

router.post('/create',taskController.createTask);

router.delete('/:number',taskController.deleteTask);
router.put('/:number',taskController.updateTask);
router.patch('/complete/:number',taskController.completedTask);
module.exports =router ;
