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
    Form,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Spinner,
    Text,
    Title,
    View,
    Label,
    Picker
} from "native-base";
import { Dimensions, Platform, StyleSheet } from "react-native";
import type { StoreType } from "../../models/StoreType";
import connect from "react-redux/es/connect/connect";
import ExpenseModel from "../../models/ExpenseModel";
import { addExpenseService } from "../../services/expensesService";
import ToastPresenter from "../../core/ToastPresenter";

type AddExpenseProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    expenseCategories: Array<CategoryModel>
};

type AddExpenseState = {
    isFetching: boolean,
    expenseData: ExpenseModel,
    errorMessage: string
};

class AddExpenseScreen extends Component<AddExpenseProps, AddExpenseState> {
  static navigationOptions = { header: null };

  constructor(props: AddExpenseProps) {
        super(props);
        let expense = new ExpenseModel();
        expense.userId = props.userData.userId;
        expense.expenseCategoryId = props.expenseCategories[0].expenseCategoryId;
        expense.expenseDate = new Date(Date.now());
        this.state = {
            isFetching: false,
            expenseData: expense,
            errorMessage: " "
        };
    }

    handleFormChange = name => value => {
        this.setState(prevState => {
            return {
                ...prevState,
                expenseData: Object.assign({}, prevState.expenseData, { [name]: value })
            };
        });
    };

  getCategoryName = (id: number) => {
    let result = !this.props.expenseCategories ? null : this.props.expenseCategories.find(val => val.expenseCategoryId === id);
    return result ? result.name : "Expense";
  };

    submitExpense() {
        if (this.state.expenseData.price === 0 || !this.state.expenseData.expenseCategoryId) {
            this.setState({
                errorMessage: "Please select all the fields"
            });
            return;
        }
        this.setState(
            {
                isFetching: true,
                errorMessage: ""
            },
            () => {
                addExpenseService(this.state.expenseData)
                    .then(data => {
                        this.props.navigation.goBack();
                    })
                    .catch(err => {
                        console.log(err);
                        ToastPresenter.getToastLayout("Cannot add Expense").build();
                    });
            }
        );
    }

    render() {
        const formData = (
            <View>
                <Form>
                    <Item style={styles.pickerContainer} >
                        <Label style={styles.pickerLabel}>Price</Label>
                        <Input style ={styles.pickerItem}
                            secureTextEntry={false}
                            onChangeText={text => {
                                this.handleFormChange("price")(parseInt(text));
                            }}
                            value={this.state.expenseData.price ? this.state.expenseData.price.toString() : ""}
                        />
                    </Item>

                  <Item picker style={styles.pickerContainer}>
                    <Label style={styles.pickerLabel}>Payment Method :</Label>
                    <Picker
                        mode="dialog"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: undefined }}
                        placeholder="Select Payment"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.expenseData.paymentMethod}
                        onValueChange={text => {
                          this.handleFormChange("paymentMethod")(parseFloat(text))}}>
                      <Picker.Item key = {0} label="Cash" value={0} />
                      <Picker.Item key = {1} label="Check" value={1} />
                      <Picker.Item key = {2} label="Credit Card" value={2} />
                      <Picker.Item key = {3} label="Debit Card" value={3} />
                    </Picker>
                  </Item>

                  <Item picker style={styles.pickerContainer}>
                    <Label style={styles.pickerLabel}>Category :</Label>
                    <Picker
                        mode="dialog"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={{ width: undefined }}
                        placeholder="Select Category "
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.expenseData.expenseCategoryId}
                        onValueChange={text => {
                          this.handleFormChange("expenseCategoryId")(parseInt(text))}}>
                      {this.props.expenseCategories.map(category => {
                        return (
                            <Picker.Item key = {category.expenseCategoryId.toString()} label={category.name} value={category.expenseCategoryId} />
                        )
                      })}
                    </Picker>
                  </Item>

                  <Item picker style={styles.pickerContainer} last>
                    <Label style={styles.pickerLabel}>Select Date :</Label>
                    <DatePicker
                        style = {styles.pickerItem}
                        defaultDate={new Date(Date.now())}
                        minimumDate={new Date(2017, 1, 1)}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={true}
                        androidMode={"default"}
                        locale={"en"}
                        placeHolderText=""
                        onDateChange={this.handleFormChange("expenseDate")}
                    />

                  </Item>


                    {this.state.isFetching ? (
                        <Spinner color="blue" last />
                    ) : (
                        <Button
                            block
                            primary
                            style={{ margin: 15, marginTop: 50 }}
                            onPress={() => {
                                this.submitExpense();
                            }}>
                            <Text>{"Add"}</Text>
                        </Button>
                    )}
                </Form>

              <Text style = {{textAlign:'center', color:'red'}}>{this.state.errorMessage} </Text>
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
                        <Title>Add Expense</Title>
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
        flex: 1,
      paddingLeft: 0,
      marginLeft: 0
    },
    pickerLabel: {
        flex: 1,
        textAlign: "left",
        paddingLeft: 0,
      marginLeft: 0
    },
    pickerItem: {
        flex: 2,
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

const mapStateToProps = (state: StoreType, ownProps: AddExpenseProps) => {
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
)(AddExpenseScreen);
export default container;
