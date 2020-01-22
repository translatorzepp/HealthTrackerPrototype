/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, TextInput, View, Button, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../styles';

type Props = {};

export default class RecordTodaysFood extends Component<Props> {
  constructor(props) {
    super(props);

    const dateKey = this._generateDatabaseKey(this.props.date);

    this.state = {
      food: [],
      todayKeyString: dateKey,
    };

    this._retrieveFoodFromDatabase(dateKey)
      .then((foodString) => {
        if (foodString) { // TODO: is this OK?
          this.setState({
            food: foodString.split(','),
          });
        }
      });
  }

  _generateDatabaseKey(dateObject) {
    // ISO-8601 date format, without time: YYYY-MM-DD
    return dateObject.toISOString().slice(0, 10);
  }

  _setFood(newFoodArray) {
    this.setState({
      food: newFoodArray,
    });
    this._saveFoodToDatabase(newFoodArray);
  }

  async _saveFoodToDatabase(food) {
    try {
      const valueToStore = this._convertFoodListToJsonString(food);
      await AsyncStorage.setItem(this.state.todayKeyString, valueToStore);
    } catch (e) {
      console.log('*** exception while attempting to save to database ***');
      console.log(e);
      Alert.alert(
        'Problem!',
        'There was an error saving what you\'ve eaten today.'
      );
    }
  }

  _convertFoodListToJsonString(food) {
    // TODO: escape commas, then actually structure this
    return food.toString();
  }

  async _retrieveFoodFromDatabase(key) {
    try {
      console.log('*** attempting retrieval of key: ' + key);
      const foodString = await AsyncStorage.getItem(key);
      console.log('*** retrieved food: ' + foodString);
      return foodString;
    } catch (e) {
      console.log('*** exception while attempting to retrieve from database ***');
      console.log(e);
      Alert.alert(
        'Problem!',
        'There was an error retrieving what you\'ve eaten today.'
      );
      return '';
    }
  }

  render() {
    let savedFoodOutputData = this.state.food.map((foodName, index) => {
      return({
        key: String(index),
        name: foodName,
      });
    });
    console.log('food in render method: ' + this.state.food.toString());

    return(
      <View style={styles.mainContentContainer}>
        <Text style={styles.prompt}>What have you eaten today?</Text>
        <FoodNameInput
          updateFoodInputs={(text) => {
            const newFood = [text, ...this.state.food];
            this._setFood(newFood);
          }}
        />
          <FlatList
            style={styles.foodList}
            contentContainerStyle={styles.foodListContainer}
            data={savedFoodOutputData}
            renderItem={({item}) =>
              <View style={styles.foodListEntry}>
                <Text style={styles.foodListText}>{item.name}</Text>
                <Button
                  title="x"
                  color="red"
                  type="outline"
                  onPress={() => {
                    let indexToRemove = parseInt(item.key, 10);
                    var newFood = this.state.food;
                    newFood.splice(indexToRemove, 1);
                    this._setFood(newFood);
                  }}
                  accessibilityLabel="Delete this Food Entry"
                />
              </View>
            }
        />
      </View>
    );
  }
}

class FoodNameInput extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      nameOfFood: '',
    }
  }

  render() {
    var colorForBorder = (this.state.nameOfFood.length > 0) ? 'seagreen' : 'royalblue';
    return (
      <View style={{marginBottom: '5%'}} >
        <TextInput
          placeholder="Name of a food"
          style={{borderColor: colorForBorder, borderWidth: 2}}
          onChangeText={(text) => this.setState({nameOfFood: text})}
        >
          {this.state.nameOfFood}
        </TextInput>
        <Button
          title="Save Food"
          onPress={() => this._submitFood(this.state.nameOfFood)}
          accessibilityLabel="Save Food"
        />
      </View>
    )
  }

  _submitFood(text) {
    if (text.length > 0) { // TODO: check for only spaces / non-word characters
      this.props.updateFoodInputs(text);
      this.setState({
        nameOfFood: '',
      });
    }
  }
}
