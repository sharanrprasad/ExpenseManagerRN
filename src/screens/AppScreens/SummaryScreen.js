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
    ListItem
} from "native-base";
import type { SummaryModel } from "../../models/dtoModelTypes";
import { Dimensions, StyleSheet, FlatList, View } from "react-native";
import { getSummaryData } from "../../services/summaryService";
import type { StoreType } from "../../models/StoreType";
import connect from "react-redux/es/connect/connect";

type SummaryScreenProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    expenseCategories: Array<CategoryModel>
};

type SummaryScreenState = {
    startDate?: Date,
    endDate?: Date,
    isFetching: boolean,
    summaryData?: SummaryModel
};

class SummaryScreen extends Component<SummaryScreenProps, SummaryScreenState> {
    constructor(props: SummaryScreenProps) {
        super(props);
        this.state = {
            isFetching: false,
            summaryData: null
        };
    }

    handleStateData = (name: string) => (value: any) => {
        this.setState({ [name]: value });
    };

    getSummary = () => {
        if (this.state.startDate && this.state.endDate) {
            this.setState({
                isFetching: true
            });
            //$FlowFixMe
            getSummaryData(this.state.startDate, this.state.endDate, this.props.userData.userId)
                .then(data => {
                    data.expenditureCategoryList = Object.keys(data.expenditureCategoryMap).map(
                        key => data.expenditureCategoryMap[key]
                    );
                    this.setState({
                        summaryData: data,
                        isFetching: false
                    });
                })
                .catch(err => {
                    this.setState({
                        isFetching: false
                    });
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
                    placeHolderText="From date"
                    onDateChange={this.handleStateData("endDate")}
                />
                <Button icon transparent onPress={this.getSummary}>
                    <Icon name="search" />
                </Button>
            </View>
        );

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
                        <ListItem icon>
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
                        <Title>Summary</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder style={{ flex: 1 }}>
                    {searchBar}
                    {!this.state.isFetching ? summaryRender : <Spinner color="red" />}
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

const mapStateToProps = (state: StoreType, ownProps: SummaryScreenProps) => {
    return {
        userData: state.userState.userData,
        expenseCategories: state.categoriesState.categoriesList
    };
};

const mapDispatchToProps = (dispatch: *) => {
    return {};
};

const homeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SummaryScreen);
export default homeContainer;
