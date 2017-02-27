import React, { Component, PropTypes } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, ListView, RefreshControl, Navigator } from 'react-native';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';
import { search, searchResult, profile } from 'AppComponents';
import { FilterScene, ListDetailScene, } from 'AppScenes';
import { RequestApi, MakeCancelable, GlobalStorage } from 'AppUtilities';
import _, { isEqual } from 'lodash';

var ROUTES = {
  searchResult: searchResult,
  search: search,
  profile: profile
};

class SearchView extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isRefreshing: false,
    };


  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'search'}}
        renderScene={this.renderScene}
        configureScene={(route) => ({
          ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight
        })}
      />
    );
  }
}

export default SearchView;
