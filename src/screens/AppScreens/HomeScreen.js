// @flow
import React, { Component } from "react";
import type { StoreType } from "../../models/StoreType";
import { deleteExpenseService, getAllExpensesService, getTopExpenses } from "../../services/expensesService";
import ExpenseModel from "../../models/ExpenseModel";
import UserModel from "../../models/UserModel";
import { connect } from "react-redux";
import type { NavigationScreenProp } from "react-navigation";
import { Body, Button, Container, Content, Header, Left, Right, Text, Title, DatePicker, Icon, Fab, Spinner } from "native-base";
import { Dimensions, StyleSheet, FlatList, View } from "react-native";
import CategoryModel from "../../models/CategoryModel";
import ExpenseCard from "../../components/ExpenseCard";
import ToastPresenter from "../../core/ToastPresenter";
import categoryActions from "../../actions/categoryActions";

type HomeScreenProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    fetchCategories: () => mixed,
    isCategoriesFetching: boolean,
    categoriesList: Array<CategoryModel>
};

type HomeScreenState = {
    expenseList: Array<ExpenseModel>,
    startDate?: Date,
    endDate?: Date,
    isFetching: boolean
};

class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    static navigationOptions = { header: null };
    didFocusSubscription : any;

    constructor(props: HomeScreenProps) {
        super(props);
        this.state = {
            expenseList: [],
            categoryList: [],
            isFetching: false
        };
    }

    componentDidMount() {
       this.didFocusSubscription =  this.props.navigation.addListener('didFocus', payload => {
            this.reloadPage();
        })
        this.reloadPage();
    }

     componentWillUnmount(){
        this.didFocusSubscription.remove();
    }

    reloadPage = () => {
        this.setState({
            isFetching: true
        });
        getTopExpenses(this.props.userData.userId)
            .then(expenseData => {
                this.setState({
                    expenseList: expenseData,
                    isFetching: false
                });
            })
            .catch(err => {
                this.setState({
                    isFetching: false
                });
                console.log(err.response);
                ToastPresenter.getToastLayout("Cannot fetch Expenses").build();
            });
    };

    getCategoryName = (id: number) => {
        let result = !this.props.categoriesList ? null : this.props.categoriesList.find(val => val.expenseCategoryId === id);
        return result ? result.name : "Expense";
    };

    handleStateData = (name: string) => (value: any) => {
        this.setState({ [name]: value });
    };

    deleteExpense = (expenseData: ExpenseModel) => {
        deleteExpenseService(expenseData.expenseId)
            .then(() => {
                let index = this.state.expenseList.indexOf(expenseData);
                console.log("Index -- ", index);
                if (index !== -1) {
                    let expenseTemp = [...this.state.expenseList];
                    expenseTemp.splice(index, 1);
                    this.setState({
                        expenseList: expenseTemp
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    renderJobCards = ({ item }: any) => (
        <ExpenseCard expenseData={item} deleteExpense={this.deleteExpense} findCategory={this.getCategoryName} />
    );

    getExpensesBydate = () => {
        this.setState({
            isFetching: true
        });

        if(this.state.startDate && this.state.endDate) {
          getAllExpensesService(this.state.startDate, this.state.endDate,
              this.props.userData.userId).then(data => {
            this.setState({
              expenseList: data,
              isFetching: false
            });
          }).catch(err => {
            this.setState({
              isFetching: false
            });

            ToastPresenter.getToastLayout("Nothing found").build();
          });

        }
    };

    render() {
        const searchBar = (
            <View style={styles.searchContainer}>
                <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2017, 1, 1)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    androidMode={"default"}
                    placeHolderText="From date"
                    onDateChange={this.handleStateData("startDate")}
                />
                <DatePicker
                    defaultDate={new Date(2018, 4, 4)}
                    minimumDate={new Date(2017, 1, 1)}
                    locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    androidMode={"default"}
                    placeHolderText="To date"
                    onDateChange={this.handleStateData("endDate")}
                />
                <Button icon transparent onPress = {this.getExpensesBydate}>
                    <Icon name="search" />
                </Button>
            </View>
        );

        const expenseRender = (
            <FlatList
                data={this.state.expenseList}
                renderItem={this.renderJobCards}
                keyExtractor={(item, index) => item.expenseId.toString()}
            />
        );

        const fabButton = (
            <Fab
                active={true}
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: "#5067FF" }}
                position="bottomRight"
                onPress={() => {
                    console.log("Clicked");
                    this.props.navigation.navigate("AddExpenseScreen")
                }}>
                <Icon name="add" />
            </Fab>
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
                                this.props.navigation.toggleDrawer();
                            }}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: "center" }}>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.navigate("AuthStack");
                            }}>
                            <Text style={{ textAlign: "center" }}>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content padder style={{ flex: 1 }}>
                    {searchBar}
                    {!this.state.isFetching ? expenseRender : <Spinner color="red" />}
                </Content>
                {fabButton}
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
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        flexShrink: 1,
        marginBottom: 10,
        justifyContent: "space-between"
    },
    searchText: {
        height: 40
    }
});

const mapStateToProps = (state: StoreType, ownProps: HomeScreenProps) => {
    return {
        userData: state.userState.userData,
        categoriesList: state.categoriesState.categoriesList,
        isCategoriesFetching: state.categoriesState.ui.isFetching
    };
};

const mapDispatchToProps = (dispatch: *) => {
    return {
        //$FlowFixMe
        fetchCategories: () => {
            dispatch(categoryActions.fetchCategories());
        }
    };
};

const homeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
export default homeContainer;
