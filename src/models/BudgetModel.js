// @flow
export default  class BudgetModel {
  budgetId:number;
  money:number;
  fromDate: Date;
  toDate: Date;
  userId : string;

  constructor(){
    this.money = 0;
    this.fromDate = new Date();
    this.toDate = new Date();
    this.userId = '';
  }
}
