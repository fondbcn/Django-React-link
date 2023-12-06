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

function Comp3(props){
	const [user, setUser] = useState(props.user);
	const handle = (e) => {
		let{name,value}=e.target
		if(e.target.type==="checkbox"){
			value=e.target.checked
		}
			setUser((prevUser) => ({ ...prevUser, [name]: value }));
	};
	
	return(
		<Modal isOpen={true} toggle={props.toggle}>
			<ModalHeader toggle={props.toggle}>Log In</ModalHeader>
			<ModalBody>
				<Form>		
					<FormGroup>
						<Label for="username">Username</Label>
						<Input
						type="text"
						name="username"
						value={user.username}
						onChange={handle}
						placeholder=""
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password1">Password</Label>
						<Input
						type="password"
						name="password1"
						value={user.password1}
						onChange={handle}
						placeholder=""
						/>
					</FormGroup>
					<FormGroup check>
						<Label for="stay">Stay connected</Label>
						<Input
						type="checkbox"
						name="sesch"
						checked={user.sesch}
						onChange={handle}
						/>						
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={() => props.onLog(user)}>Connect</Button>
			</ModalFooter>
		</Modal>
	)
}

export default Comp3