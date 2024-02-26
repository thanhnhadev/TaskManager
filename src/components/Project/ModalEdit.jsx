import React, { useEffect, useState } from 'react';
import { CloseCircleOutline, SaveOutline } from 'react-ionicons';
import { connect } from 'react-redux';
function ModalEdit(props) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    setId(props.id);
    setName(props.name);
    setPayment(props.payment);
    setTimeStart(props.timeStart);
    setTimeEnd(props.timeEnd);
    setStatus(props.status);
    setNote(props.note);
    setPriority(props.priority);
  }, [
    props.id,
    props.name,
    props.payment,
    props.timeStart,
    props.timeEnd,
    props.status,
    props.note,
    props.priority,
  ]);

  function Edit(e) {
    e.preventDefault();
    props.EditDataFunc(
      id,
      name,
      payment,
      timeStart,
      timeEnd,
      status,
      note,
      priority
    );
  }

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
              <div className="form-group">
                <label htmlFor="idEdit">Id</label>
                <input
                  value={id}
                  type="id"
                  className="form-control"
                  id="idEdit"
                  disabled
                />
              </div>
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
              <div className="form-group">
                <label htmlFor="paymentEdit">Payment</label>
                <input
                  value={payment}
                  onChange={(e) => {
                    setPayment(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Enter payment"
                  id="paymentEdit"
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeStart">Time Start</label>
                <input
                  type="date"
                  onChange={(e) => {
                    setTimeStart(e.target.value);
                  }}
                  name=""
                  id="timeStart"
                  className="form-control"
                  value={timeStart}
                />
              </div>
              <div className="form-group">
                <label htmlFor="timeEnd">Time End</label>
                <input
                  type="date"
                  onChange={(e) => {
                    setTimeEnd(e.target.value);
                  }}
                  name=""
                  id="timeEnd"
                  className="form-control"
                  value={timeEnd}
                />
              </div>

              <div className="form-group">
                <label htmlFor="projectStatus">Change status</label>

                <select
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="projectStatus"
                  value={status}
                >
                  <option>----- Select Project's Status -----</option>
                  <option value="0">Open</option>
                  <option value="1">Closed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="note">Note</label>
                <input
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  name=""
                  id="note"
                  className="form-control"
                  value={note}
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Change Priority</label>

                <select
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="priority"
                  value={priority}
                >
                  <option>----- Select Project's Priority -----</option>
                  <option value="0">High</option>
                  <option value="1">Normal</option>
                  <option value="2">Low</option>
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
    projectFromRdc: state.projectRdc,
    taskFromRdc: state.taskRdc,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    EditDataFunc: (
      id,
      name,
      payment,
      timeStart,
      timeEnd,
      status,
      note,
      priority
    ) => {
      dispatch({
        type: 'EDIT_DATA_PROJECT',
        payload: {
          id,
          name,
          payment,
          timeStart,
          timeEnd,
          status,
          note,
          priority,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalEdit);
