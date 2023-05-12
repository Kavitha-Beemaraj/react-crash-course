import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Tasks from "./components/Tasks";
import {useState} from 'react'
import AddTask from "./components/AddTask";
import About from "./components/About";


function App() {
  const [showAddTask, setshowAddTask]= useState(false)
  const [tasks, setTasks] = useState([
    {
      id:1,
      text: "do homework",
      day:"monday",
      remainder:true
  },
  {
      id:2,
      text: "meeting at school",
      day:"wedesday",
      remainder:true
  },
  {
    id:3,
    text: "food shopping",
    day:"friday",
    remainder:false
  }
    
  ]
  )

  /*useEffect(()=>{
    const fetchTasks= async()=>{
      const res= await fetch('http://localhost:5000/tasks')
    }
  })*/

//add task
const addTask=(task)=>{
  
  const id=Math.floor(Math.random() *10000) + 1

  const newTask={ id, ...task}
  setTasks([...tasks, newTask])
}

// task delete
const deleteTask=(id) => {
  setTasks(tasks.filter((task)=>task.id !==id))
}

//toogle reminder
const toggleReminder=(id)=>{
  setTasks(tasks.map((task)=> task.id=== id
  ? { ...task, reminder:!task.remainder} : task ))
}

  return (
    <Router>
    <div className="Container">
      <Header onAdd={()=>
        setshowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0?
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      :'no tasks to show'}
      <Routes>
      <Route path="/about" component={About}/>
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
