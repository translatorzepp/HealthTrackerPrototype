/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../components/App';
import RecordTodaysFood from '../components/RecordTodaysFood';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';
import AsyncStorage from '@react-native-community/async-storage';

beforeAll(() => {
  MockDate.set('09/13/2019');
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('always generates the same key for the same day', () => {
  const dateObject = renderer.create(<App />).getInstance()._todayDate();
  const dateKey = renderer.create(<RecordTodaysFood date={dateObject} startFood={[]} />).getInstance()._generateDatabaseKey(dateObject);

  expect(dateKey).toMatch('2019-09-13');
});

it('requests stored items for the day', () => {
  renderer.create(<App />);

  expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, '2019-09-13');
});

it('displays a list of food items', async () => {
  const dateObject = renderer.create(<App />).getInstance()._todayDate();
  const tree = renderer.create(<RecordTodaysFood date={dateObject} startFood={['one food','two food','red food','blue food']} />).toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  MockDate.reset();
});
