import React, { useState } from 'react';
import { CloseCircleOutline, SaveOutline } from 'react-ionicons';
import { connect } from 'react-redux';

function ModalAdd(props) {
  const current = new Date();
  const full = `${current.getFullYear()}-${`0${current.getMonth() + 1}`.slice(
    -2
  )}-${`0${current.getDate()}`.slice(-2)}`;

  const [name, setName] = useState('');
  const [payment, setPayment] = useState('');
  const [timeStart, setTimeStart] = useState(full);
  const [timeEnd, setTimeEnd] = useState(full);
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState('');

  function Submit(e) {
    e.preventDefault();
    props.PostDataFunc(name, payment, timeStart, timeEnd, 0, note, priority);

    setName('');
    setPayment('');
    setTimeStart(full);
    setTimeEnd(full);
    setNote('');
    setPriority('');
  }

  return (
    <div className="modal text-dark" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h4 className="modal-title">Add new project</h4>
            <button type="button" className="close" data-dismiss="modal">
              ×
            </button>
          </div>
          {/* Modal body */}
          <div className="modal-body">
            <form className="mt-1 overflow-auto " style={{ height: '400px' }}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                    // setValueName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  id="name"
                  // value={valueName}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="payment">Payment</label>
                <input
                  onChange={(e) => {
                    setPayment(e.target.value);
                    // setValuePayment(e.target.value);
                  }}
                  type="number"
                  className="form-control"
                  placeholder="Enter payment"
                  id="payment"
                  // value={valuePayment}
                  value={payment}
                />
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
                    // setValueTimeStart(e.target.value);
                  }}
                  // value={valueTimeStart}
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
                    // setValueTimeEnd(e.target.value);
                  }}
                  // value={valueTimeEnd}
                  value={timeEnd}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="note">Note</label>
                <input
                  placeholder="Enter Note"
                  name=""
                  id="note"
                  className="form-control"
                  onChange={(e) => {
                    setNote(e.target.value);
                    // setValueNote(e.target.value);
                  }}
                  // value={valueNote}
                  value={note}
                />
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>

                <select
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  className="form-control"
                  name=""
                  id="projectStatus"
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
    PostDataFunc: (
      name,
      payment,
      timeStart,
      timeEnd,
      isClosed,
      note,
      priority
    ) => {
      dispatch({
        type: 'POST_DATA_PROJECT',
        payload: {
          name,
          payment,
          timeStart,
          timeEnd,
          isClosed,
          note,
          priority,
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);
