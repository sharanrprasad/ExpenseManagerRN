// @flow
import { getHttpJson, postHttpJson } from "../utils/httpRequests";
import EndPoint from "../EndPoint";
import BudgetModel from "../models/BudgetModel";

export function getCurrentBudget(userId: string): Promise<BudgetModel> {
    return getHttpJson(EndPoint.GetCurrentBudgetUrl + userId).then(response => response.data);
}

export function addBudget(budget: BudgetModel): Promise<BudgetModel> {
  return postHttpJson(EndPoint.AddBudgetUrl, budget).then(response => response.data);
}

export function updateBudget(budget: BudgetModel): Promise<BudgetModel> {
  return postHttpJson(EndPoint.UpdateBudgetUrl, budget).then(response => response.data);
}
