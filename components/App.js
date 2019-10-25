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
  _todayDate() {
    return new Date();
  }

  render() {
    const todayDate = this._todayDate();
    return (
      <View style={styles.topStyle}>
        <DateBanner today={todayDate} />
        <RecordTodaysFood date={todayDate} startFood={[]}></RecordTodaysFood>
      </View>
    );
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
