import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import Navbar from "react-bootstrap/Navbar";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import Profile from "../Header/Profile";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Outlet, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const account = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isShowModalProfile, setIsShowModalProfile] = useState(false);

    const handleLogOut = async () => {
        let rs = await logout(account.email, account.refresh_token);
        if (rs && rs.EC === 0) {
            //clear data redux
            dispatch(doLogout());
            navigate('/login');
        } else {
            toast.error(rs.EM);
        }
    }
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed}  />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside"/>
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setIsShowModalProfile(true)}>{t('header.profile')}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.logout')}</NavDropdown.Item>
                        </NavDropdown>

                    </div>
                </div>
                <Profile
                    show={isShowModalProfile}
                    setShow={setIsShowModalProfile}
                />
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>

            </div>


        </div>
    )
}
export default Admin;