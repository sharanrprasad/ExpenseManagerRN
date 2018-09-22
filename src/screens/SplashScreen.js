// @flow
import React, { Component } from "react";
import type { StoreType } from "../models/StoreType";
import { compose } from "redux";
import { connect } from "react-redux";
import userActions from "../actions/userActions";
import { Header, Container, Content, Spinner, Toast, Text } from "native-base";
import { StyleSheet, View, Dimensions } from "react-native";
import type { NavigationScreenProp } from "react-navigation";

type SplashScreenProps = {
  checkIfUserLoggedIn: () => {},
  navigation: NavigationScreenProp<any>
};

type SplashScreenState = {};

class SplashScreen extends Component<SplashScreenProps, SplashScreenState> {
  constructor(props: SplashScreenProps) {
    super(props);
  }

  static navigationOptions = { header: null };

  componentDidMount() {
    this.props.checkIfUserLoggedIn();
  }

  render() {
    const { height: screenHeight } = Dimensions.get("window");
    return (
        <Container>
          <Content>
            <View style={{ flex: 1, height: screenHeight, justifyContent: "center" }}>
              <Text style={styles.font}>ExpenseManager</Text>
              <Spinner color="red" />
            </View>
          </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 45,
    textAlign: "center"
  }
});

const mapStateToProps = (state: StoreType, props: SplashScreenProps) => {
  return {
    ...props
  };
};

const mapDispatchToProps = (dispatch: *): {} => {
  return {
    checkIfUserLoggedIn: () => {
      dispatch(userActions.checkIfUserLoggedIn());
    }
  };
};

const splashScreenContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashScreen);

export default splashScreenContainer;
