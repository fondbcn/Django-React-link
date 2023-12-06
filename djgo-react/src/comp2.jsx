import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

function Comp2(props){
	const[user,setUser]=useState(props.user)
	const [checked, setChecked] = useState(false);
	const handle=(e)=>{
		let{name,value}=e.target
		setUser(puser=>({...puser, [name]:value}))
	}
	
	return(
		<Modal isOpen={true} toggle={props.toggle}>
			<ModalHeader toggle={props.toggle}>Registration</ModalHeader>
			<ModalBody>
				<Form>		
					<FormGroup>
						<Label for="username">Username</Label>
						<Input
						type="text"
						name="username"
						value={user.username}
						onChange={handle}
						placeholder="Name for login"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
						type="email"
						name="email"
						value={user.email}
						onChange={handle}
						placeholder="ex. abc123@gmlook.co"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password1">Password</Label>
						<Input
						type="password"
						name="password1"
						value={user.password1}
						onChange={handle}
						placeholder="6 char at least!"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password2">Confirm password</Label>
						<Input
						type="password"
						name="password2"
						value={user.password2}
						onChange={handle}
						placeholder="Repeat password"
						/>
					</FormGroup>
					<FormGroup check>
						<Label for="terms">Accept Terms & Conditions</Label>
						<Input
						type="checkbox"
						name="terms"
						checked={checked}
						onChange={(e)=>setChecked(e.target.checked)}
						/>
						<a href="#">terms & conds</a>
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" disabled={!checked} onClick={() => props.onSign(user)}>Register</Button>
			</ModalFooter>
		</Modal>
	)
}

export default Comp2