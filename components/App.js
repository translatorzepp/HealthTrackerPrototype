/**
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import RecordTodaysFood from '../components/RecordTodaysFood';
import styles from '../styles';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.topStyle}>
        <DateBanner today={this.todayString()} />
        <RecordTodaysFood></RecordTodaysFood>
      </View>
    );
  }

  todayString() {
    return 'Today, ' + new Date().toDateString();
  }
}

class DateBanner extends Component<Props> {
  render() {
    return (
      <View style={styles.dateBackground}>
        <Text style={styles.dateText}>{this.props.today}</Text>
      </View>
    );
  }
}
