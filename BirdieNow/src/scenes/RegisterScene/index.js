import React, { PropTypes, Component } from 'react';
import { ActivityIndicator, Alert, TextInput, View, StatusBar, Text, TouchableHighlight} from 'react-native';
import styles from './styles';
import _, { isEqual } from 'lodash';
import { MainScene } from 'AppScenes';
import { SignUp } from 'AppUtilities';

class RegisterScene extends Component {
  static propTypes = {
    popBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.email = "";
    this.password = "";
    this.confirmPassword = "";
    this.firstName = "";
    this.lastName = "";
    this.phoneNumber = "";

    this.state = {
      isLoading: false,
    };

    this.OnSignUp = this.OnSignUp.bind(this);
  }

  OnSignUp(){
    this.setState({ isLoading: true });
    SignUp(this.email, this.password, this.confirmPassword, this.firstName, this.lastName, this.phoneNumber)
      .then((response) => {
        if (!response) {
//          Alert.alert("Registered Successfully!");
          this.props.popBack();
        } else {
          Alert.alert(response.message);
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        Alert.alert(error.message);
        this.setState({ isLoading: false });
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topLabel}>CREATE AN ACCOUNT</Text>
        <TextInput style={styles.inputEmail} fontSize={17} placeholder="Email Address" placeholderTextColor="#999" onChangeText={(text) => {this.email = text}} />
        <TextInput
          style={styles.inputEmail}
          fontSize={17}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          onChangeText={(text) => {this.password = text}}
        />
        <TextInput
          style={styles.inputEmail}
          fontSize={17}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          onChangeText={(text) => {this.confirmPassword = text}}
        />
        <TextInput style={styles.inputEmail} fontSize={17} placeholder="First Name (required)" placeholderTextColor="#999" onChangeText={(text) => {this.firstName = text}} />
        <TextInput style={styles.inputEmail} fontSize={17} placeholder="Last Name (required)" placeholderTextColor="#999" onChangeText={(text) => {this.lastName = text}} />
        <TextInput style={styles.inputEmail} fontSize={17} placeholder="Phone Number (required)" placeholderTextColor="#999"
          keyboardType="phone-pad" onChangeText={(text) => {this.phoneNumber = text}} />
        <View style={{ flexDirection: 'row', marginTop: 5, alignSelf: 'flex-end' }}>
          <TouchableHighlight
            onPress={() => {this.props.popBack();}}
            style={{ marginRight: 10 }}
            underlayColor="#bde7ff" >
            <Text style={styles.btnLogin}>BACK</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.OnSignUp}
            underlayColor="#bde7ff" >
            <Text style={styles.btnLogin}>SIGN UP</Text>
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

export default RegisterScene;
