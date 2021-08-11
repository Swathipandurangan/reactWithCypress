import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormErrors } from './formErrors';
import { authenticateUser } from '../../services/fetchNews.service';
import './login.css';

class Login extends React.Component{
    constructor(){
        super();
        this.state = {
            username : '',
            password:'',
            formErrors:{username:'',password : ''},
            usernameValid:false,
            passwordValid:false,
            formValid:false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.validateField = this.validateField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }
    handleUserInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]:value},() => {
            this.validateField(name,value)
        })
    }
    validateField(fieldName,value){
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        switch(fieldName){
            case 'username':
            if (value && value.length > 0) {
                usernameValid = value.length >= 3;
                fieldValidationErrors.username = usernameValid ? '' : 'is invalid';
            } else {
                fieldValidationErrors.username = '';
            } 
            break;
            case 'password':
            if (value && value.length > 0) {
                passwordValid = value.length>=6;
                fieldValidationErrors.password = passwordValid ? '' : 'is too short';
            } else {
                fieldValidationErrors.password = '';
            }                
            break;
            default:
            break;
        }
        this.setState({ formErrors:fieldValidationErrors,
                        usernameValid:usernameValid,
                    passwordValid:passwordValid }, this.validateForm);
    }
    validateForm(){
        this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
    }
    errorClass(error){
        return(error.length === 0?'':'has-error');
    }
    handleSubmit(e) {
        e.preventDefault();
        const { formValid, username, password, formErrors } = this.state;
        let fieldValidationErrors = formErrors;
        if (formValid) {
            authenticateUser(username, password)
            .then(res => {
                this.props.history.push('/dashboard', {userName: username, tokenResponse: res});
            })
            .catch(error => {
                console.log('Error in authenticating User:: ', error);
                fieldValidationErrors.username = 'and/or PASSWORD is not authorized.';
                this.setState({ formErrors: fieldValidationErrors });
                return;
            });            
        } 
    }
    handleRegistration() {
        this.props.history.push("/register");
    }
    render(){
        return <div className="formContainer">
            <Form className="loginForm" onSubmit={e => this.handleSubmit(e)}>
                <FormErrors formErrors = {this.state.formErrors} data-type="formError" />
                <Form.Group>
                    <Form.Label className="formLabel">User Name</Form.Label>
                    <Form.Control type="username"
                    data-type="userName"
                    required
                    value = {this.state.username} 
                    placeholder="Enter UserName" 
                    name = "username"
                    onChange = {this.handleUserInput}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label className="formLabel">Password</Form.Label>
                    <Form.Control 
                    data-type="password"
                    type="password"
                    required
                    value = {this.state.password} 
                    placeholder="Enter Password" 
                    name = "password" 
                    onChange = {this.handleUserInput}/>
                </Form.Group>
                <div>
                    <h6 className="registerTxt">{'New User ? Kindly '}</h6>
                    <Button variant="primary" data-type="registerButton" type="button" className="btn-secondary" onClick={this.handleRegistration}>
                        Register
                    </Button>
                </div>
                <Button variant="primary" data-type="submitButton" type="submit" className="btn btn-primary btn-lg btn-block submitBtn">
                    Submit
                </Button>
            </Form>
        </div>
    }
}
export default Login;

