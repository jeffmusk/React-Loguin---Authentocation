import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as Routes from '../../Constantes/routes';


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
        <Nav pills>
          <NavItem>
            
              <NavLink  tag={Link} to={Routes.SIGN_IN} >Login</NavLink>
            </NavItem>
            <NavItem>
            <NavLink  tag={Link} to={Routes.LANDING} >Landing</NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={Routes.HOME}>Home</NavLink>
          </NavItem>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Adminitrar
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Cuentas</DropdownItem>

              <DropdownItem>
              <NavItem>
                <NavLink  tag={Link} to={Routes.ACCOUNT} >Mi cuenta</NavLink>
              </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem tag={Link} to={Routes.ADMIN}>Adminitrador</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          
        </Nav>
      </div>
    );
  }
}