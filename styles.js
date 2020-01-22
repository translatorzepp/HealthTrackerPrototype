import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
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
  },
});
