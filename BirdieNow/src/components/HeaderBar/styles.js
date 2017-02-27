import { StyleSheet } from 'react-native';
import AppConfig from 'AppConfig';

export default StyleSheet.create({
  container: {
    width: AppConfig.windowWidth,
    height: 45 + AppConfig.statusBarHeight,
  },
  headerContainer: {
    flexDirection: 'row',
    width: AppConfig.windowWidth,
    height: 45,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  statusBar: {
    height: AppConfig.statusBarHeight,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 50,
  },
  iconBack: {
    height: 21,
    width: 21,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftLabelView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightLabelView: {
    flex: 1,
    paddingRight: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
