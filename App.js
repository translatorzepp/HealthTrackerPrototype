/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <DateBanner styleStuff={styles} today={this.todayString()} />
        <View style={styles.container}>
          <Text style={styles.prompt}>What have you eaten today?</Text>
          <RecordTodaysFood></RecordTodaysFood>
        </View>
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
      foodInputs: [""],
    }
  }

  render() {
    let inputs = this.state.foodInputs.map((item, index) => {
      return(
        <FoodNameInput
          foodName={item}
          key={index}
          index={index}

          updateFoodInputs={(text, index) => {
            var newFoodInputs = this.state.foodInputs;
            newFoodInputs[index] = text;

            if (text.length >= 2 && !this._emptyInputAlreadyExists()) {
              newFoodInputs[index + 1] = "";
            }

            this.setState({
              foodInputs: newFoodInputs,
            });
          }}
        />
      );
    })

    return(
      <View>
        {inputs}
      </View>
    );
  }

  _emptyInputAlreadyExists() {
    var anyEmpty = false;
    for (const e of this.state.foodInputs) {
      if (e.length == 0) {
        anyEmpty = true;
        break;
      }
    }
    return anyEmpty;
  }
}

class FoodNameInput extends Component<Props> {
  constructor(props) {
    super(props);

    var empty = this.props.foodName.length <= 2
    this.state = {
      nameOfFood: this.props.foodName,
      foodEntered: !empty,
    }
  }

  _submitFood(text)  {
    var filledOut = text.length > 2
    this.setState({
      foodEntered: filledOut,
      nameOfFood: text
    });

    this.props.updateFoodInputs(text, this.props.index);
  }

  render() {
    var colorForBorder = this.state.foodEntered ? 'seagreen' : 'royalblue';
    var widthForBorder = this.state.foodEntered ? 1 : 2
    return (
      <TextInput
        placeholder="Name of a food"
        style={{borderColor: colorForBorder, borderWidth: widthForBorder}}
        onEndEditing={(event) => this._submitFood(event.nativeEvent.text)}
      >
        {this.state.nameOfFood}
      </TextInput>
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
