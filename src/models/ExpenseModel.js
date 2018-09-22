
export default  class ExpenseModel {
  expenseId: number;
  price : number;
  userId: string;
  expenseCategoryId : number;
  paymentMethod : number;
  expenseDate: Date;

  constructor(){
    this.price = 0;
    this.userId = '';
    this.paymentMethod = 0;

  }

}
