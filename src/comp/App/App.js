import React, { Component } from 'react';
import {BrowserRouter , Route , Switch } from 'react-router-dom';
import Home from '../Home/Home';
import {  Container } from 'reactstrap';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Cuenta from '../Cuenta/Cuenta';
import Admin from '../Admin/Admin';
import Landing from '../Landing/Landing';
import Registro from '../Registro/Registro';
import { withFirebase } from '../Firebase';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount(){
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
        <BrowserRouter >  
      
      <Navigation authUser={this.state.authUser} />

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
}



export default withFirebase(App);
