import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../services/apiService";
import { ToastContainer, toast } from 'react-toastify';
import { doLogout } from "../../redux/action/userAction";
import Language from "./Language";
import { FaReact } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Profile from "./Profile";

const Header = () => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogOut = async () => {
    let rs = await logout("account.email", account.refresh_token);
    if (rs && rs.EC === 0) {
      // clear data trong redux
      dispatch(doLogout());
      navigate('/login');
    } else {
      toast.error(rs.EM);
    }
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="#home">Hỏi Dân It</Navbar.Brand> */}
          <NavLink to='/' className='navbar-brand'>
                        <span><FaReact className='brand-icon' /></span>
                        <span className='brand-name'>Hỏi Dân IT</span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to='/' className='nav-link'>
                  {t('header.home')}
              </NavLink>
              <NavLink to='/users' className='nav-link' >
                  {t('header.user')}
              </NavLink>
              <NavLink to='/admins' className='nav-link'>
                  {t('header.admin')}
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated === false ?
                <>
                  <button className='btn-login' onClick={() => handleLogin()}> {t('header.login')}</button>
                  <button className='btn-signup' onClick={() => handleRegister()}> {t('header.register')}</button>
                </> :
                <NavDropdown title={t('header.setting')} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => setIsShowModalProfile(true)}> {t('header.profile')}</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.logout')}</NavDropdown.Item>
                </NavDropdown>
              }
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Profile
        show={isShowModalProfile}
        setShow={setIsShowModalProfile}
      />
    </>
  );
};

export default Header;
