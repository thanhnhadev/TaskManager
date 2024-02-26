import React, { useEffect, useState } from 'react';
import { PencilOutline, PersonAddOutline, TrashOutline } from 'react-ionicons';
import { connect } from 'react-redux';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import './user.css';
import Cookies from 'js-cookie';

function User(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  function Delete(e, email) {
    e.preventDefault();
    props.DeleteDataFunc(email);
  }

  useEffect(() => {}, [props]);
  return (
    <>
      {console.log('current user', props.loginStatus.currentUser)}

      <h3 className="text-light mb-1">User management</h3>
      {/* Input & button */}
      <div className="form-group align-items-center d-flex">
        <input
          onChange={(event) => {
            props.SearchDataFunc(event.target.value);
          }}
          type="text"
          className="form-control  w-100 d-inline-block"
          placeholder="Enter user....."
        />

        {props.loginStatus.currentUser &&
        props.loginStatus.currentUser[0].Role !== 1 ? (
          ''
        ) : (
          <div className="text-center ">
            <button
              className="btn btn-outline-light m-3 p-1 "
              data-toggle="modal"
              data-target="#myModal"
            >
              {/* Add */}
              <PersonAddOutline color={'#00000'} height="24px" width="24px" />
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <table className="table text-white w-100 table-hover ">
        <thead>
          <tr>
            <th>EMAIL</th>
            <th>NAME</th>
            <th>ROLE</th>
            {props.loginStatus.currentUser &&
            props.loginStatus.currentUser[0].Role !== 1 ? (
              <th colSpan={2}></th>
            ) : (
              <th colSpan={2} className="text-center">
                EDIT / DELETE
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.userFromRdc.lsUser &&
            props.userFromRdc.lsUser.map((user) => {
              return (
                <tr key={user.Email}>
                  <td>{user.Email}</td>
                  <td>{user.Name}</td>
                  <td>{user.Role === 1 ? 'Admin' : 'Member'}</td>
                  {props.userFromRdc.lsUser &&
                  props.loginStatus.currentUser[0].Role !== 1 ? (
                    ''
                  ) : (
                    <td>
                      <div className="mh-10 mw-10 d-flex justify-content-end">
                        <button
                          onClick={() => {
                            setEmail(user.Email);
                            setName(user.Name);
                            setRole(user.Role);
                          }}
                          className="btn btn-sm btn-outline-light "
                          data-toggle="modal"
                          data-target="#myModalsEdit"
                        >
                          {/* edit icon */}
                          <PencilOutline
                            color={'#00000'}
                            height="24px"
                            width="24px"
                          />
                        </button>
                      </div>
                    </td>
                  )}
                  <td>
                    {props.loginStatus.currentUser[0].Role !== 1 ? (
                      ''
                    ) : user.Email ===
                      props.loginStatus.currentUser[0].Email ? (
                      ''
                    ) : (
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={(e) => {
                          Delete(e, user.Email);
                        }}
                      >
                        {/* Delete icon */}
                        <TrashOutline
                          color={'#00000'}
                          height="24px"
                          width="24px"
                        />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Modal Add */}
      <ModalAdd />
      {/* modal add ended */}

      {/* Modal Edit */}
      <ModalEdit email={email} name={name} role={role} />
      {/* Edit modal ended */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userFromRdc: state.userRdc,
    loginStatus: state.loginRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    DeleteDataFunc: (email) => {
      dispatch({ type: 'DELETE_DATA', payload: { email } });
    },
    SearchDataFunc: (event) => {
      dispatch({ type: 'SEARCH_DATA', payload: { event } });
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
export default connect(mapStateToProps, mapDispatchToProps)(User);
