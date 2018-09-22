import { addParentCategory, getAllCategories } from "../services/categoriesService";
import CategoryModel from "../models/CategoryModel";
import ToastPresenter from "../core/ToastPresenter";
import appNavigator from "../core/appNavigator";

export type CategoryActionType =
    | {
          type: "SET_ALL_CATEGORIES",
          payload: Array<CategoryModel>
      }
    | {
          type: "ADD_CATEGORY",
          payload: CategoryModel
      }
    | {
          type: "SET_CATEGORY_UPDATING",
          payload: boolean
      };

function fetchCategories() {
    return (dispatch: *, getState: *) => {
        const userId = getState().userState.userData.userId;
        getAllCategories(userId)
            .then(data => {
                dispatch({
                    type: "SET_ALL_CATEGORIES",
                    payload: data
                });
                console.log(getState());
            })
            .catch(err => {
                console.log(err);
                ToastPresenter.getToastLayout("Cannot add Category")
                    .makeButtonToast("retry", () => {
                        dispatch(fetchCategories());
                    })
                    .build();
            });
    };
}

function fetchCategoriesAndNavigate() {
    return (dispatch: *, getState: *) => {
        const userId = getState().userState.userData.userId;
        getAllCategories(userId)
            .then(data => {
                dispatch({
                    type: "SET_ALL_CATEGORIES",
                    payload: data
                });
                appNavigator.navigate("AppStack");
            })
            .catch(err => {
                console.log(err);
                ToastPresenter.getToastLayout("Cannot add Category")
                    .makeButtonToast("retry", () => {
                        dispatch(fetchCategories());
                    })
                    .build();
            });
    };
}

function addCategory(data: CategoryModel) {
    return (dispatch: *, getState: *) => {
        dispatch(setCategoriesUpdating(true));
        addParentCategory(data)
            .then((result) => {
                dispatch(setCategoriesUpdating(false));
                dispatch({
                    type: "ADD_CATEGORY",
                    payload: result
                });
                console.log(getState());
                appNavigator.navigate("HomeScreen");
            })
            .catch(err => {
                console.log(err);
                dispatch(setCategoriesUpdating(false));
                ToastPresenter.getToastLayout("Cannot add Category").build();
            });
    };
}

function setCategoriesUpdating(val: boolean): CategoryActionType {
    return {
        type: "SET_CATEGORY_UPDATING",
        payload: val
    };
}

export default {
    fetchCategories,
    addCategory,
    fetchCategoriesAndNavigate
};
