// @flow
import React, { Component } from "react";
import type { NavigationScreenProp } from "react-navigation";
import UserModel from "../../models/UserModel";
import CategoryModel from "../../models/CategoryModel";
import BudgetModel from "../../models/BudgetModel";
import { getSummaryData } from "../../services/summaryService";
import type { SummaryModel } from "../../models/dtoModelTypes";
import ToastPresenter from "../../core/ToastPresenter";
import { Body, Button, Container, Content, Header, Icon, Left, ListItem, Right, Spinner, Text, Title } from "native-base";
import { Dimensions, View } from "react-native";

import { PieChart } from "react-native-chart-kit";
import type { StoreType } from "../../models/StoreType";
import categoryActions from "../../actions/categoryActions";
import connect from "react-redux/es/connect/connect";

type BudgetSummaryProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    expenseCategories: Array<CategoryModel>
};

type BudgetSummaryState = {
    budgetData: BudgetModel,
    summaryData?: SummaryModel,
    isChartAvailable: boolean,
    chartDetails: Array<any>
};

class BudgetSummaryScreeen extends Component<BudgetSummaryProps, BudgetSummaryState> {
    static navigationOptions = { header: null };

    constructor(props: BudgetSummaryProps) {
        super(props);
        this.state = {
            budgetData: props.navigation.getParam("current-budget"),
            summaryData: null,
            isChartAvailable: false,
            chartDetails: []
        };
    }

    componentDidMount() {
        getSummaryData(this.state.budgetData.fromDate, this.state.budgetData.toDate, this.state.budgetData.userId)
            .then(data => {
                let summaryData = data;
                summaryData.expenditureCategoryList = Object.keys(summaryData.expenditureCategoryMap).map(
                    key => summaryData.expenditureCategoryMap[key]
                );
                this.setState(
                    {
                        summaryData: summaryData
                    },
                    () => {
                        this.generateChart();
                    }
                );
            })
            .catch(err => {
                console.log(err);
                ToastPresenter.getToastLayout("Failed").build();
            });
    }

    generateChart = () => {
        if (this.state.summaryData) {
            const balance = this.state.budgetData.money - this.state.summaryData.totalExpenditure;

            const randomColor = () => ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(0, 7);

            let pieChartData = [];
            if (balance >= 0) {
                const dynamicColor = this.dynamicColors();
                pieChartData.push({
                    expense: balance,
                    name: "balance",
                    color: randomColor(),
                    legendFontColor: randomColor(),
                    legendFontSize: 15
                });
            }

            this.state.summaryData.expenditureCategoryList.forEach(cat => {
                pieChartData.push({
                    name: cat.expenseCategory.name,
                    expense: cat.categoryExpenditure,
                    color: randomColor(),
                    legendFontColor: randomColor(),
                    legendFontSize: 15
                });
            });

            this.setState({
                chartDetails: pieChartData,
                isChartAvailable: true
            });
        }
    };

    dynamicColors = () => {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    render() {
        const width = Dimensions.get("window").width;

        const summaryRender = this.state.summaryData && (
            <View style={{ flex: 1 }}>
                <ListItem icon>
                    <Left>
                        <Icon name="leaf" />
                    </Left>
                    <Body>
                        <Text>Total Expenditure </Text>
                    </Body>
                    <Right>
                        <Text>{this.state.summaryData.totalExpenditure}</Text>
                    </Right>
                </ListItem>
                {this.state.summaryData.expenditureCategoryList.map(val => {
                    return (
                        <ListItem icon key={val.expenseCategory.expenseCategoryId.toString()}>
                            <Left>
                                <Icon name="barcode" />
                            </Left>
                            <Body>
                                <Text>{val.expenseCategory.name} </Text>
                            </Body>
                            <Right>
                                <Text>{val.categoryExpenditure}</Text>
                            </Right>
                        </ListItem>
                    );
                })}
            </View>
        );

        const pieChart = this.state.isChartAvailable && (
            <PieChart
                data={this.state.chartDetails}
                height = {220}
                width = {width - 20}
                accessor="expense"
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: '#fb8c00',
                  backgroundGradientTo: '#ffa726',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                style={{
                  marginVertical: 8,
                  marginTop: 15,
                }}
            />
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
                        <Title>Summary</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder style={{ flex: 1 }}>
                    {this.state.isChartAvailable ? (
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            {summaryRender}
                            {pieChart}
                        </View>
                    ) : (
                        <Spinner color="red" />
                    )}
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state: StoreType, ownProps: BudgetSummaryProps) => {
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
)(BudgetSummaryScreeen);
export default container;
