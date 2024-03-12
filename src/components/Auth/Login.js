import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { postLogin } from '../../services/apiService';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner2 } from "react-icons/im";
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Login = (props) => {
  const { t } = useTranslation();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
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
    setIsLoading(true);

    // Submit apis
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate('/');
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  }

  // const handleRegister = () => {
  //   navigate('/register');
  // }

  const handleKeyDown = (event) => {
    if (event && event.key === 'Enter') {
      handleLogin();
    }
  }
  return (
    <div className='login-container'>
      <div className='header'>
        <span>{t('login.do-not-have')}</span>
        <button onClick={() => navigate('/register')}>{t('login.signup')}</button>
        <Language />
      </div>
      {/* HTML Entity */}
      <div className='title col-4 mx-auto'>
        Hỏi Dân It &amp; Eric
      </div>
      <div className='welcome col-4 mx-auto'>
          {t('login.welcome')}
      </div>
      <div className='content-form col-4 mx-auto'>
        <div className="form-group">
          <label>{t('login.email')}</label>
          <input type={"email"} className='form-control' name="" id=""
            value={email} onChange={(event) => setemail(event.target.value)} />
        </div>
        <div className="form-group">
          <label>{t('login.password')}</label>
          <input type="password" className='form-control' name="" id=""
            value={password} onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => handleKeyDown(event)} />
        </div>
        <span className='forgot-password'>{t('login.forgot-pass')}</span>
        <div className=''>
          <button className='btn-submit' onClick={() => handleLogin()} disabled={isLoading}>
            {isLoading === true && <ImSpinner2 className="loader-icon" />}
            <span>{t('login.do-login')}</span>
          </button>
        </div>
        <div className='text-center'>
          <span className="back" onClick={() => { navigate('/') }}>
            &#60;&#60; {t('login.back')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login