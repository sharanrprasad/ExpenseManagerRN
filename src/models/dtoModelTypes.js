import UserModel from "./UserModel";
import CategoryModel from "./CategoryModel";

export type LoginData = {
  email:string,
  password: string
}


export type ErrorModel<T> = {
  errorCode : string,
  payload: T
}

export type UserSignUpModel = {
  user:UserModel,
  token : string
}

export type SummaryModel = {
  totalExpenditure : number;
  mostSpentCategory : CategoryModel;
  expenditureCategoryMap : {
    [id:string]:SpendingCategoryModel
  },
  expenditureCategoryList : Array<SpendingCategoryModel>

}

export type SpendingCategoryModel = {
  categoryExpenditure : number;
  expenseCategory : CategoryModel;
}
