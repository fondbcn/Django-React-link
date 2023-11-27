import React,{ useState,useEffect,useRef,useHistory,useMemo } from 'react'
import Comp from './comp'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


function App() {
  const[state,setState]=useState({
      modal:false,
      viewCompleted:false,
      actItem:{
          title:"",
          description:"",
          completed:false,
      },
      todoList:[],
      showDescId:null,
  })
  
  const toggle=()=>{
      setState(pstate=>({...pstate,modal:!pstate.modal}))
  }
  
  const refresh=()=>{
      axios.get("http://localhost:8000/tasks/")
        .then(res=>setState(pstate=>({...pstate,todoList:res.data})))
        .catch(err=>console.log(err))
  }

  const createItem=()=>{
      const itm={title:"",description:"",completed:false,}
      setState(pstate=>({...pstate, actItem:itm, modal:!pstate.modal}))
  }
  
  const handleSub=(itm)=>{
      toggle()
      if(itm.id){
          axios.put(`http://localhost:8000/tasks/${itm.id}/`,itm)
            .then(res=>refresh())
          return
      }
      axios.post("http://localhost:8000/tasks/",itm)
        .then(res=>refresh())
  }

  const handleDel=(itm)=>{
      axios.delete(`http://localhost:8000/tasks/${itm.id}/`)
        .then(res=>refresh())
  }
  
  const editItem=(itm) => {
    setState(pstate=>({...pstate,actItem:itm, modal:!pstate.modal }));
  };
  
  useEffect(()=>{
    refresh()
    console.log("this is shit")
  },[])
  
  const tabGen=()=>{
      return(
        <div className="my-5 tab-list">
          <span className={state.viewCompleted ? "active" : ""} onClick={()=>setState(pstate=>({...pstate,viewCompleted:true}))}>Completed</span>
          <span className={state.viewCompleted ? "" : "active"} onClick={()=>setState(pstate=>({...pstate,viewCompleted:false}))}>Incompleted</span>
        </div>
      )
  }
  
  const handleDesc = (itemId) => {
      setState(prev => ({
          ...prev,
          showDescId: prev.showDescId !== itemId ? itemId : null,
      }));
  };
  
  const items=()=>{
      if(document.readyState === "complete"){
        const newItems=state.todoList.filter(actItem => actItem.completed===state.viewCompleted)
        return newItems.map(itm=>(
            <li key={itm.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column text-start sz">  
                <span className={`todo-title mr-2 ${state.viewCompleted ? "completed-todo" : ""}`} title={itm.title} onClick={()=>handleDesc(itm.id)}>{itm.title}</span>
                <span>{state.showDescId===itm.id ? itm.description : ""}</span>
              </div>
              <span>
                <button className="btn btn-info me-1" onClick={()=>editItem(itm)}>Edit</button>
                <button className="btn btn-danger ms-1" onClick={()=>handleDel(itm)}>Delete</button>
              </span>
            </li>
        ))
      }
  }
  
  return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
              <button onClick={createItem} className="btn btn-primary">
                  Add task
              </button>
              </div>
              {tabGen()}
              <ul className="list-group list-group-flush">
                {items()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-5 mb-2 bg-info pz">Chekla 2023 &copy;</footer>
        {state.modal ? (
          <Comp
            actItem={state.actItem}
            toggle={toggle}
            onSave={handleSub}
          />
        ) : null}
      </main>
  )
}

export default App
