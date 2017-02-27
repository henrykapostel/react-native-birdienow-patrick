import { StyleSheet } from 'react-native';
import AppConfig from 'AppConfig';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "white",
    paddingHorizontal: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    width: AppConfig.windowWidth,
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgray',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  leftImageTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImageTitleViewIcon: {
    alignItems: 'center',
    width: 20,
    height: 20,
    marginLeft: 15,
    marginTop: 10
  },
  centerImageTitleView: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  rightImageTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImageTitleViewIcon: {
    alignItems: 'center',
    width: 30,
    height: 30,
  },
});
