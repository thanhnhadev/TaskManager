import React, { useEffect, useState } from 'react';
import { AddOutline, PencilOutline, TrashOutline } from 'react-ionicons';
import { connect } from 'react-redux';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';

function Task(props) {
  const [id, setId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [projectId, setProjectId] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  function Delete(e, id) {
    e.preventDefault();
    props.DeleteDataFunc(id);
  }
  useEffect(() => {}, [props]);

  return (
    <>
      {/* {!props.loginStatus.currentUser ? nav('/'): } */}
      <h3 className="text-light mb-1">Task management</h3>
      {/* Input & button */}
      <div className="form-group align-items-center d-flex">
        <input
          onChange={(event) => {
            props.SearchDataFunc(event.target.value);
          }}
          type="text"
          className="form-control  w-100 d-inline-block"
          placeholder="Enter project..."
        />
        {props.loginStatus.currentUser &&
        props.loginStatus.currentUser[0].Role !== 1 ? (
          ''
        ) : (
          <div className="text-center ">
            <button
              className="btn btn-outline-light   m-3  p-1 "
              data-toggle="modal"
              data-target="#myModal"
            >
              {/* Add */}
              <AddOutline color={'#00000'} height="24px" width="24px" />
            </button>
          </div>
        )}
      </div>
      {/* Table */}
      <table className="table text-white w-100 table-hover ">
        <thead>
          <tr>
            <th className="align-middle">ID</th>
            <th className="align-middle">USER MAIL</th>
            <th className="align-middle">PROJECT ID</th>
            <th className="align-middle">TIME START</th>
            <th className="align-middle">TIME END</th>
            <th className="align-middle">STATUS</th>
            <th className="align-middle">NOTE</th>
            <th className="align-middle">USERNAME</th>
            <th className="align-middle">PROJECT NAME</th>
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
          {props.taskFromRdc.lsTask &&
            (props.loginStatus.currentUser &&
            props.loginStatus.currentUser[0].Role !== 1
              ? props.taskFromRdc.lsTask
                  .filter(
                    (n) => n.UserMail === props.loginStatus.currentUser[0].Email
                  )
                  .map((task) => {
                    return (
                      <tr key={task.Id}>
                        <td className="align-middle">{task.Id}</td>
                        <td className="align-middle">{task.UserMail}</td>
                        <td className="align-middle">{task.ProjectId}</td>
                        <td className="align-middle">{task.TimeStart}</td>
                        <td className="align-middle">{task.TimeEnd}</td>
                        <td className="align-middle">
                          {task.Status === 0
                            ? 'Pending'
                            : task.Status === 1
                            ? 'Start'
                            : 'Completed'}
                        </td>
                        <td className="align-middle">{task.Note}</td>
                        <td className="align-middle">{task.UserName}</td>
                        <td className="align-middle">{task.ProjectName}</td>
                        <td className="align-middle">
                          {task.Status === 2 ? (
                            ''
                          ) : (
                            <button
                              className="btn btn-outline-light btn-sm align-middle"
                              onClick={() => {
                                props.ChangeStatus(
                                  task.Id,
                                  task.UserMail,
                                  task.ProjectId,
                                  task.TimeStart,
                                  task.TimeEnd,
                                  task.Status,
                                  task.Note
                                );
                              }}
                            >
                              {task.Status === 0 ? 'START' : 'END'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
              : props.taskFromRdc.lsTask.map((task) => {
                  return (
                    <tr key={task.Id} className="align-middle">
                      <td className="align-middle">{task.Id}</td>
                      <td className="align-middle">{task.UserMail}</td>
                      <td className="align-middle">{task.ProjectId}</td>
                      <td className="align-middle">{task.TimeStart}</td>
                      <td className="align-middle">{task.TimeEnd}</td>
                      <td className="align-middle">
                        {task.Status === 0
                          ? 'Pending'
                          : task.Status === 1
                          ? 'Start'
                          : 'End'}
                      </td>
                      <td className="align-middle">{task.Note}</td>
                      <td className="align-middle">{task.UserName}</td>
                      <td className="align-middle">{task.ProjectName}</td>
                      <td className="align-middle">
                        {props.loginStatus.currentUser[0].Role !== 1 ? (
                          ''
                        ) : task.Status === 0 ? (
                          <button
                            className="btn btn-sm btn-outline-light"
                            onClick={() => {
                              setId(task.Id);
                              setUserEmail(task.UserMail);
                              setProjectId(task.ProjectId);
                              setTimeStart(task.TimeStart);
                              setTimeEnd(task.TimeEnd);
                              setStatus(task.Status);
                              setNote(task.Note);
                            }}
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
                        ) : (
                          ''
                        )}
                      </td>
                      <td className="align-middle">
                        {props.loginStatus.currentUser[0].Role !== 1 ? (
                          ''
                        ) : task.Status === 2 ? (
                          ''
                        ) : (
                          <button
                            className="btn btn-sm btn-outline-light "
                            onClick={(e) => {
                              Delete(e, task.Id);
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
                }))}
        </tbody>
      </table>
      {/* Modal Add */}
      <ModalAdd />
      {/* modal add ended */}

      {/* Modal Edit */}
      <ModalEdit
        id={id}
        userMail={userEmail}
        projectId={projectId}
        timeStart={timeStart}
        timeEnd={timeEnd}
        status={status}
        note={note}
      />
      {/* Edit modal ended */}
    </>
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
    ChangeStatus: (
      taskId,
      taskUserMail,
      taskProjectId,
      taskTimeStart,
      taskTimeEnd,
      status,
      taskNote
    ) => {
      dispatch({
        type: 'CHANGE_STATUS',
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
    DeleteDataFunc: (id) => {
      dispatch({ type: 'DELETE_DATA_TASK', payload: { id } });
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

    // SearchDataFunc: (event) => {
    //   dispatch({ type: 'SEARCH_DATA_PROJECT', payload: { event } });
    // },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);
