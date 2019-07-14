import React from 'react';
import {BrowserRouter , Route , Switch, Redirect } from 'react-router-dom';
import Home from './comp/Vistas/Home/Home';
import {  Container } from 'reactstrap';



function App() {
  return (
    <BrowserRouter >  
           

      <Container fluid={false}  >
        <Switch>
          
        <Route exact path="/" component={Home} /> 
          
          
          />      
        </Switch>
      </Container>
    </BrowserRouter>  
  );
}

export default App;
