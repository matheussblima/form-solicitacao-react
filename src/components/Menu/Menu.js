import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavLink, NavItem, Collapse } from 'reactstrap';
import images from '../../config/images';
import styles from './Menu.module.css';


class Menu extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return(
            <div>
                <Navbar className={styles.navbarContainer} light expand="md">
                    <NavbarBrand href="/"><img className={styles.imageLogo} alt="logo" src={images.logo}/></NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/configuracoes/">Configurações</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Menu;