import {useEffect} from 'react';
import { 
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
	Outlet,
	useOutletContext,
} from 'react-router-dom';

function TermsAndConds() {
  return (
	<>
		<h1>Router education page for terms and conds</h1><br/>
		<Link to="/terms-conds/terms">Terms</Link>
		<br/>
		<Link to="/terms-conds/conds">Conds</Link>
	</>
  )
}

function Terms() {
  return <h2>some terms like a shit ...</h2>
}

function Conds() {
  return( 
		<ul>
			<Link to="/terms-conds/conds/1">cond 1</Link><br/>
			<Link to="/terms-conds/conds/2">cond 2</Link><br/>
			<Link to="/terms-conds/conds/3">cond 3</Link><br/>
			<Outlet context={{variable:"var",constant:"const"}}/>
		</ul>
	)
}

function Cond() {
  const {id}=useParams()
  const obj=useOutletContext()
  return( 
		<>	
			<h5>cond {id}</h5><br/>
			<p>description for cond no {id} : {id==="3" ? obj.variable : obj.constant}</p>
		</>
	)
}

export {TermsAndConds, Terms, Conds, Cond };