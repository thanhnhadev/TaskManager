import { takeLatest } from 'redux-saga/effects';
import LoginCheck, { DecryptCheck, LogoutCheck } from './Login/Login';

import GetDataProject, {
  DeleteDataProject,
  EditDataProject,
  PostDataProject,
  SearchDataProject,
} from './Project/Project';
import GetDataTask, {
  ChangeStatus,
  DeleteDataTask,
  EditDataTask,
  PostDataTask,
} from './Task/Task';
import GetData, {
  DeleteData,
  EditData,
  PostData,
  SearchData,
} from './User/User';

function* mySaga() {
  // Login
  yield takeLatest('LOGIN_CHECK', LoginCheck);
  yield takeLatest('LOGOUT_CHECK', LogoutCheck);
  yield takeLatest('DECRYPT_CHECK', DecryptCheck);

  // User
  yield takeLatest('GET_DATA', GetData);
  yield takeLatest('POST_DATA', PostData);
  yield takeLatest('EDIT_DATA', EditData);
  yield takeLatest('DELETE_DATA', DeleteData);
  yield takeLatest('SEARCH_DATA', SearchData);

  //Project
  yield takeLatest('GET_DATA_PROJECT', GetDataProject);
  yield takeLatest('POST_DATA_PROJECT', PostDataProject);
  yield takeLatest('EDIT_DATA_PROJECT', EditDataProject);
  yield takeLatest('DELETE_DATA_PROJECT', DeleteDataProject);
  yield takeLatest('SEARCH_DATA_PROJECT', SearchDataProject);

  // Task
  yield takeLatest('GET_DATA_TASK', GetDataTask);
  yield takeLatest('POST_DATA_TASK', PostDataTask);
  yield takeLatest('DELETE_DATA_TASK', DeleteDataTask);
  yield takeLatest('CHANGE_STATUS', ChangeStatus);
  yield takeLatest('EDIT_DATA_TASK', EditDataTask);
}

export default mySaga;
