// @flow
const BaseUrl: string = "http://54.213.193.163/api";
const LoginUrl = BaseUrl + "/login";
const SignUpUrl = BaseUrl + "/signup";
const AddExpenseUrl = BaseUrl + "/expense/add/";
const DeleteExpenseUrl = BaseUrl + "/expense/";
const GetExpenses = BaseUrl + "/expense/user/";
const GetExpensesTop = BaseUrl + "/expense/user-top/";

const GetCategories = BaseUrl + "/category/";
const GetSummaryUrl = BaseUrl + "/summary/bydate";
const GetCurrentBudgetUrl = BaseUrl + "/budget/current/";
const UpdateBudgetUrl = BaseUrl + "/budget/update/";
const DeleteBudgetUrl = BaseUrl + "/budget/delete/";
const AddBudgetUrl = BaseUrl + "/budget/add/";
const AddCategoryParent = BaseUrl + "/category/add-parent";

export default {
    BaseUrl,
    LoginUrl,
    SignUpUrl,
    AddExpenseUrl,
    DeleteExpenseUrl,
    GetExpenses,
    GetExpensesTop,
    GetCategories,
    GetSummaryUrl,
    GetCurrentBudgetUrl,
    UpdateBudgetUrl,
    DeleteExpenseUrl,
    DeleteBudgetUrl,
    AddBudgetUrl,
    AddCategoryParent
};
