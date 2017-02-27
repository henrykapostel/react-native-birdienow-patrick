import { StyleSheet } from 'react-native';
import AppConfig from 'AppConfig';

export default StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  title: {
    color: '#464646',
    fontSize: 19,
    marginRight: 10,
  },
  buttonImage: {
    width: 15,
    height: 10,
    alignSelf: 'center',
  },
  body: {
  },
  icon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    tintColor: AppConfig.secondaryColor,
  }
});
