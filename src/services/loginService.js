// @flow
import { getHttpJson, postHttpJson } from "../utils/httpRequests";
import type {LoginData, UserSignUpModel} from '../models/dtoModelTypes';
import UserModel from "../models/UserModel";
import EndPoint from "../EndPoint";

function loginUser(email:string, password:string): Promise<UserSignUpModel> {
  let loginData :LoginData = {
    email : email,
    password : password
  };
    return postHttpJson(EndPoint.LoginUrl, loginData).then(response => response.data);
}

function signupUser(user: UserModel): Promise<UserSignUpModel> {
  return postHttpJson(EndPoint.SignUpUrl, user).then(response => response.data);
}

export default {
    loginUser,
    signupUser
};
