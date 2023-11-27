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

function Comp(props){
	const[actItem,setActItem]=useState(props.actItem)
	const handle=(e)=>{
		let{name,value}=e.target
		if(e.target.type==="checkbox"){
			value=e.target.checked
		}
		setActItem({...actItem, [name]:value})
	}
	
	return(
		<Modal isOpen={true} toggle={props.toggle}>
			<ModalHeader toggle={props.toggle}>Task Item</ModalHeader>
			<ModalBody>
				<Form>		
					<FormGroup>
						<Label for="title">Title</Label>
						<Input
						type="text"
						name="title"
						value={actItem.title}
						onChange={handle}
						placeholder="Enter Task Title"
						/>
					</FormGroup>
					<FormGroup>
						<Label for="description">Description</Label>
						<Input
						type="text"
						name="description"
						value={actItem.description}
						onChange={handle}
						placeholder="Enter Task Description"
						/>
					</FormGroup>
					<FormGroup check>
						<Label for="completed">Completed</Label>
						<Input
						type="checkbox"
						name="completed"
						checked={actItem.completed}
						onChange={handle}
						/>						
					</FormGroup>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button color="success" onClick={() => props.onSave(actItem)}>Save</Button>
			</ModalFooter>
		</Modal>
	)
}

export default Comp