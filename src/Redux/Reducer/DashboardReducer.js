const globalState = {
  lateTask: null,
  pendingTask: null,
  startTask: null,
  lastThreeDayTask: null,
  onProgressProject: 0,
  releaseOnSevenDaysProject: null,
  emptyTaskUser: 0,
  completedTaskOnNextSevenDayUser: 0,
  completedTaskOnNextSevenDay: 0,
};

function DashBoardReducer(state = globalState, { type, payload }) {
  switch (type) {
    case 'SetLateTask':
      return {
        ...state,
        lateTask: payload,
      };
    case 'SetPendingTask':
      return {
        ...state,
        pendingTask: payload,
      };
    case 'SetStartTask':
      return {
        ...state,
        startTask: payload,
      };
    case 'SetThreeDayLeftTask':
      return {
        ...state,
        lastThreeDayTask: payload,
      };
    case 'SetOnProgressProject':
      return {
        ...state,
        onProgressProject: payload,
      };
    case 'SetReleaseProjects':
      return {
        ...state,
        releaseOnSevenDaysProject: payload,
      };
    case 'SetEmptyTaskUser':
      return {
        ...state,
        emptyTaskUser: payload,
      };
    case 'SetCompletedTaskOnNextSevenDayUser':
      return {
        ...state,
        completedTaskOnNextSevenDayUser: payload,
      };
    case 'SetCompletedTaskOnNextSevenDay':
      return {
        ...state,
        completedTaskOnNextSevenDay: payload,
      };
    default:
      return state;
  }
}

export default DashBoardReducer;
