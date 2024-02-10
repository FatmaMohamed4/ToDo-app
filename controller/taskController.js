const connectDB = require('../connectDB');
const {Task} =require ('../model/taskModel');
const mongoose = require('mongoose');

class taskController{
  static getTasks =async (req, res) => {
    try {
      const db = await connectDB();
      const collection = db.collection('task');
      const tasks = await collection.find().toArray();
      console.log(tasks);
      res.json(tasks);
    } catch (error) {
      console.error('Error reading tasks:', error);
      res.status(500).send('Internal Server Error');
    }
    }

  static  getOneTask =async (req, res) => {
    try {
            const db = await connectDB();
            const collection = db.collection('task');
            const number = +req.params.number;
            const task = await collection.findOne({ number: number });
        
            if (task) {
              res.header('Content-Type', 'application/json');
              res.send(JSON.stringify(task, null, 2));
            } else {
              res.status(404).send('task not found');
            }
          } catch (error) {
            console.error('Error reading task by number:', error);
            res.status(500).send('Internal Server Error');
          }
    }

    static createTask = async (req, res) => {
     try {
    const db = await connectDB();
    const collection = db.collection('task');
    const newTask = req.body;
      const existTask = await collection.findOne({ number: newTask.number });

      if (existTask) {
          res.send(`Task with  number ${newTask.number} already exists.`);
      } else {
        const newTask = {
          title: req.body.title,
          number: req.body.number,
          completed: { type: Boolean, default: false }
        };

        const result = await collection.insertOne(newTask);
    if (result){
      res.send('created');
    } else {
      res.send('failed');
    }
    console.log(result);
    
  } 
}catch (error) {
    console.error('Error creating new Task:', error);
    res.status(500).send('Internal Server Error');
  }
    }


 // شغالة تمااامممممممممممم
    static deleteTask = async (req, res) => {
      try{
      const db = await connectDB();
      const collection = db.collection('task');

      const number = +req.params.number;
      const result = await collection.findOne({ number: number });
      const deleteResult = await collection.deleteOne(result);
      res.json({ message: "Task Deleted" })
      }catch{
        res.json({ message: "Internal server error" })
      }
    }  


    static updateTask = async (req, res) => {
      try {
          const db = await connectDB();
          const collection = db.collection('task');
          const number = parseInt(req.params.number);
          const data = req.body;
  
          // Check if the task with the given number exists
          const existTask = await collection.findOne({ number: number });
  
          if (existTask) {
              // Update the task
              const result = await collection.findOneAndUpdate(
                  { number: number }, // Filter for finding the task
                  { $set: data }, // Data to update
                  { returnOriginal: false } // To return the updated document
              );
  
              if (result) {
                  res.status(200).send(`Task with number ${number} updated successfully`);
              } else {
                  res.status(500).send('Failed to update task');
              }
          } else {
              res.status(404).send('Task not found');
          }
      } catch (error) {
          console.error('Error updating task by number:', error);
          res.status(500).send('Internal Server Error');
      }
  }

  static completedTask = async (req, res) => {
    try {
        const db = await connectDB();
        const collection = db.collection('task');
        const number = parseInt(req.params.number);

        // Find the task by its number
        const existingTask = await collection.findOne({ number: number });

        // If the task exists, update its completed field to true
        if (existingTask) {
            const result = await collection.updateOne(
                { number: number }, // Filter for finding the task
                { $set: { completed: true } } // Update the completed field to true
            );

            if (result) {
                console.log(`Task with number ${number} updated successfully.`);
                res.send(`Task with number ${number} updated successfully.`);
            } else {
                console.log(`Task with number ${number} was not updated.`);
                res.status(500).send('Failed to update task');
            }
        } else {
            console.log(`Task with number ${number} not found.`);
            res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error updating task by number:', error);
        res.status(500).send('Internal Server Error');
    }
}


}


module.exports = taskController ;