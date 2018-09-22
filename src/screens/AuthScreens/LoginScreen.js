// @flow
import {
    Container,
    Content,
    Header,
    Body,
    Title,
    Button,
    Text,
    View,
    Icon,
    Footer,
    Form,
    Item,
    Label,
    Picker,
    Input,
    Spinner,
    Right,
    Left
} from "native-base";
import { Dimensions, Platform, StyleSheet } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import loginActions from "../../actions/loginActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import type { StoreType } from "../../models/StoreType";

type LoginScreenProps = {
    isFetching: boolean,
    isLoggingIn: boolean,
    loginErrorState: string,
    loginUser: (agentID: string, password: string) => void,
    navigation: NavigationScreenProp<any>
};

type LoginScreenState = {
    userName: string,
    password: string,
    localError: string
};
class LoginScreen extends React.Component<LoginScreenProps, LoginScreenState> {
    constructor(props: LoginScreenProps) {
        super(props);
        this.state = {
            password: "123456",
            userName: "s@g.com",
            localError: ""
        };
    }

    handleFormChange = name => value => {
        this.setState({
            [name]: value
        });
    };

    static navigationOptions = { header: null };

    loginUser = () => {
        if (this.validateLoginForm()) {
            this.props.loginUser(this.state.userName, this.state.password);
        } else {
            this.setState({
                localError: "Please Select All Fields"
            });
        }
    };

    validateLoginForm = (): boolean => {
        console.log(this.state);
        if (!this.state.userName || !this.state.password) {
            return false;
        }
        return true;
    };

    render() {
        const { isFetching, isLoggingIn } = this.props;
        const { width } = Dimensions.get("window");
        const loader = (
            <View style={styles.loaderContainer}>
                <Spinner color="blue" />
            </View>
        );

        const formData = (
            <View>
                <Form>
                    <Item picker style={styles.pickerContainer}>
                        <Input
                            secureTextEntry={false}
                            placeholder="Email"
                            onChangeText={text => {
                                this.handleFormChange("userName")(text);
                            }}
                            value={this.state.userName}
                        />
                    </Item>
                    <Item picker style={styles.pickerContainer}>
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={text => {
                                this.handleFormChange("password")(text);
                            }}
                            value={this.state.password}
                        />
                    </Item>

                    {isLoggingIn ? (
                        <Spinner color="blue" last />
                    ) : (
                        <Button
                            block
                            primary
                            style={{ margin: 15, marginTop: 50 }}
                            onPress={() => {
                                this.loginUser();
                            }}>
                            <Text>Login</Text>
                        </Button>
                    )}
                </Form>
                <Text style={styles.errorLabel}>
                    {this.props.loginErrorState ? this.props.loginErrorState : this.state.localError}
                </Text>
            </View>
        );

        return (
            <Container>
                <Header>
                    <Left />
                    <Body style={{ alignItems: "center" }}>
                        <Title>Login</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {
                                //$FlowFixMe
                                this.props.navigation.navigate("SignUpScreen");
                            }}>
                            <Text uppercase style={{ textAlign: "center" }}>
                                sign up{" "}
                            </Text>
                        </Button>
                    </Right>
                </Header>

                <Content padder style={{ flex: 1 }}>
                    <View style={{ height: 200 }}>
                        <Body style={{ alignItems: "center" }}>
                            <Icon name="flash" style={{ fontSize: 104 }} />
                            <Title>Login</Title>
                        </Body>
                    </View>

                    {isFetching ? loader : formData}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        height: Dimensions.get("window").height
    },
    container: {
        backgroundColor: "#FFF"
    },
    pickerContainer: {
        flexDirection: "row",
        flex: 1
    },
    pickerLabel: {
        flex: 1,
        textAlign: "left"
    },
    pickerItem: {
        flex: 3,
        width: Platform.OS === "ios" ? undefined : 120,
        justifyContent: "flex-end"
    },
    errorLabel: {
        color: "#ff3333",
        marginTop: 15,
        textAlign: "center",
        fontSize: 20
    }
});

const mapStateToProps = (state: StoreType, ownProps: LoginScreenProps) => {
    return {
        ...ownProps,
        isLoggingIn: state.loginState.ui.isLoggingIn,
        loginErrorState: state.loginState.ui.errorState
    };
};

const mapDispatchToProps = (dispatch: *) => {
    return {
        // $FlowFixMe
        loginUser: (username: string, password: string) => {
            dispatch(loginActions.loginUserAction(username, password));
        }
    };
};

const loginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);

export default loginContainer;
