/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button, FlatList, Dimensions} from 'react-native';

type Props = {};

export default class App extends Component<Props> {
  render() {
    const todayDate = new Date();
    return (
      <View style={styles.topStyle}>
        <DateBanner today={todayDate} />
        <RecordTodaysFood date={todayDate}></RecordTodaysFood>
      </View>
    );
  }
}

class RecordTodaysFood extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
      todayKeyString: this.generateKeyFromDate(this.props.date),
    }
  }

  generateKeyFromDate(date) {
    date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString();
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
                <Text style={styles.foodListText}>{item.name}</Text>
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

class DateBanner extends Component<Props> {
  render() {
    return (
      <View style={styles.dateBackground}>
        <Text style={styles.dateText}>{this.todayHeaderDisplay(this.props.today)}</Text>
      </View>
    );
  }

  todayHeaderDisplay(todayDate) {
    return 'Today, ' + todayDate.toDateString();
  }
}

const styles = StyleSheet.create({
  topStyle: {
    height: Dimensions.get('window').height,
  },
  dateBackground: {
    backgroundColor: 'seagreen',
    height: '10%',
  },
  dateText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'seashell',
  },
  mainContentContainer: {
    backgroundColor: '#F5FCFF',
    height: '90%',
    alignItems: 'center',
  },
  prompt: {
    textAlign: 'center',
    color: '#333333',
  },
  foodList: {
  },
  foodListContainer: {
    alignItems: 'flex-end',
  },
  foodListEntry: {
    flexDirection: 'row',
    margin: 10,
  },
  foodListText: {
    marginRight: '10%',
  }
});
