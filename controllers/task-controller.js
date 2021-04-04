const Tasks = require("../models/tasks");

const getTasks=(req, res) => {
  const user = req.query.id 
  console.log(user)
  Tasks.find({ user_id: user }).
  then((tasks) => res.json(tasks)).
  catch((err) => res.status(400).json("Error: " + err))
}
  
const getTask = (req, res) => {
  const id = req.params.id;
  Tasks.findById(id)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => res.status(404).json("Task not Found"));
};

const addTask=(req, res) => {
  const title = req.body.title
  const tasks = req.body.tasks
  const labels = req.body.labels
  const type = req.body.type
  const color = req.body.color  
  const status = req.body.status  
  const user_id = req.body.user_id
  const newTask = new Tasks({ title,tasks,labels,type,color,status,user_id})
  newTask.save()
      .then(() => res.json("Task Added Successfully"))
      .catch((err) => res.status(400).json("Error: " + err))
}


const editTask=(req, res) => {
  const id = req.params.id
  Tasks.findById(id).then((task) => {
    task.title = req.body.title
    task.tasks = req.body.tasks
    task.labels = req.body.labels
    task.type = req.body.type
    task.color = req.body.color  
    task.status = req.body.status  
    task.user_id = req.body.user_id

      task.save()
          .then(() => res.json("Task Updated Successfully"))
          .catch((err) => res.status(400).json("Error: " + err))
  }).catch((err) => res.status(404).json("Task not Found"))
}

const deleteTask=(req, res) => {
  const id = req.params.id
  Tasks.findByIdAndDelete(id)
      .then(() => res.status(200).json({ message: "Task deleted successfully" }))
      .catch((err) => res.status(404).json({ message: "Task not found" }))

}

const searchResult = (req, res) => {  
  const query = req.body.query;
  const id = req.body.id;
  Tasks.find({ 
    $and:[
      {user_id:id},
      {$or:[
        {title: { $regex: query, $options: "$i" }}, 
        {tasks: {$elemMatch: {task:{$regex: query, $options: "$i"}} }},     
        {labels: { $regex: query, $options: "$i" }}
      ]}
    ]    
   }).then((data) => {
    res.status(200).send(data);
  });
};

module.exports = {getTasks, getTask,searchResult,addTask,editTask,deleteTask };
