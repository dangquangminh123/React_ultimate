import React, { Suspense } from 'react'
import {
  Routes,
  BrowserRouter,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import User from './components/User/User'
import Admin from './components/Admin/Admin'
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/Content/DashBoard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import ListQuiz from './components/User/ListQuiz';

const NotFound = () => {
  return (
    <div className="alert alert-danger container mt-3">404.Nout Found data with your current URL</div>
  )
}

const Layout = (props) => {
  return (
    <Suspense fallback="...is loading">

      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={
            <PrivateRoute>
              <ListQuiz />
            </PrivateRoute>
          } />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admins" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizes" element={<ManageQuiz />} />
          <Route path="manage-questions" element={<Questions />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     </Suspense>
  )
}

export default Layout