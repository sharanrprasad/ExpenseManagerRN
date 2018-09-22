// @flow
import type {LoginActionTypes} from "../actions/loginActions";
import type {LoginStateType} from "../models/StoreType";

const initState:LoginStateType = {
  ui : {
    errorState : "",
    isLoggingIn : false
  }
}

export default function loginStateReducer(state:LoginStateType = initState, action:LoginActionTypes){
  switch(action.type){

    case "SET_ERROR_STATE":
      return Object.assign({},state,{ui:{
          ...state.ui,
          errorState:action.payload
        }})
    case "SET_LOGIN_FETCHING":
      return Object.assign({},state,{ui:{
          ...state.ui,
          isLoggingIn:true
        }})
    case "UNSET_LOGIN_FETCHING":
      return Object.assign({},state,{ui:{
          ...state.ui,
          isLoggingIn:false
        }})

    default :
      return state;

  }
}
