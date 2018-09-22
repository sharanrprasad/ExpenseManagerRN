// @flow

import React from 'react';
import {NetInfo, StyleSheet, View} from 'react-native';
import {Root, Text} from 'native-base';
import RootNavigator from './src/routes';
import {Provider} from 'react-redux';
import store from './src/store';
import appNavigator from './src/core/appNavigator';
import appNetInfo from "./src/core/appNetInfo";


type AppState = {
  isReady: boolean
};

export default class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount(){
    let connectionInfo = await NetInfo.getConnectionInfo();
    appNetInfo.setCurrentNetInfo(connectionInfo);
    NetInfo.addEventListener("connectionChange", appNetInfo.handleConnectivityChange);
    this.setState({
      isReady :true
    });
  }

  render() {
    if(!this.state.isReady){
      return null;
    }

    return (
        <Root>
          <Provider store={store}>
            <RootNavigator
                ref={navigatorRef => {
                  appNavigator.setTopLevelNavigator(navigatorRef);
                }}
            />
          </Provider>
        </Root>
    );
  }
}

