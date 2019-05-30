/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
    const d = new Date();
    this.state = {
      foodInputs: [""],
      todayKeyString: d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString()
    }
  }

  render() {
    let inputs = this.state.foodInputs.map((item, index) => {
      return(
        <FoodNameInput
          foodName={item}
          callback={(text, index) => {
            var newFoodInputs = this.state.foodInputs;
            newFoodInputs[index] = text;
            this.setState({
              foodInputs: newFoodInputs,
            });

            if (text.length >= 2 && !this._emptyInputAlreadyExists()) {
              this.setState({
                foodInputs: [...this.state.foodInputs, ""]
              });
            }
          }}

          key={index}
          index={index}
        />
      );
    })

    return(
      <View>
        {inputs}
        <Button
          title="Save today's food"
          onPress={async () => {
            console.log('*** save button pressed ***')
            try {
              // TODO: avoid calling .join on an empty array; trim off "" at the end
              await AsyncStorage.setItem(this.state.todayKeyString, this.state.foodInputs.join('|'));
              console.log('*** storage happened with key ' + this.state.todayKeyString + ' ***')
              Alert.alert(
                'Done!',
                'Saved what you\'ve eaten today.'
              );
            } catch (e) {
              console.log('*** exception ***')
              console.log(e);
              Alert.alert(
                'Problem!',
                'There was an error saving what you\'ve eaten today.'
              );
            }
          }}
        />
        <Button
          title="What did I eat today?"
          onPress={async () => {
            console.log('*** retrieve button pressed ***')
            try {
              console.log('*** retrieving key ' + this.state.todayKeyString + ' ***')
              const foodString = await AsyncStorage.getItem(this.state.todayKeyString)
              Alert.alert(
                'Today\'s Food',
                foodString
              );
            } catch (e) {
              console.log(e);
              Alert.alert(
                'Problem!',
                'There was an error retrieving what you\'ve eaten today.'
              );
            }
          }}
        />
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

    this.props.callback(text, this.props.index);
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
