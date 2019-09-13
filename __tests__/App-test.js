/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';

beforeAll(() =>  {
  MockDate.set('09/13/2019');
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

afterAll(() => {
  MockDate.reset();
});
