/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button} from 'react-native';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <DateBanner styleStuff={styles} today={this.todayString()} />
        <RecordTodaysFood></RecordTodaysFood>
      </View>
    );
  }

  todayString() {
    return 'Today, ' + new Date().toDateString();
  }
}

class RecordTodaysFood extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      food: [],
    }
  }

  render() {
    let savedFoodOutput = this.state.food.map((item, index) => {
      return(
        <Text key={index}>{item}</Text>
      );
    });

    return(
      <View style={styles.container}>
        <Text style={styles.prompt}>What have you eaten today?</Text>
        <FoodNameInput
          updateFoodInputs={(text) => {
            this.setState({
              food: [text, ...this.state.food]
            });
          }}
        />
        {savedFoodOutput}
      </View>
    );
  }
}

class FoodNameInput extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      nameOfFood: "",
      foodEntered: false,
    }
  }

  _submitFood(text, isEmpty) {
    if (!isEmpty) {
      this.props.updateFoodInputs(text);
    }
  }

  render() {
    var colorForBorder = this.state.foodEntered ? 'seagreen' : 'royalblue';
    return (
      <View>
        <TextInput
          placeholder="Name of a food"
          style={{borderColor: colorForBorder, borderWidth: 2}}
          onChangeText={(text) => this.setState({nameOfFood: text, foodEntered: text.length == 0})}
        >
          {this.state.nameOfFood}
        </TextInput>
        <Button
          title="Save Food"
          onPress={() => this._submitFood(this.state.nameOfFood, this.state.foodEntered)}
          accessibilityLabel="Save Food"
        />
      </View>
    )
  }
}

class DateBanner extends Component<Props> {
  render() {
    return (
      <View style={this.props.styleStuff.dateBackground}>
        <Text style={this.props.styleStuff.dateText}>{this.props.today}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateBackground: {
    width: '100%',
    height: '20%',
    backgroundColor: 'seagreen',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  dateText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'seashell',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  prompt: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: '4%',
  },
});
