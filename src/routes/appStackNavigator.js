// @flow
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import HomeScreen from "../screens/AppScreens/HomeScreen";
import AddCategoryModal from "../screens/AppScreens/AddCategoryModal";
import SummaryScreen from "../screens/AppScreens/SummaryScreen";
import BudgetHomeScreen from "../screens/AppScreens/BudgetHomeScreen";
import AddBudgetScreen from "../screens/AppScreens/AddBudgetScreen";
import BudgetSummaryScreen from "../screens/AppScreens/BudgetSummaryScreeen";

import AddExpenseScreen from '../screens/AppScreens/AddExpenseScreen';

const homeRoutes = {
    HomeScreen: {
        screen: HomeScreen
    },
  AddExpenseScreen : {
        screen : AddExpenseScreen
  }
};

const homeScreenNavigator = createStackNavigator(homeRoutes, {
    initialRouteName: "HomeScreen"
});

const budgetScreenNavigator = createStackNavigator(
    {
        BudgetHomeScreen: {
            screen: BudgetHomeScreen
        },
        AddBudgetScreen: {
            screen: AddBudgetScreen
        },
        BudgetSummaryScreen : {
          screen : BudgetSummaryScreen
        }
    },
    {
        initialRouteName: "BudgetHomeScreen"
    }
);

const drawerRoutes = {
    Home: {
        screen: homeScreenNavigator
    },
    Summary: {
        screen: SummaryScreen
    },
    Budgets: {
        screen: budgetScreenNavigator
    },
    Category: {
        screen: AddCategoryModal
    }
};

export default createDrawerNavigator(drawerRoutes, {
    initialRouteName: "Home"
});
