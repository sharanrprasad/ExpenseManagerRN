// @flow
import React, { Component } from "react";
import type { NavigationScreenProp } from "react-navigation";
import UserModel from "../../models/UserModel";
import CategoryModel from "../../models/CategoryModel";
import {
  Body,
  Button,
  Container,
  Content,
  DatePicker,
  Header,
  Icon,
  Left,
  Right,
  Spinner,
  Text,
  Title,
  ListItem,
  View,
  Form,
  Item,
  Input, Label,
} from 'native-base';
import BudgetModel from "../../models/BudgetModel";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { addBudget, updateBudget } from "../../services/budgetService";
import ToastPresenter from "../../core/ToastPresenter";
import type { StoreType } from "../../models/StoreType";
import connect from "react-redux/es/connect/connect";

type AddBudgetProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    expenseCategories: Array<CategoryModel>
};

type AddBudgetState = {
    currentBudget: BudgetModel,
    isEditing: boolean,
    isAdding: boolean
};

class AddBudgetScreen extends Component<AddBudgetProps, AddBudgetState> {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        let budgetNav = this.props.navigation.getParam("current-budget");
        let isEditing = false;
        if (budgetNav) {
            isEditing = true;
        } else {
            budgetNav = new BudgetModel();
            budgetNav.userId = this.props.userData.userId;
        }
        this.state = {
            currentBudget: budgetNav,
            isEditing: isEditing,
            isAdding: false
        };
    }

    handleFormChange = name => value => {
        this.setState(prevState => {
            return  {
                ...prevState,
              // $FlowFixMe
              currentBudget : Object.assign({},prevState.currentBudget, {[name]: value})
            }
        });
    };

    updateCurrentBudget = () => {
      console.log(this.state);
        this.setState(
            {
                isAdding: true
            },
            () => {
                updateBudget(this.state.currentBudget)
                    .then(data => {
                        console.log(data);
                        this.props.navigation.goBack();
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({
                            isAdding: false
                        });
                        ToastPresenter.getToastLayout("Cannot update").build();
                    });
            }
        );
    };

    addNewBudget = () => {
        this.setState(
            {
                isAdding: true
            },
            () => {
                addBudget(this.state.currentBudget)
                    .then(data => {
                        this.props.navigation.goBack();
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({
                            isAdding: false
                        });
                        ToastPresenter.getToastLayout("Cannot update").build();
                    });
            }
        );
    };

    submitBuget = () => {
        if (this.state.isEditing) {
            this.updateCurrentBudget();
        } else {
            this.addNewBudget();
        }
    };

    render() {
        const formData = (
            <View>
                <Form>
                    <Item picker style={styles.pickerContainer}>
                      <Label style={styles.pickerLabel}>Money</Label>
                        <Input
                            secureTextEntry={false}
                            placeholder=""
                            onChangeText={text => {
                                this.handleFormChange("money")(parseFloat(text));
                            }}
                            value={this.state.currentBudget.money ? this.state.currentBudget.money.toString() : ''}
                        />
                    </Item>

                    <Item picker style={styles.pickerContainer}>
                      <Label style={styles.pickerLabel}>From Date</Label>
                        <DatePicker
                            defaultDate={new Date(Date.now())}
                            minimumDate={new Date(2017, 1, 1)}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={true}
                            androidMode={"default"}
                            locale={"en"}
                            placeHolderText="From date "
                            onDateChange={this.handleFormChange("fromDate")}
                        />

                    </Item>

                    <Item picker style={styles.pickerContainer}>
                      <Label style={styles.pickerLabel}>To Date</Label>

                        <DatePicker
                            defaultDate={new Date(Date.now())}
                            minimumDate={new Date(2017, 1, 1)}
                            timeZoneOffsetInMinutes={undefined}
                            modalTransparent={true}
                            androidMode={"default"}
                            locale={"en"}
                            placeHolderText="To date "
                            onDateChange={this.handleFormChange("toDate")}
                        />

                    </Item>

                    {this.state.isAdding ? (
                        <Spinner color="blue" last />
                    ) : (
                        <Button
                            block
                            primary
                            style={{ margin: 15, marginTop: 50 }}
                            onPress={() => {
                                this.submitBuget();
                            }}>
                            <Text>{this.state.isEditing ? "Update" : "Add" }</Text>
                        </Button>
                    )}
                </Form>
            </View>
        );

        return (
            <Container style={styles.container}>
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
                        <Title>Add/Update Budget</Title>
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

const mapStateToProps = (state: StoreType, ownProps: AddBudgetProps) => {
    return {
        userData: state.userState.userData,
        expenseCategories: state.categoriesState.categoriesList
    };
};

const mapDispatchToProps = (dispatch: *) => {
    return {};
};

const container = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBudgetScreen);
export default container;
