const globalState = {
  lsProject: [],
};

function ProjectReducer(state = globalState, { type, payload }) {
  switch (type) {
    case 'SetDataProject':
      return {
        ...state,
        lsProject: payload.lsProject,
      };

    default:
      return state;
  }
}

export default ProjectReducer;
