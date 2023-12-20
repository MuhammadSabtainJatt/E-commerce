import React, { useState } from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAdjust } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <Navbar expand="lg" className="text-center">
            <Container>
                <Navbar.Brand href="#">
                    <img src="https://www.logolynx.com/images/logolynx/56/56afea50b83164e3e272d4ebeccd94fb.png" alt="Logo" height="40" className="d-inline-block align-top" />
                </Navbar.Brand>
                <Form inline className="my-3 ">
                    <div className='d-flex align-items-center'>

                        <FormControl type="text" placeholder="Search..." className={`mr-2 `} style={{ width: '200px', borderBottom: '2px solid #ced4da', borderTop: 'none', borderLeft: 'none', borderRight: 'none', }} />

                        <Button style={{ border: 'none', background: 'transparent', color: 'black' }}>
                            <FontAwesomeIcon icon={faSearch} style={{ border: 'none', background: 'none' }} />
                        </Button>
                    </div>
                </Form>
            </Container>
        </Navbar>
    );
};

export default Header;
