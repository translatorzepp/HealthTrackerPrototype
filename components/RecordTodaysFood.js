/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, TextInput, View, Button, FlatList} from 'react-native';
import styles from '../styles';

type Props = {};

export default class RecordTodaysFood extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
    }
  }

  render() {
    let savedFoodOutputData = this.state.food.map((foodName, index) => {
      return({
        key: String(index),
        name: foodName
      });
    });

    return(
      <View style={styles.mainContentContainer}>
        <Text style={styles.prompt}>What have you eaten today?</Text>
        <FoodNameInput
          updateFoodInputs={(text) => {
            this.setState({
              food: [text, ...this.state.food]
            });
          }}
        />
          <FlatList
            style={styles.foodList}
            contentContainerStyle={styles.foodListContainer}
            data={savedFoodOutputData}
            renderItem={({item}) =>
              <View style={styles.foodListEntry}>
                <Text style={{marginRight: '10%'}}>{item.name}</Text>
                <Button
                  title="x"
                  color="red"
                  type="outline"
                  onPress={() => {
                    let indexToRemove = parseInt(item.key, 10);
                    var newFood = this.state.food;
                    newFood.splice(indexToRemove, 1);
                    this.setState({
                      food: newFood
                    });
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
      nameOfFood: "",
    }
  }

  _submitFood(text) {
    if (text.length > 0) { // TODO: check for only spaces / non-word characters
      this.props.updateFoodInputs(text);
      this.setState({
        nameOfFood: "",
      });
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
}
