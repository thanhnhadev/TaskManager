import { call, put } from 'redux-saga/effects';

const getUser = async () => {
  const res = await fetch('http://localhost:1880/user');
  const data = await res.json();
  return data;
};

// GET
function* GetData() {
  let data = yield call(getUser);
  if (data) {
    yield put({ type: 'SetData', payload: { lsUser: data } });
  }
}

//  POST
export function* PostData(params) {
  yield call(async () => {
    await fetch('http://localhost:1880/user', {
      method: 'POST',
      body: JSON.stringify({
        Email: params.payload.email,
        Name: params.payload.name,
        Password: params.payload.password,
        Role: params.payload.role,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  });
  let data = yield call(getUser);
  if (data) {
    yield put({ type: 'SetData', payload: { lsUser: data } });
  }
}

// EDIT
export function* EditData(params) {
  yield call(async () => {
    const a = await fetch('http://localhost:1880/user', {
      method: 'PUT',
      body: JSON.stringify({
        Email: params.payload.email,
        Name: params.payload.name,
        Password: params.payload.password,
        Role: Number(params.payload.role),
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    console.log(a);
  });

  let data = yield call(getUser);
  if (data) {
    yield put({ type: 'SetData', payload: { lsUser: data } });
    console.log(params);
  }
}

// DELETE
export function* DeleteData(params) {
  yield call(async () => {
    const a = await fetch('http://localhost:1880/user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ Email: params.payload.email }),
    });
    console.log(a);
  });

  let data = yield call(getUser);
  if (data) {
    yield put({ type: 'SetData', payload: { lsUser: data } });
  }
}

// SEARCH
export function* SearchData(params) {
  // yield delay(1000);
  let data = yield call(getUser);
  console.log(params.payload);
  console.log(data);
  if (data) {
    yield put({
      type: 'SetData',
      payload: {
        lsUser: data.filter((n) => {
          return (
            n.Email.includes(params.payload.event) ||
            n.Name.includes(params.payload.event)
          );
        }),
      },
    });
  }
}
export default GetData;
