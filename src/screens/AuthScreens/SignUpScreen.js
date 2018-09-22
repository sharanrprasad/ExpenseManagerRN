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
    Left,
    Right
} from "native-base";
import { Dimensions, Platform, StyleSheet } from "react-native";
import type { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import React, { Component } from "react";
import UserModel from "../../models/UserModel";
import type { StoreType } from "../../models/StoreType";
import loginActions from "../../actions/loginActions";

type SignUpProps = {
    signUpUser: (data: UserModel) => mixed,
    errorState: string,
    isLoggingIn: boolean,
    signupErrorState: string
};

type SignUpState = {
    userState: UserModel,
    errorState: string
};

class SignUpScreen extends Component<SignUpProps, SignUpState> {
    static navigationOptions = { header: null };

    constructor(props: SignUpProps) {
        super(props);
        this.state = {
            userState: new UserModel(),
            errorState: ""
        };
    }

    validateForm = (): boolean => {
        if (this.state.userState.email && this.state.userState.password && this.state.userState.name) {
            return true;
        }
        this.setState({
            errorState: "Please select all the fields"
        });
        return false;
    };

    signupUser = () => {
        if (this.validateForm()) {
            this.props.signUpUser(this.state.userState);
        }
    };

    handleFormChange = name => value => {
        this.setState(prevState => {
            return {
                // $FlowFixMe
                userState: Object.assign({}, prevState.userState, {
                    [name]: value
                })
            };
        });
    };

    render() {
        const formData = (
            <View>
                <Form>
                    <Item picker style={styles.pickerContainer}>
                        <Input
                            secureTextEntry={false}
                            placeholder="Email"
                            onChangeText={text => {
                                this.handleFormChange("email")(text);
                            }}
                            value={this.state.userState.email}
                        />
                    </Item>

                    <Item picker style={styles.pickerContainer}>
                        <Input
                            secureTextEntry={false}
                            placeholder="Name"
                            onChangeText={text => {
                                this.handleFormChange("name")(text);
                            }}
                            value={this.state.userState.name}
                        />
                    </Item>

                    <Item picker style={styles.pickerContainer}>
                        <Input
                            secureTextEntry={false}
                            placeholder="Phone"
                            onChangeText={text => {
                                this.handleFormChange("phone")(text);
                            }}
                            value={this.state.userState.phone}
                        />
                    </Item>

                    <Item picker style={styles.pickerContainer}>
                        <Input
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={text => {
                                this.handleFormChange("password")(text);
                            }}
                            value={this.state.userState.password}
                        />
                    </Item>

                    {this.props.isLoggingIn ? (
                        <Spinner color="blue" last />
                    ) : (
                        <Button
                            block
                            primary
                            style={{ margin: 15, marginTop: 50 }}
                            onPress={() => {
                                this.signupUser();
                            }}>
                            <Text>Login</Text>
                        </Button>
                    )}
                </Form>
                <Text style={styles.errorLabel}>
                    {this.props.signupErrorState ? this.props.signupErrorState : this.state.errorState}
                </Text>
            </View>
        );

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            icon
                            onPress={() => {
                                //$FlowFixMe
                                this.props.navigation.goBack();
                            }}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: "center" }}>
                        <Title>Sign up</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder style={{ flex: 1 }}>
                    {formData}
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

const mapStateToProps = (state: StoreType, ownProps: SignUpProps) => {
    return {
        ...ownProps,
        isLoggingIn: state.loginState.ui.isLoggingIn,
        signupErrorState: state.loginState.ui.errorState
    };
};

const mapDispatchToProps = (dispatch: *) => {
    return {
        // $FlowFixMe
      signUpUser: (user: UserModel) => {
            dispatch(loginActions.signUpUserAction(user));
        }
    };
};

const loginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpScreen);

export default loginContainer;
