import React, { useEffect, useState } from 'react';
import { AddOutline, PencilOutline, TrashOutline } from 'react-ionicons';
import { connect } from 'react-redux';
import '../User/user.css';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';

function User(props) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState('');

  function Delete(e, id) {
    e.preventDefault();
    props.DeleteDataFunc(id);
  }

  useEffect(() => {}, [props]);

  return (
    <>
      <h3 className="text-light mb-1">Project management</h3>

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
          (props.loginStatus.currentUser[0].Role !== 1 ? (
            ''
          ) : (
            <div className="text-center ">
              {/* Add */}
              <button
                className="btn btn-outline-light m-3 p-1 "
                data-toggle="modal"
                data-target="#myModal"
              >
                <AddOutline color={'#00000'} height="24px" width="24px" />
              </button>
            </div>
          ))}
      </div>

      {/* Table */}
      <table className="table text-white w-100 table-hover ">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PAYMENT</th>
            <th>TIME START</th>
            <th>TIME END</th>
            <th>STATUS</th>
            <th>NOTE</th>
            <th>PRIORITY</th>
            {props.loginStatus.currentUser &&
            props.loginStatus.currentUser[0].Role !== 1 ? (
              ''
            ) : (
              <th colSpan={2} className="text-center">
                EDIT / DELETE
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.loginStatus.currentUser &&
          props.loginStatus.currentUser[0].Role !== 1
            ? props.projectFromRdc.lsProject &&
              props.projectFromRdc.lsProject
                .filter((lsProject) => {
                  return props.taskFromRdc.lsTask.some(
                    (task) =>
                      task.ProjectName === lsProject.Name &&
                      props.loginStatus.currentUser[0].Email === task.UserMail
                  );
                })
                .map((x) => {
                  return (
                    <tr key={x.Id}>
                      <td>{x.Id}</td>
                      <td>{x.Name}</td>
                      <td>{x.Payment}</td>
                      <td>{x.TimeStart}</td>
                      <td>{x.TimeEnd}</td>
                      <td
                        style={
                          x.IsClosed === 0
                            ? { color: 'green' }
                            : { color: 'red' }
                        }
                      >
                        {x.IsClosed === 0 ? 'Open' : 'Closed'}
                      </td>
                      <td>{x.Note}</td>
                      <td>
                        {x.Priority === 0
                          ? 'High'
                          : x.Priority === 1
                          ? 'Normal'
                          : 'Low'}
                      </td>
                    </tr>
                  );
                })
            : props.projectFromRdc.lsProject &&
              props.projectFromRdc.lsProject.map((project) => {
                return (
                  <tr key={project.Id}>
                    <td>{project.Id}</td>
                    <td>{project.Name}</td>
                    <td>{project.Payment}</td>
                    <td>{project.TimeStart}</td>
                    <td>{project.TimeEnd}</td>
                    <td
                      style={
                        project.IsClosed === 0
                          ? { color: 'green' }
                          : { color: 'red' }
                      }
                    >
                      {project.IsClosed === 0 ? 'Open' : 'Closed'}
                    </td>
                    <td>{project.Note}</td>
                    <td>
                      {' '}
                      {project.Priority === 0
                        ? 'High'
                        : project.Priority === 1
                        ? 'Normal'
                        : 'Low'}
                    </td>
                    <td>
                      <div className="mh-10 mw-10 d-flex justify-content-end">
                        <button
                          onClick={() => {
                            setId(project.Id);
                            setName(project.Name);
                            setPayment(project.Payment);
                            setTimeStart(project.TimeStart);
                            setTimeEnd(project.TimeEnd);
                            setStatus(project.IsClosed);
                            setNote(project.Note);
                            setPriority(project.Priority);
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
                    <td>
                      <button
                        className="btn btn-sm btn-outline-light"
                        onClick={(e) => {
                          Delete(e, project.Id);
                        }}
                      >
                        {/* Delete icon */}
                        <TrashOutline
                          color={'#00000'}
                          height="24px"
                          width="24px"
                        />
                      </button>
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
      <ModalEdit
        id={id}
        name={name}
        payment={payment}
        timeStart={timeStart}
        timeEnd={timeEnd}
        status={status}
        note={note}
        priority={priority}
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
    DeleteDataFunc: (id) => {
      dispatch({ type: 'DELETE_DATA_PROJECT', payload: { id } });
    },
    SearchDataFunc: (event) => {
      dispatch({ type: 'SEARCH_DATA_PROJECT', payload: { event } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
