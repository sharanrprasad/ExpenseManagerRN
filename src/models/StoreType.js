// @flow

import UserModel from './UserModel';
import CategoryModel from './CategoryModel';

export type StoreType = {
  +userState: UserStateType,
  +loginState: LoginStateType,
  +categoriesState : CategoriesState
};


export type UserStateType = {
  userData ?: UserModel,
  +token: string,
  +ui : {
    +isFetching: boolean,
  }
};


export type LoginStateType = {
  +ui: {
    errorState: string,
    isLoggingIn: boolean
  }
};


export type CategoriesState = {
  +categoriesList : Array<CategoryModel>,
  + ui : {
      isFetching : boolean
  }

}

