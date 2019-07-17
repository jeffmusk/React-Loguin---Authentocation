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
import { withAuthentication } from '../Session/Session';
import AuthUserContext from '../Session/Context'



const App = () => (
    
  
    <BrowserRouter >   
      <Navigation  />

        
       
      <Container fluid={false}  >
        <Switch>
        <Route exact path="/" component={Landing} /> 
        <Route exact path="/login" component={Login} /> 
        <Route exact path="/Registro" component={Registro} /> 
        <Route exact path="/home" component={Home} /> 
        <Route exact path="/cuenta" component={Cuenta} /> 

        <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
              <Route exact path="/admin" component={Admin} /> 
            ) : 
              <Route exact path="/admin" component={Home} /> 
          }

        </AuthUserContext.Consumer>
          
          
          />      
        </Switch>
      </Container> 
    </BrowserRouter>  
);

const Loanding = () => (
  <h1>Cargando </h1>
) 


export default withAuthentication(App);
