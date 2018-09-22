// @flow
import UserModel from "../models/UserModel";
import loginService from "../services/loginService";
import appNavigator from "../core/appNavigator";
import userActions from "./userActions";
import { setUserDataToken } from "../utils/asyncStorageRequests";
import categoryActions from "./categoryActions";
import axios from 'axios';

export type LoginActionTypes =
    | { type: "SET_ERROR_STATE", payload: string }
    | { type: "SET_LOGIN_FETCHING" }
    | { type: "UNSET_LOGIN_FETCHING" };

export function loginUserAction(username: string, password: string) {
    return (dispatch: *, getState: *) => {
        dispatch(setLoginFetchingAction(true));
        loginService
            .loginUser(username, password)
            .then(data => {
                console.log("HEre", data);
                dispatch(userActions.addUserAction(data.user, data.token));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                return setUserDataToken(data.user, data.token);
            })
            .then(() => {
                dispatch(categoryActions.fetchCategoriesAndNavigate());
            })
            .catch(error => {
                console.log("[Error in Login]", error);
                dispatch(setLoginFetchingAction(false));
                dispatch({
                    type: "SET_ERROR_STATE",
                    payload: "Wrong User Name or Password"
                });
            });
    };
}

export function signUpUserAction(user: UserModel) {
    return (dispatch: *, getState: *) => {
        dispatch(setLoginFetchingAction(true));
        loginService
            .signupUser(user)
            .then(data => {
                console.log("HEre", data);
                dispatch(userActions.addUserAction(data.user, data.token));
                return setUserDataToken(data.user, data.token);
            })
            .then(() => {
                dispatch(categoryActions.fetchCategoriesAndNavigate());
            })
            .catch(error => {
                console.log("[Error in Login]", error);
                dispatch(setLoginFetchingAction(false));
                dispatch({
                    type: "SET_ERROR_STATE",
                    payload: "USer already exists"
                });
            });
    };
}

export function setLoginFetchingAction(val: boolean): LoginActionTypes {
    if (val) {
        return { type: "SET_LOGIN_FETCHING" };
    }
    return { type: "UNSET_LOGIN_FETCHING" };
}

export default {
    loginUserAction,
    setLoginFetchingAction,
    signUpUserAction
};
