import { StyleSheet } from 'react-native';
import AppConfig from 'AppConfig';

export default StyleSheet.create({
  rowContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 14,
    marginHorizontal: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: {
      height: 5,
      width: 0
    }
  },
  listRow: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleWrapper: {

  },
  imageWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden',
  },
  rowImage: {
    flex: 1,
    resizeMode: 'stretch',
    height: (AppConfig.windowWidth - 16) * 0.5,
  },
  txtTitle: {
    flex: 1,
    fontSize: 16,
    marginTop: 10
  },
  txtTitleDetail: {
    fontSize: 13,
    marginRight: 30,
  },
  contentWrapper: {
    marginLeft: 15,
    marginBottom: 10,
  },
  iconAdd: {
    width: 22,
    height: 22,
  },
  iconHeart: {
    width: 21,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#ffc400'
  },
  iconArrow: {
    width: 21,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#e23c14'
  },
  iconHeartWrapper: {
    padding: 10,
  },
  txtTicketType: {
    width: 70,
    borderRadius: 13,
    overflow: 'hidden',
    backgroundColor: '#e23c14',
    color: '#fff',
    paddingVertical: 7,
    fontSize: 10,
    textAlign: 'center'
  }
});
