import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AdminDashboard from './Admin/AdminDashboard';
import MemberDashboard from './Member/MemberDashboard';

function Dashboard(props) {
  // Product
  useEffect(() => {}, [props]);
  return (
    <>
      {props.loginStatus.currentUser &&
      props.loginStatus.currentUser[0].Role === 1 ? (
        <AdminDashboard />
      ) : (
        <MemberDashboard />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userFromRdc: state.userRdc,
    loginStatus: state.loginRdc,
    projectFromRdc: state.projectRdc,
    taskFromRdc: state.taskRdc,
    dashBoardFromRdc: state.dashBoardRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetLateTaskFunc: (data) => {
      dispatch({ type: 'SetLateTask', payload: data });
    },
    SetPendingTaskFunc: (data) => {
      dispatch({ type: 'SetPendingTask', payload: data });
    },
    SetStartTaskFunc: (data) => {
      dispatch({ type: 'SetStartTask', payload: data });
    },
    SetThreeDayLeftTaskFunc: (data) => {
      dispatch({ type: 'SetThreeDayLeftTask', payload: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
