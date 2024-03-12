import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation, Trans } from 'react-i18next';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserInfor from './UserInfor';
import History from './History';
import Password from './Password';

const Profile = (props) => {
  const { show, setShow } = props;
  const handleClose = () => {
    setShow(false)
  };
  // const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-profile'>
        <Modal.Header closeButton>
          <Modal.Title>{t('profile.title')}</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
          <Tabs
            defaultActiveKey="profile"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="profile" title="User Information">
              <UserInfor />
            </Tab>
            <Tab eventKey="password" title="Change Password">
              <Password />
            </Tab>
            <Tab eventKey="history" title="History">
              <History />
            </Tab>
          </Tabs>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default Profile