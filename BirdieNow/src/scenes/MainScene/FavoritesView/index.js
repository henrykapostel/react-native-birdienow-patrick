import React, { Component, PropTypes } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, ListView, RefreshControl } from 'react-native';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';
import { SearchBar } from 'AppComponents';
import { FilterScene, ListDetailScene, } from 'AppScenes';
import { RequestApi, MakeCancelable, GlobalStorage } from 'AppUtilities';
import _, { isEqual } from 'lodash';

class FavoritesView extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isRefreshing: false,
    };

  }

  render() {
    return (
      <View style={ styles.container }>
      </View>
    );
  }
}

export default FavoritesView;
