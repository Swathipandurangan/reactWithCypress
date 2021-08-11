import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Dashboard from './Components/dashboard/Dashboard';
import ReadNow from './Components/readNow/ReadNow';
import Login from './Components/login/Login';
import Register from './Components/register/Register';

class App extends React.Component {
  render(){
    return <div>
      <Container>
        <Row>
        </Row>
        <Router>
          <Route exact path = "/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/readNow" component={ReadNow} />
        </Router>        
      </Container>
    </div>
  }  
}

export default App;
 