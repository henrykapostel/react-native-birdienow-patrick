import React, { PropTypes, Component } from 'react';
import { ActivityIndicator, Alert, TextInput, View, StatusBar, Text, TouchableHighlight} from 'react-native';
import styles from './styles';
import _, { isEqual } from 'lodash';
import { RegisterScene, SplashScene, MainScene } from 'AppScenes';
import { SignIn } from 'AppUtilities';
import AppConfig from 'AppConfig';

class LoginScene extends Component {
  static propTypes = {
    pushScene: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: false,
    };

    StatusBar.setHidden(false);
    this.OnSignIn = this.OnSignIn.bind(this);
    this.grant_type = "password";
    this.username = "";
    this.password = "";
  }

  OnSignIn(){
    this.setState({ isLoading: true });
    SignIn(this.grant_type, this.username, this.password)
      .then((response) => {
        if (!response.error_description) { //success 200
         // Alert.alert(response.access_token);
          AppConfig.global_userToken = response.access_token; // set the user token
          this.props.pushScene(MainScene);
        } else { // failed 400
          // Alert.alert("error1");
          Alert.alert(response.error_description);
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        Alert.alert("error2");
        // Alert.alert(error.message);
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topLabel}>ALREADY A MEMBER?</Text>
        <TextInput
          style={styles.inputEmail}
          fontSize={17}
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText={(text) => {this.username = text}}
        />
        <TextInput
          style={styles.inputEmail}
          fontSize={17}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          onChangeText={(text) => {this.password = text}}
        />
        <Text style={styles.forgotLabel}>Forgot your password?</Text>
        <View style={{ flexDirection: 'row', marginTop: 5, alignSelf: 'flex-end' }}>
          <TouchableHighlight
            onPress={() => {this.props.pushScene(RegisterScene)}}
            style={{ marginRight: 10 }}
            underlayColor="#bde7ff" >
            <Text style={styles.btnLogin}>REGISTER</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.OnSignIn}
            underlayColor="#bde7ff" >
            <Text style={styles.btnLogin}>LOGIN</Text>
          </TouchableHighlight>
        </View>
        {this.state.isLoading ?
          <View style={styles.loadingScene}>
            <ActivityIndicator
              animating={true}
              size="large"
              color="white"
            />
          </View> : null}
      </View>
    );
  }
}

export default LoginScene;
