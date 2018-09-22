// @flow
import UserModel from "../models/UserModel";
import appNavigator from "../core/appNavigator";
import ToastPresenter from "../core/ToastPresenter";
import {AsyncStorage} from 'react-native';
import categoryActions from './categoryActions';
import axios from "axios";


export type UserActionsType =
    | {
  type: "ADD_USER",
  payload: {
    userData: UserModel,
    token: string
  }
}
    | { type: "SET_USER_FETCHING" }
    | { type: "UNSET_USER_FETCHING" };



function addUserAction(userModel: UserModel, session: any): UserActionsType {
  return {
    type: "ADD_USER",
    payload: {
      userData: userModel,
      token: session
    }
  };
}


function checkIfUserLoggedIn(){
  return (dispatch :*, getState :*) => {
    const usernamePromise = AsyncStorage.getItem("user_data");
    const jwtPromise = AsyncStorage.getItem("jwt_token");
    Promise.all([usernamePromise, jwtPromise])
    .then(([userData, token]) => {
      if (userData == null || token == null) {
        appNavigator.navigate("AuthStack");
      } else {
        dispatch(addUserAction(JSON.parse(userData),JSON.parse(token)));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(token);
        dispatch(categoryActions.fetchCategoriesAndNavigate());
      }
    })
    .catch(err => {
      console.log("[Check user LoggedIn] Error -", err);
      appNavigator.navigate("AuthStack");
    });
  }
}



export default {
  addUserAction,
  checkIfUserLoggedIn
};
