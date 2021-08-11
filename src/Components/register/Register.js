import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../login/login.css';

class Register extends React.Component{
    render(){
        return <div className="formContainer">
            <Form className = 'loginForm'>
                <Form.Group>
                    <Form.Label className="formLabel">User Name</Form.Label>
                    <Form.Control type="username"
                    required
                    placeholder="Enter UserName" 
                    name = "username" />
                </Form.Group>
                <Form.Group >
                    <Form.Label className="formLabel">Password</Form.Label>
                    <Form.Control 
                    type="password"
                    required
                    placeholder="Enter Password" 
                    name = "password" />
                </Form.Group>
                <Form.Group >
                    <Form.Label className="formLabel">ReEnter Password</Form.Label>
                    <Form.Control 
                    type="password"
                    required
                    placeholder="ReEnter Password" 
                    name = "reenterPassword" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {'Register'}
                </Button>
            </Form>
        </div>;
    }
}

export default Register;

