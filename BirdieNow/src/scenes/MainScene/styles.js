import { StyleSheet } from 'react-native';
import AppConfig from 'AppConfig';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppConfig.primaryColor,
  },
  scrollTabView: {
    flex: 1,
  },
  topBar: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  iconArrow: {
    width: 17,
    height: 24,
  },
  iconMore: {
    resizeMode: 'contain',
    width: 30,
    height: 20,
    marginRight: 20,
  }
});
