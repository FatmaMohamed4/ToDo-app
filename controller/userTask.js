const User = require ('../model/userModel');
const Task = require ('../model/taskModel');

class userTask {
    static userTasks = async(req,res)=>{
// Find a task and populate its associated user
Task.findById(number)
    .populate('user') // Populate the 'user' field
    .exec((err, task) => {
        if (err) {
            console.error('Error finding task:', err);
            // Handle error
        } else {
            console.log('Task:', task);
            // Do something with the populated task
        }
    });
}
}

module.exports =userTask ;
