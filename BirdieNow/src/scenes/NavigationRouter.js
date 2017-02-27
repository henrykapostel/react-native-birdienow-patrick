/* Setup ==================================================================== */
import React, { Component, } from 'react';
import {
  StyleSheet,
  Navigator,
  View,
  StatusBar,
  Platform,
  BackAndroid,
} from 'react-native';
import { SplashScene } from 'AppScenes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

/* Component ==================================================================== */
class _NavigationRouter extends Component {
  static propTypes = {
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.rootNavigator && this.rootNavigator.getCurrentRoutes().length > 1) {
        this.rootNavigator.pop();
        return true;
      }
      return false;
    });
    if (Platform.OS === 'ios') {
      // StatusBar.setBarStyle('light-content');
      // StatusBar.setHidden(false);
    } else {
      // StatusBar.setTranslucent(true);
      // StatusBar.setBackgroundColor('transparent');
      // if (Platform.Version >= 21) {
      //   StatusBar.setHidden(false);
      // } else {
      //   StatusBar.setHidden(true);
      // }
    }
    // StatusBar.setBarStyle('light-content');
    // if (Platform.OS === 'android') {
    //   StatusBar.setBackgroundColor('rgba(0,0,0,0.9)', true); // Android Status Bar Color
    // }
  }

  renderScene(route, navigator) {
    const methods = {
      popBack: () => navigator.pop(),
      pushScene: (component, passProps, transition) =>
        navigator.push({
          component,
          index: route.index + 1,
          transition,
          passProps,
        }),
      popToTop: () => navigator.popToTop(0),
      resetToScene: (component, passProps, transition) =>
        navigator.resetTo({
          component,
          index: route.index + 1,
          transition,
          passProps,
        }),
      getCurrentRoutes: () => navigator.getCurrentRoutes(0),
      jumpTo: (rout) => navigator.jumpTo(rout),
      replaceScene: (component) =>
        navigator.push({
          component,
          index: route.index + 1,
          transition: "FadeAndroid",
        }),
    };

    return (
      <View style={styles.container}>
        <route.component
          navigator={navigator}
          route={route}
          {...route.passProps}
          {...methods}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Navigator
            ref={(c) => { this.rootNavigator = c; }}
            style={styles.container}
            renderScene={this.renderScene}
            configureScene={(route) => {
              let config = Navigator.SceneConfigs.PushFromRight;
              if (route.transition === "FloatFromBottom") {
                config = Navigator.SceneConfigs.FloatFromBottom;
              } else if (route.transition === "FadeAndroid") {
                config = Navigator.SceneConfigs.FadeAndroid;
              }
              return { ...config, gestures: {}, };
            }}
            initialRoute={{
              component: SplashScene,
              index: 0,
              navigator: this.rootNavigator,
              passProps: {
                showSplashScreen: true,
              },
            }}
          />
        </View>
      </View>
    );
  }
}

export default _NavigationRouter;
