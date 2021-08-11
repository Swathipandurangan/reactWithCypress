import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NewsModal from '../filter/Filter';

class Header extends React.Component {
    render() {
        let userName = '';
        if (this.props && this.props.location && this.props.location.state) {
            userName = this.props.location.state.userName;
        } else if (sessionStorage.getItem('userName')) {
            userName = sessionStorage.getItem('userName');
        }
        return <>
            <Navbar bg="dark" variant="dark" fixed="top" data-navbar="navbar" className="navBar">
                <Navbar.Brand href="/dashboard" data-navbrand="brand">
                <img
                    alt=""
                    src="logo192.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    data-image="brandimage"
                />{' '}
                News Headlines
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end navMenu">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">{'Dashboard'}</Nav.Link>
                    {!(this.props.isReadNow) && <Nav.Link href="/readNow" data-readnow="readnow">{'Read Now'}</Nav.Link>}
                </Nav>
                {!(this.props.isReadNow) && <Button variant="outline-info" className="btn-filter" onClick={this.props.onClickFilter}>
                    <img
                        alt=""
                        src="filter.png"
                        width="25"
                        height="25"
                        className="d-inline-block align-top"
                    /><span className="span-filter">{'Filter'}</span>
                </Button>}                
                <Navbar.Text>
                    Signed in as: <a href="/">{userName}</a>
                </Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
            <NewsModal
                show={this.props.showModal}
                onHide={() => this.props.hideModal()}
                {...this.props}
            />
        </>;
    }
}

export default Header;