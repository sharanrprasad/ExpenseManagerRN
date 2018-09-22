// @flow
import {combineReducers} from 'redux';
import loginStateReducer from './loginReducer';
import userStateReducer from "./userReducer";
import categoriesReducer from './categoriesReducer';

const reducers = {
    loginState: loginStateReducer,
    userState : userStateReducer,
    categoriesState : categoriesReducer,
}


const appReducers = combineReducers(reducers);

const rootReducer = (state:any,action:any) => {
    if(action.type === 'RESET_APP'){
        state =undefined;
    }
    return appReducers(state,action);
}

export default rootReducer;
