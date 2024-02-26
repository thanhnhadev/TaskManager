const globalState = {
  lsUser: [],
};

function UserReducer(state = globalState, { type, payload }) {
  // switch (type) {
  //   case 'SetData':
  //     return {
  //       ...state,
  //       lsUser: payload.lsUser,
  //     };

  //   default:
  //     return state;
  // }
}

export default UserReducer;
