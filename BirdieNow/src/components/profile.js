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
  Image
} from 'react-native';
var global = require('./global')
var { width, height } = Dimensions.get('window');
var r_width =  width / 1125;
var r_height = height / 1659;
var global = require('./global')
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import StarRating from 'react-native-star-rating';
var pageNum = 2;
module.exports = React.createClass({
  getInitialState: function() {
    return {
      data: global.profileData,
      city:'',
    }
  },
  componentDidMount(){


    fetch('https://api.birdienow.com/api/InstructorSearchViewModels/165639?lessonTypeId=0')
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({data:responseData})
      })
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>

        </View>
        <ScrollView>
          <View style={{flexDirection:'row', marginTop:25 * r_width,}}>
            <Image
              style={{width: 249 * r_width, height: 249 * r_width, borderRadius:123 * r_width, marginLeft:36 * r_width}}
              source={{uri: 'https://www.birdienow.com/img/instructor/profile/'+this.state.data.id+'.jpg'}}
            />
            <View style={{marginLeft:36 * r_width, justifyContent:'center'}}>
              <Text style={{fontSize:20,color:'#000000f0', color:'#474747',fontFamily: 'Arial'}}>
                {this.state.data.firstName} {this.state.data.lastName}
              </Text>
              <View style={{flexDirection:'row',marginBottom:5,marginTop:5 ,alignItems:'center'}}>
                <StarRating
                  starColor = {'#E59F68'}
                  emptyStar={'ios-star-outline'}
                  fullStar={'ios-star'}
                  halfStar={'ios-star-half'}
                  iconSet="Ionicons"
                  disabled={true}
                  maxStars={5}
                  rating={this.state.data.averageRating}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                  starSize = {15}
                  emptyStarColor={'blue'}
                />
                <Text style={{color: '#3eb3fa',marginLeft:5, fontSize: 15,fontFamily: 'Arial'}}>
                  {this.state.data.reviewCount} Reviews
                </Text>
              </View>
              <Text style={{fontSize:15, fontFamily: 'Arial'}}>
                PGA Instructor . Public Course . $$
              </Text>
            </View>
          </View>
          <View style={{borderBottomWidth:0.5, borderBottomColor:'#474747'}}>
            <View style={{marginLeft:39 * r_width,}}>
              <View style={styles.titleView}>
                <Image style={{width:73 * r_width, height:73 * r_width}} source={require('img/searchimage/profile_calender.png')}/>
                <Text style={styles.title}>Book a Lesson
                </Text>
              </View>
              <Text style={styles.contentBold}>Tappan Golf Center</Text>
              <Text style={styles.content}>116 Ny-303 Tapan NY 10983</Text>
            </View>
            <View style={{flexDirection:'row' ,marginTop:20, marginBottom:20}}>
              <View style={{marginLeft:30 * r_width ,width:219 * r_width, height:93 * r_width, borderRadius:15 * r_width,backgroundColor:'#32b3fa', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:13, color:'#ffffff',fontFamily: 'Arial'}}>6:00 pm</Text>
              </View>
              <View style={{marginLeft:30 * r_width ,width:219 * r_width, height:93 * r_width, borderRadius:15 * r_width,backgroundColor:'#32b3fa', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:13, color:'#ffffff',fontFamily: 'Arial'}}>7:00 pm</Text>
              </View>
              <View style={{marginLeft:30 * r_width ,width:219 * r_width, height:93 * r_width, borderRadius:15 * r_width,backgroundColor:'#32b3fa', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:13, color:'#ffffff',fontFamily: 'Arial'}}>8:00 pm</Text>
              </View>
              <View style={{marginLeft:30 * r_width ,width:219 * r_width, height:93 * r_width, borderRadius:15 * r_width,backgroundColor:'#32b3fa', alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:13, color:'#ffffff',fontFamily: 'Arial'}}>9:00 pm</Text>
              </View>
            </View>
          </View>
          <View style={{marginLeft:39 * r_width,}}>
            <View style={styles.titleView}>
              <Image style={{width:81 * r_width, height:54 * r_width}} source={require('img/searchimage/profile_rate.png')}/>
              <Text style={styles.title}>Rates</Text>
            </View>
            <View style={{flexDirection:'row',marginTop:4, marginBottom:4}}>
              <Text style={{flex:1,fontSize:16,color:'#474747', fontFamily: 'Arial'}}>Adult . Lesson . 1 Hours Session</Text>
              <Text style={{fontSize:14,color:'#474747', marginRight: 30 * r_width,fontFamily: 'Arial'}}>$90</Text>
            </View>
          </View>
          <View style={{marginLeft:36 * r_width,marginTop:10}}>
            <View style={styles.titleView}>
              <Image style={{width:66 * r_width, height:66 * r_width}} source={require('img/searchimage/profile_calender.png')}/>
              <Text style={styles.title}>Qualifications/Experience</Text>
            </View>
            <View>
              <Text style={styles.contentBold}>
                Summary
              </Text>
              <Text style={styles.content}>
                Derrick Kim recognized as one of the Top 50 PGA teaching professingals in America by golf Range Magazine.
                He was named Metrpolitan PGA Section Teasher of the year and has been nominated for read more.
              </Text>
            </View>
            <View>
              <Text style={styles.contentBold}>
                Experience
              </Text>
              <Text style={styles.content}>
                • NcAA Division 1 Student-athlete (Seton Hall University) Men s Golf 20011-2014
              </Text>
            </View>
            <View>
              <Text style={styles.contentBold}>
                Awards
              </Text>
              <Text style={styles.content}>
                • winner of 2013 MGA Brae Burn intational
              </Text>
            </View>
            <View>
              <Text style={styles.contentBold}>
                Certificatior
              </Text>
              <Text style={styles.content}>
                First Tee cerfied instructor
              </Text>
            </View>
            <View>
              <Text style={styles.contentBold}>
                Language
              </Text>
              <Text style={styles.content}>
                • English
              </Text>
            </View>
            <View>
              <Text style={styles.contentBold}>
                Edcation
              </Text>
              <Text style={styles.content}>
                • Texas A&M University
              </Text>
            </View>
            <Text style={styles.blueContent}>Read full Qualifications/Experience</Text>
            <View style={{borderBottomWidth:1, borderBottomColor:'#e7e7e9', borderTopWidth:1,borderBottomColor:'#e7e7e9',}}>
              <View style={{height:126 * r_width, borderBottomWidth:1, borderBottomColor:'#e7e7e9', flexDirection:'row', alignItems:'center'}}>
                <Image style={{width:75 * r_width, height:72 * r_width}} source={require('img/searchimage/phone.png')}/>
                <Text style={[styles.content,{marginLeft:45 * r_width}]}>Contact Instructor</Text>
              </View>
              <View style={{height:126 * r_width,flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#e7e7e9', alignItems:'center'}}>
                <Image style={{width:81 * r_width, height:54 * r_width}} source={require('img/searchimage/profile_rate.png')}/>
                <Text style={[styles.content,{marginLeft:45 * r_width}]}>Additional Prices</Text>
              </View>
              <View style={{height:126 * r_width,flexDirection:'row', alignItems:'center',alignItems:'center'}}>
                <Image style={{width:81 * r_width, height:54 * r_width}} source={require('img/searchimage/profile_more.png')}/>
                <Text style={[styles.content,{marginLeft:45 * r_width}]}>More Info</Text>
              </View>
            </View>
            <View>
              <View style={styles.titleView}>
                <Image style={{width:81 * r_width, height:54 * r_width}} source={require('img/searchimage/profile_reviews.png')}/>
                <Text style={styles.title}>Reviews</Text>
              </View>
              <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>

                <View style={{flex:1}}>
                  <StarRating
                    starColor = {'#E59F68'}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet="Ionicons"
                    disabled={true}
                    maxStars={5}
                    rating={4}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    starSize = {15}
                    emptyStarColor={'blue'}
                  />
                </View>
                <View style={{width:450 * r_width}}>
                </View>
                <Text style={[styles.content,{marginRight:33 * r_width}]}>August 31, 2016</Text>
              </View>
              <Text style={[styles.content, {fontFamily: 'Arial'}]}>Sill Level:
                <Text style={styles.content}> Beginner</Text></Text>
              <Text style={[styles.content, {fontFamily: 'Arial'}]}>Lesson Focus:
                <Text style={styles.content}> Setup</Text></Text>
              <Text style={[styles.content, {fontFamily: 'Arial'}]}>Nunzio:
                <Text style={styles.content}> Derrick</Text></Text>
            </View>
            <Text style={styles.blueContent}>
              Read all Reviews (20)
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topView:{
    height: 189 * r_height,
    backgroundColor:'#ffffff',
    borderBottomWidth: 1,
    borderBottomColor:'#D3D3D3'
  },
  titleView:{flexDirection:'row', alignItems:'center', marginTop: 50 * r_width,},
  title:{marginLeft:32 * r_width, fontSize:14.5, fontFamily: 'Arial'},
  content:{marginLeft:2,fontSize:15,color:'#474747',fontFamily: 'Arial'},
  contentBold:{marginLeft:2,fontSize:17,color:'#474747',marginTop:7, marginBottom:5.5, fontFamily: 'Arial'},
  blueContent:{marginLeft:36 * r_width, fontSize:15, color:'#0086F8', marginTop:20, marginBottom:20, fontFamily:'Arial'}
});
