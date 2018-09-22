// @flow
import type {UserActionsType} from '../actions/userActions';
import type { UserStateType } from "../models/StoreType";

const initUserState : UserStateType  = {
  token: "",
  userData : null,
  ui : {
    isFetching: false,
  }
};

export default function userStateReducer(state:UserStateType = initUserState, action:UserActionsType):UserStateType{
  switch (action.type) {
    case "ADD_USER" : {
      return Object.assign({},state, action.payload);
    }
    case "SET_USER_FETCHING":
      return Object.assign({}, state, {
        ui : {
          ...state.ui,
          isFetching: true
        }
      });
    case "UNSET_USER_FETCHING":
      return Object.assign({}, state, {
        ui : {
          ...state.ui,
          isFetching: false
        }
      });

    default :
      return state;
  }
}
