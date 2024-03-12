import React, { useState, useEffect } from 'react';
import './Share.scss';
import { useTranslation, Trans } from 'react-i18next';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FcPlus } from 'react-icons/fc';
const UserInfor = (props) => {
  const account = useSelector(state => state.user.account);
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setEmail(account.email);
      setUsername(account.username);
      setRole(account.role);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`)
      }
    }
  }, [account])

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  }

  return (
    <div className='user-infor-container'>
      <div className="row g-3">
          <div className="col-md-4">
              <label className="form-label">Username</label>
              <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
              />
          </div>
          <div className="col-md-4">
              <label className="form-label">Email</label>
              <input
                  disabled
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
              />
          </div>

          <div className="col-md-4">
              <label className="form-label">
                  {t('admin.manage-users.modal.role')}
              </label>
              <select className="form-select"
                  onChange={(event) => setRole(event.target.value)}
                  value={role}
                  disabled
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
          </div>

          <div className='col-md-12'>
              <label className="form-label label-upload" htmlFor='labelUpload'>
                  <FcPlus />
                  Upload File Image
              </label>
              <input
                  type="file"
                  id="labelUpload" hidden
                  onChange={(event) => handleUploadImage(event)}
              />
          </div>

          <div className='col-md-12 img-preview'>
              {previewImage ?
                  <img src={previewImage} />
                  :
                  <span>
                      Preview Image</span>
              }
          </div>
          <div className='mt-3'>
              <button className='btn btn-warning'>Update</button>
          </div>
        </div>
    </div>
  )
}

export default UserInfor