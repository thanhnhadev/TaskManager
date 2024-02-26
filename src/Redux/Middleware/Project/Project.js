import { call, put } from 'redux-saga/effects';

const getProject = async () => {
  const res = await fetch('http://localhost:1880/project');
  const data = await res.json();
  return data;
};

// GET
function* GetDataProject() {
  let data = yield call(getProject);
  if (data) {
    yield put({ type: 'SetDataProject', payload: { lsProject: data } });
  }
}

//  POST
export function* PostDataProject(params) {
  yield call(async () => {
    await fetch('http://localhost:1880/project', {
      method: 'POST',
      body: JSON.stringify({
        Name: params.payload.name,
        Payment: params.payload.payment,
        TimeStart: params.payload.timeStart,
        TimeEnd: params.payload.timeEnd,
        IsClosed: params.payload.isClosed,
        Note: params.payload.note,
        Priority: params.payload.priority,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  });
  let data = yield call(getProject);
  if (data) {
    yield put({ type: 'SetDataProject', payload: { lsProject: data } });
  }
}

// EDIT
export function* EditDataProject(params) {
  yield call(async () => {
    await fetch('http://localhost:1880/project', {
      method: 'PUT',
      body: JSON.stringify({
        Id: params.payload.id,
        Name: params.payload.name,
        Payment: params.payload.payment,
        TimeStart: params.payload.timeStart,
        TimeEnd: params.payload.timeEnd,
        IsClosed: params.payload.status,
        Note: params.payload.note,
        Priority: params.payload.priority,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  });
  let data = yield call(getProject);
  if (data) {
    yield put({ type: 'SetDataProject', payload: { lsProject: data } });
  }
}

// DELETE
export function* DeleteDataProject(params) {
  yield call(async () => {
    const a = await fetch('http://localhost:1880/project', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ Id: params.payload.id }),
    });
    console.log(a);
  });

  let data = yield call(getProject);
  if (data) {
    yield put({ type: 'SetDataProject', payload: { lsProject: data } });
  }
}

// SEARCH
export function* SearchDataProject(params) {
  // yield delay(1000);
  let data = yield call(getProject);
  console.log(params.payload);
  console.log(data);
  console.log(params);
  if (data) {
    yield put({
      type: 'SetDataProject',
      payload: {
        lsProject: data.filter((n) => {
          return (
            n.Id.toString().includes(params.payload.event) ||
            n.Name.includes(params.payload.event) ||
            n.Payment.toString().includes(params.payload.event) ||
            n.TimeStart.includes(params.payload.event) ||
            n.TimeEnd.includes(params.payload.event) ||
            n.Note.includes(params.payload.event) ||
            n.Priority.toString().includes(params.payload.event)
          );
        }),
      },
    });
  }
}
export default GetDataProject;
