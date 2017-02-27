import { StyleSheet } from 'react-native';
import AppConfig from 'AppConfig';
import Dimensions from 'Dimensions';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#7dcefb",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 70,
  },
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
    marginTop: 20
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
  },
  txtSection: {
    flex: 1,
    width: 70,
    borderRadius: 13,
    overflow: 'hidden',
    color: '#000',
    paddingVertical: 7,
    fontSize: 10,
    textAlign: 'right',
    marginRight: 10
  },
  loadingScene: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
