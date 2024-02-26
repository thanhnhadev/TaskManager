const globalState = {
  lsTask: [],
};

function TaskReducer(state = globalState, { type, payload }) {
  switch (type) {
    case 'SetDataTask':
      return {
        ...state,
        lsTask: payload.lsTask,
      };

    default:
      return state;
  }
}

export default TaskReducer;
