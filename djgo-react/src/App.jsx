import React,{ useState,useEffect,useRef,useHistory,useMemo } from 'react'
import Comp from './comp'
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
  const[state,setState]=useState({
      modal:false,
      viewCompleted:false,
      taskList:tasks,
      actItem:{
          title:"",
          description:"",
          completed:false,
      },
  })
  let toggle=()=>{
      setState({...state,modal:!state.modal})
  }
  
  let tabGen=()=>{
      return(
        <div className="my-5 tab-list">
          <span className={state.viewCompleted ? "active" : ""} onClick={()=>setState({...state,viewCompleted:true})}>Completed</span>
          <span className={state.viewCompleted ? "" : "active"} onClick={()=>setState({...state,viewCompleted:false})}>Incompleted</span>
        </div>
      )
  }
  let items=()=>{
      const newItems=state.taskList.filter(actItem => actItem.completed==state.viewCompleted)
      return newItems.map((itm)=>(
          <li key={itm.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className={`todo-title mr-2 ${state.viewCompleted ? "completed-todo" : ""}`} title={itm.title}>{itm.title}</span>
            <span>
              <button className="btn btn-info me-1">Edit</button>
              <button className="btn btn-danger ms-1">Delete</button>
            </span>
          </li>
      ))
  }
  
  return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
              {/*<button onClick={this.createItem} className="btn btn-primary">
                  Add task
              </button>*/}
              </div>
              {tabGen()}
              <ul className="list-group list-group-flush">
                {items()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-5 mb-2 bg-info">Chekla 2023 &copy;</footer>
        {state.modal ? (
          <Modal
            actItem={state.actItem}
            toggle={toggle}
            onSave={()=>toggle()}
          />
        ) : null}
      </main>
  )
}

export default App
