// @flow
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import { createStackNavigator } from "react-navigation";
import SignUpScreen from '../screens/AuthScreens/SignUpScreen';

const navRoutes = {
    LoginScreen: {
        screen: LoginScreen
    },
    SignUpScreen : {
        screen:  SignUpScreen
    }
};

export default createStackNavigator(navRoutes, {
    initialRouteName: "LoginScreen"
});
