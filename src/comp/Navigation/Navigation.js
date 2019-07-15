import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Routes from '../../Constantes/routes';
import CerrarSesion from '../CerraSesion/CerrarSesion';


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Nav  className="navbar navbar-expand-lg navbar-dark bg-dark">
          
          <NavItem className="navbar-nav ">
            <NavLink  tag={Link} to={Routes.LANDING} >Landing</NavLink>
          </NavItem>

          <NavItem className="navbar-nav ">
            <NavLink tag={Link} to={Routes.HOME}>Home</NavLink>
          </NavItem>
          
          <Dropdown nav  className="mr-auto" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle  caret>
              Adminitrar
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem header>Cuentas</DropdownItem>
              <DropdownItem>
                <NavItem>
                  <NavLink className="navbar-nav "  tag={Link} to={Routes.ACCOUNT} >Mi cuenta</NavLink>
                </NavItem>
              </DropdownItem>
            <DropdownItem divider />
              <DropdownItem tag={Link} to={Routes.ADMIN}>Adminitrador</DropdownItem>
              <DropdownItem divider />
              <CerrarSesion/> 
            </DropdownMenu>

          </Dropdown>
          <NavItem className="navbar-nav  ">       
              <NavLink  tag={Link} to={Routes.SIGN_IN} >Login</NavLink>
          </NavItem>
          <NavItem  nav className="navbar-nav ">
            <NavLink tag={Link} to={Routes.SIGN_UP}>Registro</NavLink>
          </NavItem>
          
          
        </Nav>
      </div>
    );
  }
}