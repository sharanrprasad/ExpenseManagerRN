// @flow
import ExpenseModel from "../models/ExpenseModel";
import { deleteHttpJson, getHttpJson, postHttpJson } from "../utils/httpRequests";
import EndPoint from "../EndPoint";

export function addExpenseService(expenseData: ExpenseModel): Promise<ExpenseModel> {
    return postHttpJson(EndPoint.AddExpenseUrl, expenseData).then(response => response.data);
}

export function deleteExpenseService(expenseId: number): Promise<ExpenseModel> {
    return deleteHttpJson(EndPoint.DeleteExpenseUrl + expenseId).then(response => response.data);
}

export function getAllExpensesService(startDate: Date, endDate: Date, userId: string): Promise<Array<ExpenseModel>> {
    const headers = new Headers();
    headers.append("start_date", startDate.toString());
    headers.append("end_date", endDate.toString());
    return getHttpJson(EndPoint.GetExpenses + userId, null,headers).then(response => response.data);
}

export function getTopExpenses(userId: string): Promise<Array<ExpenseModel>> {
    return getHttpJson(EndPoint.GetExpensesTop + userId,null).then(response => response.data);
}
