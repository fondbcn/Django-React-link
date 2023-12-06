import React,{ useState,useEffect,useRef,useHistory,useMemo,useCallback } from 'react'
import Comp1 from './comp1'
import Comp2 from './comp2'
import Comp3 from './comp3'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


function App() {
  
  const accessToken = localStorage.getItem('jwt');
  
  const disp = localStorage.getItem('disp');
  
  const admin = JSON.parse(localStorage.getItem('is_admin'));
  
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
      loged:accessToken,
      trig:false
  })
  
  const[user,setUser]=useState({
      username:"",
      email:"",
      password1:"",
      password2:"",
      tog:null,
      sesch:false,
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
  
  const handleSignUp=(user)=>{
      toggle()
      axios.post('http://localhost:8000/register/',{registration: true,...user})
        .then(r=>alert("Success registration"))
        .catch(e=>alert("Error in registration"))
  }
  
  const handleLogIn=(user)=>{
      toggle()
      axios.post('http://localhost:8000/login/',{...user})
        .then(res=>{
            setState(prev=>({...prev,loged:accessToken}))
            alert("Success log in")
            localStorage.setItem('jwt', res.data.jwt);
        })
        .then(i=>conso())
        .catch(e=>alert("Error to log in"))
  }
  
  const conso = () => {
    const acc = localStorage.getItem('jwt');
    axios.get('http://localhost:8000/user/', {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${acc}`
        }
    })
    .then(res => {
        const sessionLength = res.data.exp
        const adm=res.data.is_adm
        const expirationTime = new Date(new Date().getTime() + sessionLength * 60 * 1000);
        localStorage.setItem('disp', res.data.user.username);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('is_admin', adm);
        setState(prv=>({...prv,trig:!prv.trig}))
    })
    .catch(e => {
        alert("Error");
        localStorage.removeItem('expirationTime');
    });
  }; 

  function checkSessionExpiration() {
    const storedExpirationTime = localStorage.getItem('expirationTime');
    if (storedExpirationTime && new Date() > new Date(storedExpirationTime)) {
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('jwt');
      localStorage.removeItem('disp');
      localStorage.removeItem('is_admin');
      alert("Session expired. Please log in again.");
    }
  }
  
  const handleLogOut=()=>{
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('jwt');
      localStorage.removeItem('disp');
      localStorage.removeItem('is_admin');
      setState(prev=>({...prev,loged:null}))
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
    checkSessionExpiration()
  },[accessToken])
  
  
  const tabGen=()=>{
      return(
        <div className="my-5 tab-list">
          <span className={state.viewCompleted ? "active" : ""} onClick={()=>setState(pstate=>({...pstate,viewCompleted:true}))}>Completed</span>
          <span className={state.viewCompleted ? "" : "active"} onClick={()=>setState(pstate=>({...pstate,viewCompleted:false}))}>Incompleted</span>
        </div>
      )
  }
  
  const handleDesc = useCallback((itemId) => {
    setState((prv) => ({...prv,showDescId: prv.showDescId !== itemId ? itemId : null,}));
  }, [setState]);
  
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
                {admin ? (<button className="btn btn-danger ms-1" onClick={()=>handleDel(itm)}>Delete</button>) : null}
              </span>
            </li>
        ))
      }
  }
  
  return (
      <>
      <nav className="d-flex justify-content-start">
      {!accessToken ? (<>
        <button className="mt-2 ms-2 mb-1" onClick={()=>{setUser(prv=>({...prv,tog:1}));toggle();}}>Register</button>
        <button className="mt-2 ms-2 mb-1" onClick={()=>{setUser(prv=>({...prv,tog:2}));toggle();}}>Log In</button>
        </>) : null}
      {accessToken ? (<>
        <button className="mt-2 ms-2 mb-1" onClick={()=>handleLogOut()}>Sign Out</button>
      </>) : null} 
      </nav>      
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-black text-uppercase text-center my-4">Task Manager</h1>
        <h4 className="text-black text-uppercase text-center my-4">{disp ? `Welcome ${disp}` : null}</h4>
        {accessToken ? (<div className="row ">
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
        </div>) : null}
        <footer className="my-5 mb-2 p-1 bg-info pz">Chekla 2023 &copy;</footer>
        {state.modal && accessToken ? (
          <Comp1
            actItem={state.actItem}
            toggle={toggle}
            onSave={handleSub}
          />
        ) : null}
        {state.modal && user.tog===1 && !accessToken ? (
          <Comp2
            user={user}
            toggle={toggle}
            onSign={handleSignUp}
          />
        ) : null}
        {state.modal && user.tog===2 && !accessToken ? (
          <Comp3
            user={user}
            toggle={toggle}
            onLog={handleLogIn}
          />
        ) : null}
      </main>
      </>
  )
}

export default App
