import React, { useEffect, useState } from 'react';
import { CloseCircleOutline, SaveOutline } from 'react-ionicons';
import { connect } from 'react-redux';
function ModalEdit(props) {
  const [name, setName] = useState('');

  function Edit(e) {
    e.preventDefault();
    props.EditDataFunc(props.email, name);
  }

  useEffect(() => {
    setName(props.name);
  }, [props.name]);
  return (
    <div className="modal text-dark" id="myModalsEdit">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Edit user</h4>
            <button type="button" className="close" data-dismiss="modal">
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <form className="mt-1">
              {/* Email */}
              <div className="form-group">
                <label htmlFor="emailEdit">Email</label>
                <input
                  value={props.email}
                  type="email"
                  className="form-control"
                  id="emailEdit"
                  disabled
                />
              </div>

              {/* Name */}
              <div className="form-group">
                <label htmlFor="nameEdit">Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  id="nameEdit"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="pwdEdit">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter password"
                  id="pwdEdit"
                  disabled
                />
              </div>

              {/* Role */}
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  name=""
                  id="role"
                  className="form-control"
                  value={props.role}
                  disabled
                >
                  <option value="0">---- Select role ----</option>
                  <option value="1">Admin</option>
                  <option value="2">Member</option>
                </select>
              </div>
            </form>
          </div>

          {/* Modal footer */}
          <div className="modal-footer">
            <button
              data-dismiss="modal"
              className="btn btn-primary"
              onClick={(e) => {
                Edit(e);
              }}
            >
              <SaveOutline color={'#00000'} />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              <CloseCircleOutline color={'#00000'} />
            </button>
          </div>
        </div>
      </div>
    </div>
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
    EditDataFunc: (email, name) => {
      dispatch({ type: 'EDIT_DATA', payload: { email, name } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
