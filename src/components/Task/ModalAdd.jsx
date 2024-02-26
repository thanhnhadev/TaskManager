import React, { useState } from 'react';
import { CloseCircleOutline, SaveOutline } from 'react-ionicons';
import { connect } from 'react-redux';
function ModalAdd(props) {
  const current = new Date();
  const full = `${current.getFullYear()}-${`0${current.getMonth() + 1}`.slice(
    -2
  )}-${`0${current.getDate()}`.slice(-2)}`;

  const [userEmail, setUserEmail] = useState('');
  const [projectId, setProjectId] = useState('');
  const [timeStart, setTimeStart] = useState(full);
  const [timeEnd, setTimeEnd] = useState(full);
  const [note, setNote] = useState('');

  function Submit(e) {
    e.preventDefault();
    props.PostDataFunc(userEmail, projectId, timeStart, timeEnd, 0, note);
    setUserEmail('');
    setProjectId('');
    setTimeStart('');
    setTimeEnd('');
    setNote('');
  }
  return (
    <div className="modal text-dark" id="myModal">
      {console.log(current, full)}
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Add new task</h4>
            <button type="button" className="close" data-dismiss="modal">
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <form className="mt-1 overflow-auto " style={{ height: '400px' }}>
              {/* User email */}
              <div className="form-group">
                <label htmlFor="userEmail">User Email</label>

                <select
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="userEmail"
                  value={userEmail}
                >
                  <option value="">----- Select User's Email -----</option>
                  {props.userFromRdc.lsUser &&
                    props.userFromRdc.lsUser.map((user) => {
                      return (
                        <option key={user.Email} value={user.Id}>
                          {user.Email}
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* Id project */}
              <div className="form-group">
                <label htmlFor="projectId">Project's Id - Project's Name</label>

                <select
                  onChange={(e) => {
                    setProjectId(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="projectId"
                  value={projectId}
                >
                  <option value="">----- Select Project's Id -----</option>
                  {props.projectFromRdc.lsProject &&
                    props.projectFromRdc.lsProject.map((project) => {
                      return (
                        <option key={project.Id} value={project.Id}>
                          {project.Id + ' - ' + project.Name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeStart">Time Start</label>
                <input
                  className="form-control"
                  type="date"
                  id="timeStart"
                  name="timeStart"
                  onChange={(e) => {
                    setTimeStart(e.target.value);
                  }}
                  value={timeStart}
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeEnd">Time End</label>
                <input
                  type="date"
                  name=""
                  id="timeEnd"
                  className="form-control"
                  onChange={(e) => {
                    setTimeEnd(e.target.value);
                  }}
                  value={timeEnd}
                ></input>
              </div>

              {/* Note */}
              <div className="form-group">
                <label htmlFor="note">Note</label>
                <input
                  placeholder="Enter Note"
                  name=""
                  id="note"
                  className="form-control"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  value={note}
                />
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
    projectFromRdc: state.projectRdc,
    taskFromRdc: state.taskRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    PostDataFunc: (userEmail, projectId, timeStart, timeEnd, status, note) => {
      dispatch({
        type: 'POST_DATA_TASK',
        payload: { userEmail, projectId, timeStart, timeEnd, status, note },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);
