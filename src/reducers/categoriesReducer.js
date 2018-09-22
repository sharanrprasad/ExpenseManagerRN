// @flow

import type { CategoriesState } from "../models/StoreType";
import type { CategoryActionType } from "../actions/categoryActions";

const initState: CategoriesState = {
    categoriesList: [],
    ui: {
        isFetching: false
    }
};
export default function categoriesReducer(state: CategoriesState = initState, action: CategoryActionType): CategoriesState {
    switch (action.type) {
        case "SET_ALL_CATEGORIES":
            return {
                ...state,
                categoriesList: action.payload
            };

        case "ADD_CATEGORY":
            return {
                ...state,
                categoriesList: [...state.categoriesList, action.payload]
            };

        case "SET_CATEGORY_UPDATING":
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isFetching: action.payload
                }
            };

        default:
            return state;
    }
}
