import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './main.css';

import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import User from '../User';
import Project from '../Project';
import Task from '../Task';

function MainPage(props) {
  let nav = useNavigate();
  const { GetDataProjectFunc, GetDataTaskFunc, GetDataUserFunc } = props;

  useEffect(() => {
    if (!props.loginStatus.isLogin) {
      nav('/');
    }
    GetDataProjectFunc();
    GetDataTaskFunc();
    GetDataUserFunc();
  }, [
    props.loginStatus.isLogin,
    GetDataUserFunc,
    GetDataTaskFunc,
    GetDataProjectFunc,
    nav,
  ]);

  return (
    <div className="vh-100 background">
      {console.log('current user', props.loginStatus.currentUser)}
      <div
        className="row  rounded shadow-lg w-100 mx-0 vh-100"
        style={{ backgroundColor: 'rgba(0,0,0,.7)', height: '700px' }}
      >
        <div className="col-2 pl-4 pt-3  d-flex flex-column h-100 ">
          <h1 className="h3 text-center text-uppercase text-white font-weight-bold">
            Task management
          </h1>
          <img
            src="https://bom.so/fDjEm0"
            alt=" avatar"
            className="rounded-circle mx-auto  mt-3 mb-4 d-block  w-50 "
          />
          <p className="text-center text-white">
            {props.loginStatus.currentUser &&
              props.loginStatus.currentUser[0].Name}
            <span>
              (
              {props.loginStatus.currentUser &&
              props.loginStatus.currentUser[0].Role === 1
                ? 'Admin'
                : 'Member'}
              )
            </span>
          </p>
          <ul className="nav nav-pills flex-column w-50 mx-auto my-auto text-center ">
            <li className="nav-item">
              <Link
                to={'dashboard'}
                className="nav-link text-white active"
                data-toggle="pill"
              >
                Dashboard
              </Link>
            </li>
            {props.loginStatus.currentUser &&
            props.loginStatus.currentUser[0].Role !== 1 ? (
              ''
            ) : (
              <li className="nav-item ">
                <Link
                  to={'user'}
                  className="nav-link  text-white"
                  data-toggle="pill"
                >
                  User
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link
                to={'project'}
                className="nav-link text-white"
                data-toggle="pill"
              >
                Project
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to={'task'}
                className="nav-link text-white"
                data-toggle="pill"
              >
                Task
              </Link>
            </li>
          </ul>
          <button
            className="btn btn-outline-secondary  w-50 justify-content-center mx-auto mb-4 "
            onClick={() => {
              props.LogoutCheck();
            }}
          >
            Logout
          </button>
        </div>

        {/* Right side  */}
        <div
          className="rounded p-3  col-10 overflow-auto  h-100"
          style={{ backgroundColor: 'rgba(0,0,0,.3)' }}
        >
          <Routes>
            <Route path="*" element={<Dashboard />} />
            <Route path="user" element={<User />} />
            <Route path="project" element={<Project />} />
            <Route path="task" element={<Task />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginRdc,
    userFromRdc: state.userRdc,
    projectFromRdc: state.projectRdc,
    taskFromRdc: state.taskRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LogoutCheck: () => {
      dispatch({ type: 'LOGOUT_CHECK' });
    },
    GetDataUserFunc: () => {
      dispatch({ type: 'GET_DATA' });
    },
    GetDataProjectFunc: () => {
      dispatch({ type: 'GET_DATA_PROJECT' });
    },
    GetDataTaskFunc: () => {
      dispatch({ type: 'GET_DATA_TASK' });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
