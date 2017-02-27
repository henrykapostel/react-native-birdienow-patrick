import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    height: 35,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  imageContainer: {
    width: 15,
    resizeMode: 'contain',
    marginHorizontal: 5,
    tintColor: '#8e8e93'
  },
  editContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  }
});
