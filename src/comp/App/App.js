import React from 'react';
import {BrowserRouter , Route , Switch } from 'react-router-dom';
import Home from '../Home/Home';
import {  Container } from 'reactstrap';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Cuenta from '../Cuenta/Cuenta';
import Admin from '../Admin/Admin';
import Landing from '../Landing/Landing';
import Registro from '../Registro/Registro';




function App() {
  return (
    <BrowserRouter >  
      
      <Navigation />

      <Container fluid={false}  >
        <Switch>
          
        <Route exact path="/" component={Landing} /> 
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/Registro" component={Registro} /> 
        <Route exact path="/home" component={Home} /> 
        <Route exact path="/cuenta" component={Cuenta} /> 
        <Route exact path="/admin" component={Admin} /> 
          
          
          />      
        </Switch>
      </Container>
    </BrowserRouter>  
  );
}

export default App;
