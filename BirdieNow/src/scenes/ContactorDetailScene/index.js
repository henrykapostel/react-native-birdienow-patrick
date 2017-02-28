import React, { Component, PropTypes } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, ListView, RefreshControl, ScrollView, PanResponder } from 'react-native';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';
import { SearchBar, HeaderBar } from 'AppComponents';
import { FilterScene, ListDetailScene, } from 'AppScenes';
import { RequestApi, MakeCancelable, GlobalStorage } from 'AppUtilities';
import _, { isEqual } from 'lodash';

class ContactorDetailScene extends Component {
  static propTypes = {
    popBack: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isRefreshing: false,
      ListDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => !isEqual(r1, r2) }),
    };

    this.ListSource = [{'name':'ReviewHistory'}];
    this.state.ListDataSource = this.state.ListDataSource.cloneWithRows(this.ListSource);
  }

  componentWillMount() {
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
            this.props.popBack();
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
  }

  componentDidMount() {
  }

  renderRow(rowData, sectionID, rowID) {
    let pStyle=[styles.rowContainer];
    const availableDataArray=[];
    const upcomingDataArray=[];
    const pastDataArray=[];
    const key = "dis-sep-title";
    availableDataArray.push(<View key={key} style={{ backgroundColor: '#ececec', height: 1, marginRight: 15 }} />);
    for(let i = 0; i < 10; i++) {
      availableDataArray.push(
        <TouchableOpacity
          style={[AppStyles.column, { paddingRight: 15, paddingVertical: 8 }]}
          key={'dis'+i}
        >
          <View key={'dis_view0_'+i} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <Image key={'dis_image'+i} source={require('img/image/rating.png')} style={{ flex: 1, width: 70, height: 15}} />
            <Text style={{flex: 2, fontSize: 12, marginTop: 2}} numberOfLines={1} ellipsizeMode="tail">February 26, 2017</Text>
          </View>
          <View key={'dis_view1_'+i} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={{flex: 1, fontSize: 12, marginTop: 2, textAlign: "right", marginRight: 5}} numberOfLines={1} ellipsizeMode="tail">UserSkillLevel</Text>
            <Text style={{flex: 2, fontSize: 12, marginTop: 2, textAlign: "left", marginLeft: 5}} numberOfLines={1} ellipsizeMode="tail">ScratchPlayer</Text>
          </View>
          <View key={'dis_view2_'+i} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={{flex: 1, fontSize: 12, marginTop: 2, textAlign: "right", marginRight: 5}} numberOfLines={1} ellipsizeMode="tail">Lesson Focus</Text>
            <Text style={{flex: 2, fontSize: 12, marginTop: 2, textAlign: "left", marginLeft: 5}} numberOfLines={1} ellipsizeMode="tail">Driver</Text>
          </View>
          <View key={'dis_view3_'+i} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <Text style={{flex: 1, fontSize: 12, marginTop: 2, textAlign: "right", marginRight: 5}} numberOfLines={1} ellipsizeMode="tail">Damon A said</Text>
            <Text style={{flex: 2, fontSize: 12, marginTop: 2, textAlign: "left", marginLeft: 5}} numberOfLines={5} ellipsizeMode="tail">  This guy is awesome! Very kind, dedicated to help his students. Just give him hundred percent trust and follow his instruction, and you will soon become  a single handicapper!</Text>
          </View>
        </TouchableOpacity>);
      const key = "dis-sep" + i;
      availableDataArray.push(<View key={key} style={{ backgroundColor: '#ececec', height: 1, marginRight: 15 }} />);
    }

    return (
      <View style={pStyle}>
        <View style={styles.listRow}>
          <TouchableOpacity style={styles.imageWrapper}>
            {/*<Image source={require('img/icon/icon_arrow.png')} style={styles.rowImage} />*/}
          </TouchableOpacity>
          <View style={styles.contentWrapper}>
            <Text style={[AppStyles.baseFont, styles.txtTitleDetail]} numberOfLines={1} ellipsizeMode="tail">
              {rowData.tagline} </Text>

            <View style={{ backgroundColor: '#ececec', height: 1, marginRight: 15, marginTop: 7 }} />

            {availableDataArray}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
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
              Contactor Detail Page
            </Text>
          </View>
          <View style={styles.rightImageTitleView}>
            <TouchableOpacity>
              {/*<Image source={require('img/icon/icon_arrow.png')} style={styles.rightImageTitleViewIcon} />*/}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <Image source={require('img/image/photo.png')} style={{ width: 100, height: 100, marginLeft: 30, marginTop: 10}} />
          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginTop: 20}}>DERRICK</Text>
          <Text style={{fontSize: 13, color: "black", marginLeft: 20, marginTop: 5}}>16 Reviews</Text>
          <TouchableOpacity style={{width: 200, height: 30, backgroundColor: "orange", marginLeft: 20, marginTop: 10, justifyContent: "center"}}>
            <Text style={{textAlign: "center", fontSize: 13, borderRadius: 5, color: "white"}}>CONTACT INSTRUCTOR</Text>
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginTop: 20}}>Books</Text>
          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginTop: 20}}>Rates</Text>
          <Text style={{fontSize: 18, color: "black", marginLeft: 20, marginTop: 20}}>Reviews</Text>

          <ListView
            dataSource={this.state.ListDataSource}
            renderRow={this.renderRow}
          />
        </ScrollView>
      </View>
    );
  }
}

export default ContactorDetailScene;
