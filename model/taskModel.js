const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {type :String, required :true} ,
  number: {type :Number},
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
}
} ,
{ validateBeforeSave: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
