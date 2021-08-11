import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
    render() {
        return <>
            <Navbar bg="dark" variant="dark" fixed="bottom" className="justify-content-center" data-foo="footerNavbar">
                <Navbar.Text>
                    {'News Headlines@Copyright'}
                </Navbar.Text>
            </Navbar>
        </>;
    }
}

export default Footer;