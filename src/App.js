import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

import Login from './components/Login';
import MainPage from './components/Main/index';
import Project from './components/Project';
import Task from './components/Task';
import User from './components/User';

function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/main/*" element={<MainPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user" element={<User />} />
          <Route path="project" element={<Project />} />
          <Route path="task" element={<Task />} />
        </Route> */}
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.loginRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LoginCheck: (email, password) => {
      dispatch({
        type: 'LOGIN_CHECK',
        payload: { Email: email, Password: password },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
