import React,{ useState,useEffect,useRef,useHistory,useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const tasks=[
  {id:1,
  title:"one",
  description:"nothing task",
  completed:true},
  {id:2,
  title:"two",
  description:"first-sec task",
  completed:true},
  {id:3,
  title:"three",
  description:"future task",
  completed:false},
]

function App() {
  const[viewCompleted,setViewCompleted]=useState(false)
  const[taskList,setTaskList]=useState(tasks)
  let tabGen=()=>{
      return(
        <div className="my-5 tab-list">
          <span className={viewCompleted ? "active" : ""} onClick={()=>setViewCompleted(true)}>Completed</span>
          <span className={viewCompleted ? "" : "active"} onClick={()=>setViewCompleted(false)}>Incompleted</span>
        </div>
      )
  }
  let items=()=>{
      const newItems=taskList.filter(item => item.copmleted==viewCompleted)
      
  }
  
  return (
      <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row ">
          
      </main>
  )
}

export default App
