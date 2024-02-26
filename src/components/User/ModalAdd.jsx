import React, { useState } from 'react';
import { CloseCircleOutline, SaveOutline } from 'react-ionicons';
import { connect } from 'react-redux';
function ModalAdd(props) {
  const [valueEmail, setValueEmail] = useState('');
  const [valueName, setValueName] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueRole, setValueRole] = useState(0);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  function Submit(e) {
    e.preventDefault();
    props.PostDataFunc(email, name, password, role);
    setValueEmail('');
    setValueName('');
    setValuePassword('');
    setValueRole('');
  }
  return (
    <div className="modal text-dark" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Add new user</h4>
            <button type="button" className="close" data-dismiss="modal">
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <form className="mt-1">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setValueEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  id="email"
                  value={valueEmail}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                    setValueName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  id="name"
                  value={valueName}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Password</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValuePassword(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Enter password"
                  id="password"
                  value={valuePassword}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  name=""
                  id="role"
                  className="form-control"
                  onChange={(e) => {
                    setRole(Number(e.target.value));
                    setValueRole(e.target.value);
                  }}
                  value={valueRole}
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
                Submit(e);
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
    PostDataFunc: (email, name, password, role) => {
      dispatch({ type: 'POST_DATA', payload: { email, name, password, role } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);
