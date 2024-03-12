import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import React from 'react';
import Header from './components/Header/Header';
import { Outlet, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
      {/* <div>
          <div>
            <button>
                <Link to="/users">Go To Users Page</Link>
            </button>
            <button>
                <Link to="/admins">Go To Admin Page</Link>
            </button>
          </div>
      </div> */}
    </div>
  );
}


export default App;
