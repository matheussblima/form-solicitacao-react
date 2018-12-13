import React, { Component } from 'react';
import { Container, Navbar } from 'reactstrap';



class Home extends Component {
    render() {
        return(
            <div>
                <Navbar  color="light" light expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                </Navbar>
            </div>
        );
    }
}

export default Home;