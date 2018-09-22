import { Component } from "react";
import { NavigationScreenProp } from "react-navigation";
import UserModel from "../../models/UserModel";
import CategoryModel from '../../models/CategoryModel';
import {Dimensions, StyleSheet, FlatList, View, Platform} from 'react-native';
import {
  Body,
  Button,
  Container, Content,
  Header,
  Icon,
  Left,
  Right, Text,
  Title,
  Spinner, Form, Item, Input,
} from 'native-base';
import React from 'react';
import type {StoreType} from '../../models/StoreType';
import categoryActions from '../../actions/categoryActions';
import connect from 'react-redux/es/connect/connect';

type AddCategoryModalProps = {
    navigation: NavigationScreenProp<{}>,
    userData: UserModel,
    addCategory: () => mixed,
    isLoading : boolean
};

type AddCategoryModalState = {
    categoryName : string,
    errorMessage : string
}


class AddCategoryModal extends Component<AddCategoryModalProps,AddCategoryModalState> {
  static navigationOptions = { header: null };

  constructor(props: AddCategoryModalProps) {
        super(props);
        this.state = {
            categoryName : "",
            errorMessage: ""
        };
    }

    submitNewCategory = () => {
      this.setState({
        errorMessage : !this.state.categoryName ? "Please enter the name" : ""
      });
      if(this.state.categoryName){
          let categoryData  = new CategoryModel();
          categoryData.name = this.state.categoryName;
          categoryData.userId =  this.props.userData.userId;
          categoryData.parentId = null;
          this.props.addCategory(categoryData);
      }
    }

  handleFormChange = name => value => {
    this.setState({
      [name]: value
    });
  };


    render(){


      const form = (
          <View style={{flex:1}}>
            <Form>
              <Item picker style={styles.pickerContainer}>
                <Input
                    secureTextEntry={false}
                    placeholder="Name"
                    onChangeText={text => {
                      this.handleFormChange("categoryName")(text);
                    }}
                    value={this.state.userName}
                />
              </Item>

              {this.props.isLoading ? (
                  <Spinner color="blue" last />
              ) : (
                  <Button
                      block
                      primary
                      style={{ margin: 15, marginTop: 50 }}
                      onPress={() => {
                        this.submitNewCategory();
                      }}>
                    <Text>Submit</Text>
                  </Button>
              )}
            </Form>
            <Text style={styles.errorLabel}>
              {this.state.errorMessage}
            </Text>
          </View>

      );

      return (
          <Container>
            <Header>
              <Left >
                <Button transparent icon onPress = {() => {
                  //$FlowFixMe
                  this.props.navigation.toggleDrawer();
                }}>
                  <Icon name="menu" />

                </Button>

              </Left>
              <Body style={{ alignItems: "center" }}>
              <Title>Add Category</Title>
              </Body>
              <Right />
            </Header>
            <Content padder>
              {form}
            </Content>
          </Container>
      )
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
    flex :1,
  },
  pickerLabel : {
    flex : 1,
    textAlign: 'left'
  },
  pickerItem : {
    flex : 3,
    width : Platform.OS === 'ios'? undefined : 120,
    justifyContent: 'flex-end'

  },
  errorLabel: {
    color: '#ff3333',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,

  }
});

const mapStateToProps = (state: StoreType, ownProps: HomeScreenProps) => {
  return {
    userData: state.userState.userData,
    isLoading: state.categoriesState.ui.isFetching
  };
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    addCategory: (model) => {
      dispatch(categoryActions.addCategory(model));
    },
  };
};

const addCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategoryModal);
export default addCategoryContainer;

