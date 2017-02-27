import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  tabs: {
    height: 55,
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopColor: '#e7e7e7',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  iconTab: {
    width: 22,
    resizeMode: 'contain',
    flex: 1,
  },
  txtTab: {
    fontSize: 12,
  }
});
