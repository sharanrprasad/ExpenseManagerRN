import {AsyncStorage} from 'react-native';
import appNavigator from '../core/appNavigator';
import UserModel from '../models/UserModel';


export function getStoredJwtToken(){
  return AsyncStorage.getItem("jwt_token").then(val => {
    return JSON.parse(val);
  }).catch(err => {
    return Promise.resolve(null);
  })

}

export function getStoredUser(){
  return AsyncStorage.getItem("user_data").then(strVal => {
    return JSON.parse(strVal);
  }).catch(err => {
    return Promise.resolve(null);
  })

}

export function  setUserDataToken( userData :UserModel, token : string) {
  console.log("token ", token);
  let userJsonString = JSON.stringify(userData);
  let tokenJsonString = JSON.stringify(token);
 return AsyncStorage.multiSet([["user_data", userJsonString],["jwt_token", tokenJsonString]]);

}




