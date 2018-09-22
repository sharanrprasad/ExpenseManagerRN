// @flow
import React, {Component} from 'react';
import SplashScreen from "../screens/SplashScreen";
import AppStack from './appStackNavigator';
import AuthStack from './authStackNavigator';
import {createSwitchNavigator} from "react-navigation";

const navRoutes = {
  SplashScreen : {
          screen : SplashScreen
  },
    AppStack : {
      screen: AppStack
    },
    AuthStack : {
      screen : AuthStack
    }
};

const RootNavigator:* = createSwitchNavigator(navRoutes, {
  initialRouteName: "SplashScreen"
});

export default RootNavigator;
