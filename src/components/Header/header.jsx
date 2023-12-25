import React, { useState, useEffect } from 'react';
import { Navbar, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const Navigate=useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Header */}
      <Navbar
        expand="lg"
        className={`text-center fixed-top`}
        style={{
          backgroundColor: isScrolled ? '#ffe5d9' : '#ffcad4',
          borderBottomRadius: '10px', // Corrected the typo here
        }}
      >
        <Container>
          <Navbar.Brand href="#">
            <img
              src="https://www.logolynx.com/images/logolynx/56/56afea50b83164e3e272d4ebeccd94fb.png"
              alt="Logo"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Form inline className="my-3">
            <div className="d-flex align-items-center">
              <FormControl
                type="text"
                placeholder="Search..."
                className={`mr-2 border-0`}
                style={{
                  background: 'transparent',
                  width: '200px',
                  borderBottom: isScrolled ? '2px solid #000' : '2px solid #fff',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderRadius: '0',
                  color: isScrolled ? '#fff' : '#000',
                }}
              />
              <Button style={{ border: 'none', background: 'transparent', color: '#000' }}>
                <FontAwesomeIcon icon={faSearch} style={{ border: 'none', background: 'none' }} />
              </Button>
              <Button style={{ border: 'none', background: 'transparent', color: '#000',fontSize:"30px" }} onClick={() => Navigate(`cart`)}>
                <FontAwesomeIcon icon={faCartShopping} style={{ border: 'none', background: 'none' }} />
              </Button> 
            </div>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
