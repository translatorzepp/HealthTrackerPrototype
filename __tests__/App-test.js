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
  const dateKey = renderer.create(<RecordTodaysFood date={dateObject} />).getInstance()._generateDatabaseKey(dateObject);

  expect(dateKey).toMatch('2019-09-13');
});

it('requests stored items for the day', () => {
  renderer.create(<App />);

  expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, '2019-09-13');
});

it('displays stored items for the day', async () => {
  // TODO: fix this test
  // This test passes but it shouldn't because the snapshot generated has no food
  // I think it's because the current implementation of the RecordTodaysFood constructor
  // means that render runs twice:
  // once with empty food, and once again when the async retrieval finishes
  // and this.state has been updated.
  await asyncStorageSetterHelper('2019-09-13', 'one food,two food,red food,blue food');
  console.log('should now have set food');
  renderer.create(<App />).toJSON();
  const tree = renderer.create(<App />).toJSON();
  await asyncStorageSetterHelper('2019-09-13', '');
  expect(tree).toMatchSnapshot();
});

async function asyncStorageSetterHelper(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('no error setting food');
  } catch (e) {
    console.log('error while trying to mock data: ' + e);
  }
}

afterAll(() => {
  MockDate.reset();
});
