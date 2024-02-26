import { call, put } from 'redux-saga/effects';

const getTask = async () => {
  const res = await fetch('http://localhost:1880/task');
  const data = await res.json();
  return data;
};

// GET
function* GetDataTask() {
  let data = yield call(getTask);
  if (data) {
    yield put({ type: 'SetDataTask', payload: { lsTask: data } });
  }
}

// POST
export function* PostDataTask(params) {
  yield call(async () => {
    await fetch('http://localhost:1880/task', {
      method: 'POST',
      body: JSON.stringify({
        UserMail: params.payload.userEmail,
        ProjectId: params.payload.projectId,
        TimeStart: params.payload.timeStart,
        TimeEnd: params.payload.timeEnd,
        Status: params.payload.status,
        Note: params.payload.note,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  });
  let data = yield call(getTask);
  if (data) {
    yield put({ type: 'SetDataTask', payload: { lsTask: data } });
  }
}

// CHANGE DATA TASK
export function* ChangeStatus(params) {
  yield call(async () => {
    console.log(params);
    await fetch('http://localhost:1880/task', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        Id: params.payload.taskId,
        UserMail: params.payload.taskUserMail,
        ProjectId: params.payload.taskProjectId,
        TimeStart: params.payload.taskTimeStart,
        TimeEnd: params.payload.taskTimeEnd,
        Status: params.payload.status * 1 + 1,
        Note: params.payload.taskNote,
      }),
    });
  });
  let data = yield call(getTask);
  if (data) {
    yield put({ type: 'SetDataTask', payload: { lsTask: data } });
  }
}

// EDIT DATA TASK
export function* EditDataTask(params) {
  yield call(async () => {
    console.log(params);
    await fetch('http://localhost:1880/task', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        Id: params.payload.taskId,
        UserMail: params.payload.taskUserMail,
        ProjectId: params.payload.taskProjectId,
        TimeStart: params.payload.taskTimeStart,
        TimeEnd: params.payload.taskTimeEnd,
        Status: params.payload.status,
        Note: params.payload.taskNote,
      }),
    });
  });
  let data = yield call(getTask);
  if (data) {
    yield put({ type: 'SetDataTask', payload: { lsTask: data } });
  }
}

// DELETE
export function* DeleteDataTask(params) {
  yield call(async () => {
    await fetch('http://localhost:1880/task', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ Id: params.payload.id }),
    });
  });

  let data = yield call(getTask);
  if (data) {
    yield put({ type: 'SetDataTask', payload: { lsTask: data } });
  }
}

// SEARCH
// export function* SearchDataProject(params) {
//   // yield delay(1000);
//   let data = yield call(getProject);
//   console.log(params.payload);
//   console.log(data);
//   console.log(params);
//   if (data) {
//     yield put({
//       type: 'SetDataProject',
//       payload: {
//         lsProject: data.filter((n) => {
//           return (
//             n.Id.toString().includes(params.payload.event) ||
//             n.Name.includes(params.payload.event) ||
//             n.Payment.toString().includes(params.payload.event) ||
//             n.TimeStart.includes(params.payload.event) ||
//             n.TimeEnd.includes(params.payload.event) ||
//             n.Note.includes(params.payload.event) ||
//             n.Priority.toString().includes(params.payload.event)
//           );
//         }),
//       },
//     });
//   }
// }
export default GetDataTask;
