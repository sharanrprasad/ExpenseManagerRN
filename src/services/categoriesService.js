import CategoryModel from '../models/CategoryModel';
import {getHttpJson, postHttpJson} from '../utils/httpRequests';
import EndPoint from '../EndPoint';

export function getAllCategories(userId) : Promise<CategoryModel> {
  return getHttpJson(EndPoint.GetCategories, {userId} ). then(response => response.data);
}


export function  addParentCategory(data : CategoryModel) {
    return postHttpJson(EndPoint.AddCategoryParent, data).then(response => response.data);
}
