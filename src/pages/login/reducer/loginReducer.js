import { Logout } from "../../../actions/actionTypes";

const initialState = { 
  isLoggedIn: false,
  statusErrorFrom:true,
  loaderStatus:false,
  data:[],
  group_ID:'NOT_LOGGED',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_REJECTED':
      return{
        ...state, 
        isLoggedIn: false,
        loaderStatus:false,
        statusErrorFrom:false,
        group_ID:'NOT_LOGGED',
      }
    break;
    
    case 'LOGIN_PENDING':
      return{
        ...state, 
        isLoggedIn: false,
        loaderStatus:true,
        group_ID:'NOT_LOGGED',
      }
    break;

    case 'LOGIN_FULFILLED':
      const dataJSON1 = JSON.parse(action.payload.data)

      return {
        ...state, 
        isLoggedIn: true,
        loaderStatus:false,
        statusErrorFrom:true,
        //data:action.payload.data,
        group_ID:dataJSON1[0].GROUP_ID,
      }
    break;

    case Logout:
      return { ...state, isLoggedIn: false, group_ID:'NOT_LOGGED' };
    break;
    
    default:
      return state;
  }
};


export default loginReducer;