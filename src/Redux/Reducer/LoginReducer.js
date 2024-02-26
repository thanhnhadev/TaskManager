const loginState = {
  currentUser: '',
  isLogin: false,
  isLogout: false,
};

const LoginReducer = (state = loginState, { type, payload }) => {
  switch (type) {
    case 'SetCurrentUser':
      return {
        ...state,
        currentUser: payload.user,
      };
    case 'SetLogin':
      return {
        ...state,
        isLogin: payload.isLogin,
      };
    // case 'SetLogout':
    //   return {
    //     ...state,
    //     isLogout: payload.isLogout,
    //   };
    default:
      return state;
  }
};

export default LoginReducer;
