import React, { Component, PropTypes } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, ListView, RefreshControl, ScrollView, TextInput } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import StarRating from 'react-native-star-rating';
import { CheckboxField, Checkbox } from 'react-native-checkbox-field';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';
import { SearchBar, HeaderBar } from 'AppComponents';
import { FilterScene, ListDetailScene, } from 'AppScenes';
import { RequestApi, MakeCancelable, GlobalStorage } from 'AppUtilities';
import _, { isEqual } from 'lodash';
import Dimensions from 'Dimensions';

class AppointmentsDetailScene extends Component {
  static propTypes = {
    popBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isRefreshing: false,
      radioOptionType: [{label: 'Beginner', value: 0}, {label: 'Bogey Player', value: 1}, {
        label: 'Single Handicap',
        value: 2
      }, {label: 'Scratch Player', value: 3}],
      value1: 0,
      value1Index: 0,
      starCount: 0,
      checkBox1Selected: false,
      checkBox1Label: 'Setup',
      checkBox2Selected: false,
      checkBox2Label: 'Putting',
      checkBox3Selected: false,
      checkBox3Label: 'Irons',
      checkBox4Selected: false,
      checkBox4Label: 'Pitch Shots',
      checkBox5Selected: false,
      checkBox5Label: 'Driver',
      checkBox6Selected: false,
      checkBox6Label: 'Sand Shots',
      checkBox7Selected: false,
      checkBox7Label: 'Chipping',
      currentText: ''
    };
    // Alert.alert(AppConfig.global_userToken);
    this.onStarRatingPress = this.onStarRatingPress.bind(this);
    this.selectCheckbox1 = this.selectCheckbox1.bind(this);
    this.selectCheckbox2 = this.selectCheckbox2.bind(this);
    this.selectCheckbox3 = this.selectCheckbox3.bind(this);
    this.selectCheckbox4 = this.selectCheckbox4.bind(this);
    this.selectCheckbox5 = this.selectCheckbox5.bind(this);
    this.selectCheckbox6 = this.selectCheckbox6.bind(this);
    this.selectCheckbox7 = this.selectCheckbox7.bind(this);
    this.onChangeTextField = this.onChangeTextField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  onSubmit() {
    if (this.state.currentText == "") {
      Alert.alert("Please enter your comment");
    } else {
      this.props.popBack();
    }
  }

  selectCheckbox1() {
    this.setState({
      checkBox1Selected: !this.state.checkBox1Selected
    });
  }

  selectCheckbox2() {
    this.setState({
      checkBox2Selected: !this.state.checkBox2Selected
    });
  }

  selectCheckbox3() {
    this.setState({
      checkBox3Selected: !this.state.checkBox3Selected
    });
  }

  selectCheckbox4() {
    this.setState({
      checkBox4Selected: !this.state.checkBox4Selected
    });
  }

  selectCheckbox5() {
    this.setState({
      checkBox5Selected: !this.state.checkBox5Selected
    });
  }

  selectCheckbox6() {
    this.setState({
      checkBox6Selected: !this.state.checkBox6Selected
    });
  }

  selectCheckbox7() {
    this.setState({
      checkBox7Selected: !this.state.checkBox7Selected
    });
  }

  onChangeTextField(text) {
    this.setState({
      currentText: text
    });
  }

  componentDidMount() {
    this.onChangeTextField("");
  }

  render() {
    const defaultColor = '#fff';
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.leftImageTitleView}>
            <TouchableOpacity
              onPress={() => {this.props.popBack();}}
            >
              <Image source={require('img/icon/icon_back.png')} style={styles.leftImageTitleViewIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.centerImageTitleView}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              Rating Page
            </Text>
          </View>
          <View style={styles.rightImageTitleView}>
            <TouchableOpacity>
              {/*<Image source={require('img/icon/icon_arrow.png')} style={styles.rightImageTitleViewIcon} />*/}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: 5}}/>

        <ScrollView>
          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginTop: 20}}>REVIEW: Derrick</Text>
          <Text style={{fontSize: 13, color: "black", marginLeft: 20, marginTop: 5}}>Lesson on: Sat, Fab 25, 2017 9:00 AM - 10:00 AM</Text>
          <Image source={require('img/image/photo.png')} style={{ width: 100, height: 100, marginLeft: 30, marginTop: 10}} />

          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginTop: 5}}>YOUR SKILL LEVEL</Text>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <RadioForm
              ref="radioForm"
              radio_props={this.state.radioOptionType}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              buttonColor={'#2196f3'}
              labelColor={'#000'}
              animation={true}
              onPress={(value, index) => {
              this.setState({
                value1:value,
                value1Index:index
              })
            }}
            />
          </View>

          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginRight: 20, marginTop: 20}}>1. HOW WAS THE LESSON?</Text>
          <View style={{flexDirection: 'row', height: 30, marginTop: 5}}>
            <View style={{flex: 1}}/>
            <View style={{flex: 1}}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet="Ionicons"
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
                starColor={'red'}
                emptyStarColor={'blue'}
                starSize={20}
              />
            </View>
            <View style={{flex: 1}}/>
          </View>

          <Text style={{fontSize: 16, color: "black", marginLeft: 20, marginTop: 15, marginRight: 20}}>2. WHAT WAS THE FOCUS ON THE LESSON? SELECT UP TO TWO.</Text>
          <View style={{flexDirection: 'row', height: 30}}>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox1Label}
                onSelect={this.selectCheckbox1}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox1Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 10}}>{this.state.checkBox1Label}</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox2Label}
                onSelect={this.selectCheckbox2}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox2Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 10}}>{this.state.checkBox2Label}</Text>
            </View>
            <View style={{flex: 1}}/>
          </View>

          <View style={{flexDirection: 'row', height: 30}}>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox3Label}
                onSelect={this.selectCheckbox3}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox3Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 10}}>{this.state.checkBox3Label}</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox4Label}
                onSelect={this.selectCheckbox4}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox4Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 10}}>{this.state.checkBox4Label}</Text>
            </View>
            <View style={{flex: 1}}/>
          </View>

          <View style={{flexDirection: 'row', height: 30}}>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox5Label}
                onSelect={this.selectCheckbox5}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox5Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 11}}>{this.state.checkBox5Label}</Text>
            </View>
            <View style={{flex: 1}}/>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox6Label}
                onSelect={this.selectCheckbox6}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox6Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 11}}>{this.state.checkBox6Label}</Text>
            </View>
            <View style={{flex: 1}}/>
          </View>

          <View style={{flexDirection: 'row', height: 30}}>
            <View style={{flex: 1, justifyContent: "center"}}>
              <CheckboxField
                label={this.state.checkBox7Label}
                onSelect={this.selectCheckbox7}
                disabled={this.props.disabled}
                disabledColor='rgb(236,236,236)'
                selected={this.state.checkBox7Selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="left">
              </CheckboxField>
            </View>
            <View style={{flex: 2}}>
              <Text style={{textAlign: "center", marginTop: 12}}>{this.state.checkBox7Label}</Text>
            </View>
            <View style={{flex: 5}}/>
          </View>

          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginRight: 20, marginTop: 20}}>3. IS THERE ANYTHING ELSE ABOUT THE LESSON THAT A FELLOW GOLFER WOULD FIND HELPFUL?</Text>
          <TextInput
            style={{marginLeft: 10, marginRight: 10, marginTop: 20, height: 400, padding: 5, textAlignVertical: 'top', borderWidth: 1}}
            placeholder="Enter your comment"
            multiline = {true}
            numberOfLines = {100}
            onChangeText={(text) => this.onChangeTextField(text)}
          />

          <TouchableOpacity
            style={{width: 100, height: 40, marginLeft: 20, marginTop: 10, justifyContent: "center", backgroundColor: "lightgray", borderRadius: 3}}
            onPress={() => {this.onSubmit();}}
          >
            <Text style={{textAlign: "center"}}>SUBMIT</Text>
          </TouchableOpacity>
          <View style={{height:30}}/>
        </ScrollView>
      </View>

    );
  }
}

export default AppointmentsDetailScene;
