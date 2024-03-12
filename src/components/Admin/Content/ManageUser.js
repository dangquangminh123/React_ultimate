import React, {useEffect, useState} from "react";
import ModalCreateUser from './ModalCreateUser';
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import { FcPlus } from "react-icons/fc";
import './ManageUser.scss'
import TableUser from './TableUser';
import ModalUpdateUser from "./ModalUpdatedUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { useTranslation } from 'react-i18next';
const ManageUser = () => {
  const { t } = useTranslation();
  const LIMIT_USER = 6;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalCreateUser, setshowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setshowModalUpdateUser] = useState(false);
  const [showModalViewUser, setshowModalViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});

  const [showModalDeleteUser, setshowModalDeleteUser] = useState(false);
  
  const [dataDelete, setDataDelete] = useState({});
  const [dataView, setDataView] = useState({});
  
  const [listUsers, setListUsers ] = useState([])

  useEffect(() => {
      // fetchListUsers();
      fetchListUsersWithPaginate(1);
  }, []);

  
  const fetchListUsers = async () => {
    // debugger
      let res = await getAllUsers();
      // console.log(res);
      if(res.EC === 0) {
          setListUsers(res.DT)
      }
  }

  const fetchListUsersWithPaginate = async (page) => {
    // debugger
      let res = await getUserWithPaginate(page, LIMIT_USER);
      if(res.EC === 0) {
          console.log('res.dt = ', res.DT);
          setListUsers(res.DT.users);
          setPageCount(res.DT.totalPages);
      }
  }

  const handleClickBtnUpdate = (user) => {
    setshowModalUpdateUser(true);
    setDataUpdate(user);
  }

  const resetUpdateData = () => {
    setDataUpdate({});
  }

  const handleClickBtnView = (user) => {
    setshowModalViewUser(true);
    setDataView(user)
  }

  const resetViewData = () => {
    setDataView({});
  }

  const handleClickBtnDelete = (user) => {
    setshowModalDeleteUser(true);
    setDataDelete(user)
  }

  return (
    <div classNameName='manage-user-container'>
        <div classNameName="title">
            {t('admin.manage-users.title')}
        </div>
        <div classNameName="users-content">
            <div className='btn-add-new'>
                <button className='btn btn-primary' onClick={() => setshowModalCreateUser(true)}><FcPlus/> {t('admin.manage-users.add-new')}</button>
            </div>
            <div className='table-users-container'>
              {/* <TableUser /> */}

              <TableUserPaginate listUsers={listUsers} 
                handleClickBtnUpdate={handleClickBtnUpdate} 
                handleClickBtnView={handleClickBtnView}
                handleClickBtnDelete={handleClickBtnDelete} 
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
        </div>
        <ModalCreateUser show={showModalCreateUser} 
          setShow={setshowModalCreateUser}  
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        
        <ModalUpdateUser show={showModalUpdateUser} setShow={setshowModalUpdateUser} 
          dataUpdate={dataUpdate} 
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          resetUpdateData={resetUpdateData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ModalViewUser show={showModalViewUser} setShow={setshowModalViewUser} dataView={dataView}
        resetViewData={resetViewData} />

        <ModalDeleteUser show={showModalDeleteUser} 
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          setShow={setshowModalDeleteUser} 
          dataDelete = {dataDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </div>
  )
}

export default ManageUser