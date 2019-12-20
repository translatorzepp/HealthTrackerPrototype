/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';
import AsyncStorage from '@react-native-community/async-storage';

beforeAll(() =>  {
  MockDate.set('09/13/2019');
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('requests stored items for the day', () => {
  const app = renderer.create(<App />);

  expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, '20190913')
  expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(2, '20190913')
});

// it('displays stored items for the day', () => {
//   const tree = renderer.create(<App />).toJSON();
//   // TODO: mock retrieved data
//   expect(tree).toMatchSnapshot();
// });

afterAll(() => {
  MockDate.reset();
});
