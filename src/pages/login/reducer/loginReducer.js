import { Logout } from "../../../actions/actionTypes";

const initialState = { 
  isLoggedIn: false,
  statusErrorFrom:true,
  loaderStatus:false,
  data:[]
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_REJECTED':
      return{
        ...state, 
        isLoggedIn: false,
        loaderStatus:false,
        statusErrorFrom:false,
      }
    break;
    
    case 'LOGIN_PENDING':
      return{
        ...state, 
        isLoggedIn: false,
        loaderStatus:true,
      }
    break;

    case 'LOGIN_FULFILLED':
      return {
        ...state, 
        isLoggedIn: true,
        loaderStatus:false,
        data:action.payload.data
      }
    break;

    case Logout:
      return { ...state, isLoggedIn: false };
    break;
    
    default:
      return state;
  }
};


export default loginReducer;