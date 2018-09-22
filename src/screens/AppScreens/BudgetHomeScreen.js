// @flow
import React, { Component } from "react";
import type { NavigationScreenProp } from "react-navigation";
import UserModel from "../../models/UserModel";
import CategoryModel from "../../models/CategoryModel";
import BudgetModel from "../../models/BudgetModel";
import { getCurrentBudget } from "../../services/budgetService";
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
    CardItem,
    Card,
    Badge,
    Fab
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import type { StoreType } from "../../models/StoreType";
import connect from "react-redux/es/connect/connect";
import ToastPresenter from "../../core/ToastPresenter";

type BudgetHomeScreenProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    expenseCategories: Array<CategoryModel>
};

type BudgetHomeScreenState = {
    currentBudget?: BudgetModel,
    isFetching: boolean
};

class BudgetHomeScreen extends Component<BudgetHomeScreenProps, BudgetHomeScreenState> {
    static navigationOptions = { header: null };

    constructor(props: BudgetHomeScreenProps) {
        super(props);
        this.state = {
            isFetching: false
        };
    }

    componentDidMount() {
        getCurrentBudget(this.props.userData.userId)
            .then(data => {
                this.setState({
                    currentBudget: data
                });
            })
            .catch(err => {
                console.log(err);
                ToastPresenter.getToastLayout("No Current Budget Found").build();
            });
    }

    render() {
        const fabButton = (
            <Fab
                active={true}
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: "#5067FF" }}
                position="bottomRight"
                onPress={() => {
                    this.props.navigation.navigate("AddBudgetScreen");
                }}>
                <Icon name="add" />
            </Fab>
        );

        const currentCard = this.state.currentBudget && (
            <Card>
                <CardItem header style={{ padding: 15 }}>
                    <Left >
                        <Text style ={{fontWeight: 'bold'}}>Current</Text>
                    </Left>
                    <Body />
                    <Right />
                </CardItem>
                <CardItem cardBody style={{ padding: 15, marginBottom: 15 }}>
                    <Left style={{ marginLeft: 0 }}>
                        <Text style ={{textAlign: 'left'}}>Amount</Text>
                    </Left>
                    <Right>
                        <Badge primary>
                            <Text>{this.state.currentBudget.money}</Text>
                        </Badge>
                    </Right>
                </CardItem>
                <CardItem cardBody style={{ padding: 15, marginBottom: 15  }}>
                    <Left>
                        <Icon name="calendar" />
                        <Text>From</Text>
                    </Left>
                    <Right>
                        <Badge info>
                            <Text> {this.state.currentBudget.fromDate}</Text>
                        </Badge>
                    </Right>
                </CardItem>
                <CardItem cardBody style={{ padding: 15, marginBottom: 15  }}>
                    <Left>
                        <Icon name="calendar" />
                        <Text>To</Text>
                    </Left>
                    <Right>
                        <Badge info>
                            <Text> {this.state.currentBudget.toDate}</Text>
                        </Badge>
                    </Right>
                </CardItem>

                <CardItem footer style={{ padding: 15 }}>
                    <Left>
                        <Button
                            transparent
                            warning
                            onPress={() => {
                                this.props.navigation.navigate("AddBudgetScreen", {
                                    "current-budget": Object.assign({}, this.state.currentBudget)
                                });
                            }}>
                            <Icon active name="create" />
                            <Text>Edit</Text>
                        </Button>
                    </Left>
                    <Right>
                        <Button
                            transparent
                            info
                            onPress={() => {
                                this.props.navigation.navigate("BudgetSummaryScreen", {
                                    "current-budget": Object.assign({}, this.state.currentBudget)
                                });
                            }}>
                            <Icon active name="analytics" />
                            <Text>Summary</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
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
                        <Title>Budget</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder style={{ flex: 1 }}>
                    {!this.state.isFetching ? currentCard : <Spinner color="red" />}
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
    }
});

const mapStateToProps = (state: StoreType, ownProps: BudgetHomeScreenProps) => {
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
)(BudgetHomeScreen);
export default container;
