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
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
var global = require('./global')
var { width, height } = Dimensions.get('window');
var r_width =  width / 356;
var r_height = height / 647;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var pageNum = 2;
module.exports = React.createClass({
  getInitialState: function() {
    return {
      city:'',
      instuctor:'',
      facitity:'',
      data:[],
      flag:0,
      showloading: false
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <View style={{alignItems:'center', backgroundColor:'#2FBD96', borderBottomWidth:3 * r_height, borderBottomColor:'#85D3DD'}}>
            <Text style={{marginTop:25 * r_height, fontSize:16 * r_height, color: '#000000',fontFamily: 'Arial'}}>
              Instructors
            </Text>
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
            dataSource={ds.cloneWithRows(this.state.data)}
            renderRow={(rowData) =>this.onSearchResult(rowData)}
            enableEmptySections={true}
          />
        </View>
        <View style={{height: 0, marginBottom: 50}}>
        </View>
        {this.state.showloading ?
          <View style={{position:'absolute', top:0, left:0, bottom:0, right:0, alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator/>
          </View>:null}
      </View>
    );
  },
  onSearchResult(rowData){
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
  onSearch(city){
    this.setState({city})
    fetch('https://api.birdienow.com/api/TypeAheadSearchCity?searchString='+city
      +'&numResults=8')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({data:responseData})
      })
    // }else if (this.state.flag == 1) {
    //   fetch('https://api.birdienow.com/api/TypeAheadSearchInstructor?searchString='+this.state.instuctor
    //   +'&numResults=8')
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //       console.warn(JSON.stringify(responseData));
    //       this.setState({data:responseData})
    //   })
    // }
  },
  _onPressButton(rowData, flag){
    if (flag) {
      global.city = rowData.code
      this.setState({showloading: true})
      fetch('https://api.birdienow.com/api/InstructorSearchViewModels?zip='+rowData.code+'&'+
        'miles=100&'+
        'gender=Any&'+
        'priceLevel=All&'+
        'pageNum=1&'+
        'numResults=8')
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({showloading:false})
          if (responseData.length > 0) {
            global.data = responseData
            this.props.navigator.push({'name': 'searchResult',
              sceneConfig: {
                ...Navigator.SceneConfigs.FloatFromRight,
                gestures: {}
              }})
          }else{
            alert('No Instructors near you.')
          }
        })
    }else {
      if (parseInt(rowData)) {
        global.city = rowData
        this.setState({showloading: true})
        fetch('https://api.birdienow.com/api/InstructorSearchViewModels?zip='+rowData+'&'+
          'miles=100&'+
          'gender=Any&'+
          'priceLevel=All&'+
          'pageNum=1&'+
          'numResults=8')
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({showloading:false})
            if (responseData.length > 0) {
              global.data = responseData
              this.props.navigator.push({'name': 'searchResult',
                sceneConfig: {
                  ...Navigator.SceneConfigs.FloatFromRight,
                  gestures: {}
                }})
            }else{
              alert('No Instructors near you.')
            }
          })
      }
    }
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
