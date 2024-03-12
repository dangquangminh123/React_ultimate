import React, { useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { postRegister } from '../../services/apiService';
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';
const Register = () => {
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
    // Validate
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid email")
      return;
    }

    if (!password) {
      toast.error("Invalid Password")
      return;
    }

    // Submit apis
    let data = await postRegister(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate('/login');
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM)
    }
  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (
    <div className='register-container'>
      <div className='header'>
        <span>{t('register.already')}</span>
        <button onClick={() => handleLogin()}>{t('register.login')}</button>
        <Language />
      </div>
      <div className='title col-4 mx-auto'>
        Hỏi Dân IT & Eric
      </div>
      <div className='welcome col-4 mx-auto'>
      {t('register.start')}
      </div>
      <div className='content-form col-4 mx-auto'>
        <div className="form-group">
          <label>{t('register.email')} (*)</label>
          <input type="email" className='form-control' name="" id=""
            value={email} onChange={(event) => setemail(event.target.value)} />
        </div>
        <div className="form-group pass-group">
          <label>{t('register.password')} (*)</label>
          <input type={isShowPassword ? "text" : "password"} className='form-control' name="" id=""
            value={password} onChange={(event) => setPassword(event.target.value)} />

          {isShowPassword ? <span className='icons-eye' onClick={() => setIsShowPassword(false)}>
            <FaEye /></span> :
            <span className='icons-eye' onClick={() => setIsShowPassword(true)}>
              <FaEyeSlash /></span>
          }
        </div>
        <div className="form-group">
          <label>{t('register.username')}</label>
          <input type="text" className='form-control' name="" id=""
            value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>

        <div className=''>
          <button className='btn-submit' onClick={() => handleRegister()}>
              {t('register.submit')}
          </button>
        </div>
        <div className='text-center'>
          <span className="back" onClick={() => { navigate('/') }}>
          &#60;&#60; {t('register.back')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register