import React from 'react';
import { Link, Routes } from 'react-router-dom';
function Header(props) {
  return (
    <div>
      <ul className="nav nav-pills  w-50 ml-3 my-auto text-center ">
        <li className="nav-item">
          <Link
            to={'taskDashboard'}
            className="nav-link text-white active"
            data-toggle="pill"
          >
            Task
          </Link>
        </li>

        <li className="nav-item ">
          <Link
            to={'projectDashboard'}
            className="nav-link  text-white"
            data-toggle="pill"
          >
            Project
          </Link>
        </li>

        <li className="nav-item ">
          <Link
            to={'userDashboard'}
            className="nav-link  text-white"
            data-toggle="pill"
          >
            User
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
