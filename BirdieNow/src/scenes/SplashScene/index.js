import React, { PropTypes, Component } from 'react';
import { Text, View, Image, StatusBar } from 'react-native';
import { default as Spinner } from 'react-native-spinkit';
import { default as styles} from './styles';
import { LoginScene, MainScene } from 'AppScenes';

class SplashScene extends Component {
  static propTypes = {
    resetToScene: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    StatusBar.setHidden(true);

    setTimeout(() => {
        this.props.resetToScene(LoginScene, null, "FadeAndroid");
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 50, marginBottom: 100}}>BirdieNow</Text>
        <Spinner style={styles.spinner} type="FadingCircleAlt" color="#4c616f" />
      </View>
    );
  }
}

export default SplashScene;
