import createSagaMiddleware from '@redux-saga/core';

import MiddleReSa from './Middleware/MiddleReSa';

import TaskReducer from './Reducer/TaskReducer';
import ProjectReducer from './Reducer/ProjectReducer';
import UserReducer from './Reducer/UserReducer';
import LoginReducer from './Reducer/LoginReducer';
import DashBoardReducer from './Reducer/DashboardReducer';

const redux = require('redux');

const sagaMiddleware = createSagaMiddleware();

const allReducer = redux.combineReducers({
  loginRdc: LoginReducer,
  userRdc: UserReducer,
  projectRdc: ProjectReducer,
  taskRdc: TaskReducer,
  dashBoardRdc: DashBoardReducer,
});

export default redux.createStore(
  allReducer,
  redux.applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(MiddleReSa);
