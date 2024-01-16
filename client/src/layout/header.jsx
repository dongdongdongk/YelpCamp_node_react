// Header.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';

export default function Header({ isLogin, logout }) {
  const [openNavColorSecond, setOpenNavColorSecond] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <MDBNavbar expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand>Navbar</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColorSecond(!openNavColorSecond)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColorSecond} navbar id='navbarColor02'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/campground'><MDBNavbarLink>Campground</MDBNavbarLink></Link>
              </MDBNavbarItem>
              {isLogin ? (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink onClick={handleLogout}>Logout</MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              ) : (
                <>
                  <MDBNavbarItem>
                    <Link to='/login'><MDBNavbarLink>Login</MDBNavbarLink></Link>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
