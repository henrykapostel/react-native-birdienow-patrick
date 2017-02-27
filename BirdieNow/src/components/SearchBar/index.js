import React, { PropTypes } from 'react';
import { View, TextInput, Image } from 'react-native';
import { styles } from './styles';

export default function SearchBar({
  placeholderColor,
  placeholder,
  onChangeText,
  searchIcon,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.editContainer}>
        {searchIcon}
        {placeholder &&
        <TextInput
          style={{ color: '#000', marginLeft: 2, flex: 1, paddingVertical: 0 }}
          fontSize={13}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={onChangeText}
        />
        }
      </View>
    </View>
  );
}

SearchBar.propTypes = {
  searchIcon: PropTypes.any,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderColor: PropTypes.string,
};

SearchBar.defaultProps = {
  searchIcon: <Image source={require('img/icon/icon_search.png')} style={styles.imageContainer} />,
  foregroundColor: 'transparent',
  editable: false,
  placeholderColor: '#8e8e93',
};
