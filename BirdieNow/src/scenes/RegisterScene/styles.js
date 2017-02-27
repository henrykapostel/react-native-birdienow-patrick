import { StyleSheet } from 'react-native';
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
  topLabel: {
    alignSelf: 'stretch',
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  inputEmail: {
    marginTop: 10,
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputPassword: {
    marginTop: 10,
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: '#faffbd',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#008000',
    borderRadius: 5,
  },
  forgotLabel: {
    marginTop: 15,
    color: '#fff',
    fontSize: 16,
    alignSelf: 'stretch'
  },
  btnLogin: {
    color: '#fff',
    fontSize: 17,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 7,
    paddingTop: 10,
    paddingBottom: 7,
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
