import React, { useEffect, useState } from 'react';
import { CloseCircleOutline, SaveOutline } from 'react-ionicons';
import { connect } from 'react-redux';

function ModalEdit(props) {
  // const [id, setId] = useState('');
  const [userMail, setUserEmail] = useState('');
  const [projectId, setProjectId] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  function Edit(e) {
    e.preventDefault();
    props.EditDataFunc(
      props.id,
      userMail,
      projectId,
      timeStart,
      timeEnd,
      status,
      note
    );
  }

  useEffect(() => {
    // setId(props.Id);
    setUserEmail(props.userMail);
    setProjectId(props.projectId);
    setTimeStart(props.timeStart);
    setTimeEnd(props.timeEnd);
    setStatus(props.status);
    setNote(props.note);
  }, [
    props.Id,
    props.userMail,
    props.projectId,
    props.timeStart,
    props.timeEnd,
    props.status,
    props.note,
  ]);

  return (
    <div className="modal text-dark" id="myModalsEdit">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Edit project</h4>
            <button type="button" className="close" data-dismiss="modal">
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <form className="mt-1 overflow-auto" style={{ height: '400px' }}>
              {/* ID */}
              <div className="form-group">
                <label htmlFor="idEdit">Id</label>
                <input
                  value={props.id}
                  type="id"
                  className="form-control"
                  id="idEdit"
                  disabled
                />
              </div>

              {/* User Mail */}
              <div className="form-group">
                <label htmlFor="userEmail">User Email</label>
                <select
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="userEmail"
                  value={userMail}
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

              {/* Project Id */}
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

              {/* Time Start */}
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

              {/* Time End */}
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

              {/* Status */}
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="status"
                  value={status}
                >
                  <option value="0">Pending</option>
                  <option value="1">Start</option>
                  <option value="2">End</option>
                </select>
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
    projectFromRdc: state.projectRdc,
    taskFromRdc: state.taskRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    EditDataFunc: (
      taskId,
      taskUserMail,
      taskProjectId,
      taskTimeStart,
      taskTimeEnd,
      status,
      taskNote
    ) => {
      dispatch({
        type: 'EDIT_DATA_TASK',
        payload: {
          taskId,
          taskUserMail,
          taskProjectId,
          taskTimeStart,
          taskTimeEnd,
          status,
          taskNote,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
