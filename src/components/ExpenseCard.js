// @flow
import React, { Component } from "react";
import { Card, Body, Text, CardItem, Left, Right, Button, Icon, Badge } from "native-base";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ExpenseModel from "../models/ExpenseModel";

type ExpenseCardProps = {
    expenseData: ExpenseModel,
    deleteExpense: (id: string) => mixed,
    findCategory: (id: number) => mixed
};

export default class ExpenseCard extends Component<ExpenseCardProps> {
    render() {
        const { expenseData } = this.props;
        return (
            <Card style={styles.cardContainer} key={expenseData.expenseId}>
                <CardItem header bordered>
                    <Left>
                        <Text style={{ textAlignVertical: "auto",fontWeight: 'bold' }}>
                            {this.props.findCategory(expenseData.expenseCategoryId)}
                        </Text>
                    </Left>
                    <Right />
                </CardItem>
                <CardItem cardBody bordered style = {{flexDirection:'row', justifyContent: 'space-between'}}>
                    <CardItem children >
                        <Icon  name="barcode" />
                        <Badge primary>
                            <Text>{expenseData.price}</Text>
                        </Badge>
                    </CardItem>
                    <CardItem children>
                        <Icon  name="calendar" />
                        <Text>{expenseData.expenseDate}</Text>
                    </CardItem>
                </CardItem>
                <CardItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <Left />
                    <Body />
                    <Right>
                        <Button
                            style={{ padding: 0 }}
                            iconLeft
                            transparent
                            danger
                            onPress={() => {
                                this.props.deleteExpense(expenseData);
                            }}>
                            <Icon active name="trash" />
                            <Text>Delete</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    labelText: {
        flex: 2,
        fontWeight: "bold"
    },
    dataText: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    rowFlexItem: {
        flexDirection: "row",
        flex: 1
    },
    cardContainer: {
        marginBottom: 10,
        flex: 1
    },
    cardHeader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
