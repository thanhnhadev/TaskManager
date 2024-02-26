import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header';
import ProjectChart from '../ProjectChart';
import TaskChart from './TaskChart';
import UserChart from './UserChart';
import { Routes } from 'react-router-dom';
function AdminDashboard(props) {
  return (
    <>
      <Header />
      {/* <div className="w-100 h-50 d-flex">
        <TaskChart className="mr-2" />
        <ProjectChart />
      </div>
      <div className="w-100 h-50 d-flex">
        <UserChart />
      </div> */}
      <Routes>
        <Route path="*" element={<TaskChart />} />
        <Route path="projectDashboard" element={<ProjectChart />} />
        <Route path="userDashboard" element={<UserChart />} />
      </Routes>
    </>
  );
}

export default AdminDashboard;
