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
import axios from 'axios';

export default function Header({ isLogin, logout }) {
  const [openNavColorSecond, setOpenNavColorSecond] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // const logout = () => {
  //   try {
  //     axios.post('http://localhost:4000/logout',{},{withCredentials: true})
  //     window.open("/campground", "_self");
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
                <Link to='/'><MDBNavbarLink>Home</MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/campground'><MDBNavbarLink>Campground</MDBNavbarLink></Link>
              </MDBNavbarItem>
              {isLogin ? (
                <>
                  <MDBNavbarItem>
                    <Link to='/campground/new'><MDBNavbarLink>New Campground</MDBNavbarLink></Link>
                  </MDBNavbarItem>
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
