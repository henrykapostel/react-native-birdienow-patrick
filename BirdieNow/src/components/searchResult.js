import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Text,
  Dimensions,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
  PanResponder,
  TouchableOpacity
} from 'react-native';
var global = require('./global');
var { width, height } = Dimensions.get('window');
var r_width =  width / 356;
var r_height = height / 647;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const ds_result = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import StarRating from 'react-native-star-rating';
var pageNum = 2;
module.exports = React.createClass({
  getInitialState: function() {
    return {
      text:'',
      data:global.data,
      showloading: false,
      focusFlag: false,

      refreshData: [],
      city:'',
      instuctor:'',
      facitity:'',
      flag:0,
    }
  },
  getInitialProps: function() {

  },
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.info(gestureState.dx + " " + gestureState.dy);
        if (gestureState.dy < 20 && gestureState.dy > -20) {
          if (gestureState.dx > 150) { //swipe left to right
            this.props.navigator.pop();
          }
          if (gestureState.dx < -150) { //swipe right to left

          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  },

  onSearchResult: function(rowData){
    return(
      <TouchableOpacity onPress={()=>this._onPressButton(rowData, true)}>
        <View style={{height:40, alignItems:'center', borderBottomWidth:1, borderBottomColor:'#E0DEDF', flexDirection:'row'}}>
          {this.state.flag == 0 ?
            <Image style={{marginLeft:24 * r_width,width:22 * r_height, height:22 * r_height}} source={require('img/searchimage/locationIcon.png')}/>:null}
          <Text style={{fontSize: 14,  color:'#2FBD96',marginLeft:5,fontFamily: 'Arial'}}>
            {rowData.display}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
  onSearch: function(city){
    this.setState({city});
    fetch('https://api.birdienow.com/api/TypeAheadSearchCity?searchString='+city
      +'&numResults=8')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({refreshData: responseData})
      });
  },
  componentWillUnmount: function() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  },

  keyboardDidShow: function(e) {
    global.keyboardHeight = e.endCoordinates.height;
    this.setState({focusFlag: true, text: ""});
  },

  keyboardDidHide: function(e) {
//    global.keyboardHeight = e.endCoordinates.height;
//    this.setState({focusFlag: false});
  },

  focusedSearch: function() {

  },
  endedSearch: function() {
  },
  render: function() {
    const arrayView = [];
    arrayView.push(
      <View key="superview" style={{position: "absolute", width: width, height: height - 50 * r_height, backgroundColor: "gray", marginTop:0, justifyContent: "center"}}>
        <Text style={{}}>{this.state.text}</Text>

        <View style={{flex:1}}>
          <View style={{alignItems:'center', backgroundColor:'#2FBD96', borderBottomWidth:3 * r_height, borderBottomColor:'#85D3DD'}}>
          <Text style={{marginTop:25 * r_height, fontSize:16 * r_height, color: '#000000',fontFamily: 'Arial'}}>Instructors</Text>
          <View style={{marginTop:23,width:325 * r_width, height:25 * r_width, backgroundColor:'#ffffff',alignItems:'center', borderRadius:10,flexDirection: 'row'}}>
          <Image style={{marginLeft:5 * r_width,width:22 * r_height, height:22 * r_height}} source={require('img/searchimage/location.png')}/>
            <TextInput
              placeholder="City, Zip Code"
              style={{height: 14 * r_width,flex:1,fontSize:14,marginTop:7,marginLeft:5}}
              onChangeText={(city) => this.onSearch(city)}
              value={this.state.city}
              onSubmitEditing={(event) => this._onPressButton(this.state.city, false)}
            />
          </View>
        <View style={{marginTop:7,width:325 * r_width, height:25 * r_width, backgroundColor:'#ffffff',alignItems:'center', borderRadius:10,flexDirection: 'row'}}>
        <Image style={{marginLeft:5 * r_width,width:22 * r_height, height:22 * r_height}} source={require('img/searchimage/nav-profile.png')}/>
        <TextInput
          placeholder="Instructor"
          style={{height: 14 * r_width,flex:1,fontSize:14,marginTop:7,marginLeft:5}}
          onChangeText={(instuctor) => this.setState({instuctor:instuctor, flag:1})}
          value={this.state.instuctor}
        />
        </View>
        <View style={{marginTop:7,marginBottom:7,width:325 * r_width, height:25 * r_width, backgroundColor:'#ffffff',alignItems:'center', borderRadius:10,flexDirection: 'row'}}>
        <Image style={{marginLeft:5 * r_width,width:22 * r_height, height:22 * r_height}} source={require('img/searchimage/nav-search.png')}/>
        <TextInput
          placeholder="Facitity"
          style={{height: 14 * r_width,flex:1,fontSize:14,marginTop:7,marginLeft:5}}
          onChangeText={(facitity) => this.setState({facitity:facitity, flag:2})}
          value={this.state.facitity}
        />
        </View>
        </View>

        <View style={{height:20,justifyContent:'center', backgroundColor: '#E0DEDF'}}>
        <Text style={{marginLeft:20,fontSize:12, color: '#686868',fontFamily: 'Arial'}}>
          LOCATIONS
        </Text>
        </View>
        <ListView
          style={{flex:1, height:500 * r_height}}
          dataSource={ds_result.cloneWithRows(this.state.refreshData)}
          renderRow={(rowData) =>this.onSearchResult(rowData)}
          enableEmptySections={true}
        />
        </View>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <View style={{height:50 * r_height, alignItems:'center', backgroundColor:'#75CEF6', borderBottomWidth:3 * r_height, borderBottomColor:'#85D3DD'}}>
            <Text style={{marginTop:25 * r_height, fontSize:16 * r_height, color: '#000000',fontFamily: 'Arial'}}>
              Instructors
            </Text>
          </View>
          <View style={{height: 45 * r_height, backgroundColor:'#2FBC95', alignItems:'center', justifyContent: 'center'}}>
            <View style={{width:325 * r_width, height:25 * r_width, backgroundColor:'#ffffff',alignItems:'center', borderRadius:10,flexDirection: 'row'}}>
              <Image style={{marginLeft:5 * r_width,width:20 * r_height, height:20 * r_height}} source={require('img/searchimage/location.png')}/>
              <TextInput
                placeholder="Enter text to see location"
                style={{height: 18 * r_width,flex:1,marginTop:5, fontSize:14}}
                onChangeText={(text) => this.setState({text})}
                onFocus={() => {this.focusedSearch();}}
                clearTextOnFocus={true}
                value={this.state.text}
                onSubmitEditing={() => {this.endedSearch();}}
              />
            </View>
          </View>
          <View style={{height:500 * r_height, backgroundColor:'#ffffff'}}>
            <ListView
              {...this._panResponder.panHandlers}
              style={{flex:1, height:500 * r_height}}
              dataSource={ds.cloneWithRows(this.state.data)}
              renderRow={(rowData) =>this.onSherchResult(rowData)}
              onEndReached={this._loadMoreContentAsync}
            />
          </View>
          {this.state.focusFlag ? arrayView : null}
          {this.state.showloading ?
            <View style={{position:'absolute', top:0, left:0, bottom:0, right:0, alignItems:'center', justifyContent:'center', backgroundColor:'#ffffff'}}>
              <ActivityIndicator/>
            </View>:null}
        </View>
        <View style={{height: 0, marginBottom: 50}}>
        </View>
      </View>
    );
  },
  _onPressButton(rowData, flag){
    if (flag) {
      global.city = rowData.code;
      this.setState({showloading: true});
      fetch('https://api.birdienow.com/api/InstructorSearchViewModels?zip='+rowData.code+'&'+
        'miles=100&'+
        'gender=Any&'+
        'priceLevel=All&'+
        'pageNum=1&'+
        'numResults=8')
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({showloading:false});
          if (responseData.length > 0) {
            this.setState({data: responseData, focusFlag: false, text: rowData.display});
            // global.data = responseData;
            // this.props.navigator.push({'name': 'searchResult',
            //   sceneConfig: {
            //     ...Navigator.SceneConfigs.FloatFromRight,
            //     gestures: {}
            //   }})
          }else{
            alert('No Instructors near you.')
          }
        })
    }else {
      if (parseInt(rowData)) {
        global.city = rowData;
        this.setState({showloading: true});
        fetch('https://api.birdienow.com/api/InstructorSearchViewModels?zip='+rowData+'&'+
          'miles=100&'+
          'gender=Any&'+
          'priceLevel=All&'+
          'pageNum=1&'+
          'numResults=8')
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({showloading:false});
            if (responseData.length > 0) {
              this.setState({data: responseData, focusFlag: false, text: rowData.display});
              // global.data = responseData;
              // this.props.navigator.push({'name': 'searchResult',
              //   sceneConfig: {
              //     ...Navigator.SceneConfigs.FloatFromRight,
              //     gestures: {}
              //   }})
            }else{
              alert('No Instructors near you.')
            }
          })
      }
    }
  },
  _loadMoreContentAsync(){
    fetch('https://api.birdienow.com/api/InstructorSearchViewModels?zip='+global.city+'&'+
      'miles=100&'+
      'gender=Any&'+
      'priceLevel=All&'+
      'pageNum='+pageNum+'&'+
      'numResults=8')
      .then((response) => response.json())
      .then((responseData) => {
        const array = this.state.data;
        if (responseData.length > 0) {
          for (let i = 0; i < responseData.length; i++) {
            array.push(responseData[i])
          }
        }
        this.setState({data:array})
      });
    pageNum = pageNum+1
  },

  onStarRatingPress(rating){
  },
  onPriceLevel(data){
    var PriceLevel = '';
    for (var i = 0; i < parseInt(data); i++) {
      PriceLevel = PriceLevel + '$'
    }
    return PriceLevel
  },
  onDistance(distance){
    var text = '';
    var anyString = 'Mozilla';
    text = parseFloat(distance).toString().substring(0,4);
    return text
  },
  onSherchResult(rowData){
    return(
      <TouchableOpacity style={{height:93 * r_height, alignItems:'center', flexDirection:'row'}} onPress={()=>this.onProfilePage(rowData.instructorId)}>
        <View style={{ marginLeft:5,width: 80 * r_width, height: 75 * r_width}}>
          <Image
            style={{width: 74 * r_width, height: 74 * r_width, borderRadius:37,marginLeft:5}}
            source={{uri: 'https://www.birdienow.com/img/instructor/profile/'+rowData.instructorId+'.jpg'}}
          />
          {rowData.isPga ?
            <Image
              style={{width: 40 * r_width, height: 40 * r_width, position:'absolute',left:0,bottom:0}}
              source={{uri: 'https://www.birdienow.com/img/badge/pga_badge_85.png'}}
            />:null}
        </View>
        <View style={{marginLeft:5,flex:1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex:1, fontWeight: 'bold',fontFamily: 'Arial'}}>
              {rowData.firstName} {rowData.lastName}
            </Text>
            <Text style={{marginRight:8 * r_width, fontSize:12,fontFamily: 'Arial'}}>
              {parseFloat(rowData.distance).toString().substring(0,4)} miles <Text style={{fontSize:12,fontFamily: 'Arial',marginLeft:3 * r_width}}>{this.onPriceLevel(rowData.priceLevel)}</Text>
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems:'center', marginTop:3 * r_width, marginBottom:3 * r_width}}>
            <StarRating
              disabled={true}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet="Ionicons"
              starColor = {'#E59F68'}
              maxStars={5}
              rating={rowData.averageRating}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              starSize = {10}
              emptyStarColor={'blue'}
            />
            <Text style={{color: '#E59F68',marginLeft:5, fontSize: 12,fontFamily: 'Arial'}}>
              {rowData.reviewCount} Reviews
            </Text>
          </View>
          <Text style={{color: '#000000', fontSize: 12,fontFamily: 'Arial'}}>
            {rowData.name}
          </Text>
          <Text style={{color: '#000000', fontSize: 12,fontFamily: 'Arial'}}>
            {rowData.address1}{rowData.address2}{rowData.city}{rowData.state}{rowData.zip}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
  onProfilePage(id){
    fetch('https://api.birdienow.com/api/InstructorSearchViewModels/'+id+'?lessonTypeId=0')
      .then((response) => response.json())
      .then((responseData) => {
        global.insID = id;
        global.profileData  = responseData;
        this.props.navigator.push({'name': 'profile',
          sceneConfig: {
            ...Navigator.SceneConfigs.FloatFromRight,
            gestures: {}
          }})
      })
  }
});

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardview:{height:150, width:83, flex:1, backgroundColor: '#ffffff', borderWidth:1, borderColor: '#123456', margin:5, alignItems:'center', justifyContent: 'center'},
  cardtext:{fontSize: 39,}
});
