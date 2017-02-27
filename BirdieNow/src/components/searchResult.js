import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
  View,
  ScrollView,
  ListView,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from 'react-native';
var global = require('./global')
var { width, height } = Dimensions.get('window');
var r_width =  width / 356;
var r_height = height / 647;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import StarRating from 'react-native-star-rating';
var pageNum = 2;
module.exports = React.createClass({
  getInitialState: function() {
    return {
      text:'',
      data:global.data,
      showloading: false
    }
  },
  render: function() {
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
                value={this.state.text}
              />
            </View>
          </View>
          <View style={{height:500 * r_height, backgroundColor:'#ffffff'}}>
            <ListView
              style={{flex:1, height:500 * r_height}}
              dataSource={ds.cloneWithRows(this.state.data)}
              renderRow={(rowData) =>this.onSherchResult(rowData)}
              onEndReached={this._loadMoreContentAsync}
            />
          </View>
          {this.state.showloading ?
            <View style={{position:'absolute', top:0, left:0, bottom:0, right:0, alignItems:'center', justifyContent:'center', backgroundColor:'#ffffff'}}>
              <ActivityIndicator/>
            </View>:null}
        </View>
        <View>
          <Image style={{width:356* r_width, height:50 * r_height}} source={require('img/searchimage/image.png')}/>
        </View>
      </View>
    );
  },
  _loadMoreContentAsync(){
    fetch('https://api.birdienow.com//api/InstructorSearchViewModels?zip='+global.city+'&'+
      'miles=100&'+
      'gender=Any&'+
      'priceLevel=All&'+
      'pageNum='+pageNum+'&'+
      'numResults=8')
      .then((response) => response.json())
      .then((responseData) => {
        var array = this.state.data
        if (responseData.length > 0) {
          for (var i = 0; i < responseData.length; i++) {
            array.push(responseData[i])
          }
        }
        this.setState({data:array})
      })
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
    text = parseFloat(distance).toString().substring(0,4)
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
        global.profileData  = responseData
        this.props.navigator.push({'name': 'profile',
          sceneConfig: {
            ...Navigator.SceneConfigs.FloatFromRight,
            gestures: {}
          }})
      })
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardview:{height:150, width:83, flex:1, backgroundColor: '#ffffff', borderWidth:1, borderColor: '#123456', margin:5, alignItems:'center', justifyContent: 'center'},
  cardtext:{fontSize: 39,}
});
