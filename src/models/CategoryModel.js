// @flow
export default  class CategoryModel {
     expenseCategoryId:number
      name: string
      parentId:string
      userId:string
      childCategories:Array<CategoryModel>

  constructor(){
       this.name= "";
       this.parentId = "";
  }
}
