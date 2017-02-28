import React, { Component, PropTypes } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, ListView, RefreshControl, TouchableHighlight, ActivityIndicator, Navigator, Dimensions } from 'react-native';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';
import { SearchBar } from 'AppComponents';
import { FilterScene, AppointmentsDetailScene, ContactorDetailScene } from 'AppScenes';
import { RequestApi, MakeCancelable, GlobalStorage, Appointments } from 'AppUtilities';
import global from '../../../components/global';
import profile from '../../../components/profile';
import _, { isEqual } from 'lodash';
let { width, height } = Dimensions.get('window');
let r_width =  width / 1125;
let r_height = height / 1659;

class AppointmentsView extends Component {
  static propTypes = {
    pushNavScene: PropTypes.func,
    pushScene: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      isRefreshing: false,
      ListDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => !isEqual(r1, r2) }),
      ListDataSource_Upcoming: new ListView.DataSource({ rowHasChanged: (r1, r2) => !isEqual(r1, r2) }),
    };

    this.ListSource = [];
    this.state.ListDataSource = this.state.ListDataSource.cloneWithRows(this.ListSource);

    this.ListSource_Upcoming = [];
    this.state.ListDataSource_Upcoming = this.state.ListDataSource_Upcoming.cloneWithRows(this.ListSource_Upcoming);

    this.renderRow = this.renderRow.bind(this);
    this.renderRow_Upcoming = this.renderRow_Upcoming.bind(this);
    this.showRatingPage = this.showRatingPage.bind(this);
    this.showContactorDetailPage = this.showContactorDetailPage.bind(this);
    this.pushCallback = this.pushCallback.bind(this);
    this.OnRetrieveAppointments = this.OnRetrieveAppointments.bind(this);
    this.checkListDataCount = this.checkListDataCount.bind(this);
    this.onProfilePage = this.onProfilePage.bind(this);
  }

  checkListDataCount() {
    return this.state.listData.length > 0;
  }

  OnRetrieveAppointments(){
    if (AppConfig.global_freeaccount == true) {
      return;
    }
    this.setState({ isLoading: true });
    Appointments(AppConfig.global_userToken)
      .then((response) => {
        if (!response.error_description) { //success 200
          // AppConfig.global_appointments_normaldata = response;
          this.ListSource = response;
          this.setState({isLoading: false, ListDataSource: this.state.ListDataSource.cloneWithRows(response)});
        } else { // failed 400
          Alert.alert("error1");
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        Alert.alert(error.message);
        // this.setState({ isLoading: false });
      });
  }

  pushCallback() {

  }

  componentDidMount() {
    this.OnRetrieveAppointments();
  }

  showRatingPage(rowData, sectionID, rowID) {
    // Alert.alert("rowData = " + rowData.name + ", sectionID = " + sectionID + ", rowID = " + rowID);
    this.props.pushScene(AppointmentsDetailScene);
  }

  showContactorDetailPage(rowData, sectionID, rowID) {
    // Alert.alert("rowData = " + rowData.name + ", sectionID = " + sectionID + ", rowID = " + rowID);
    this.props.pushScene(ContactorDetailScene);
  }

  onProfilePage(id){
    fetch('https://api.birdienow.com/api/InstructorSearchViewModels/'+id+'?lessonTypeId=0')
      .then((response) => response.json())
      .then((responseData) => {
        global.profileData  = responseData;
        global.insID = id;
        this.props.pushScene(profile);
      })
  }


  renderRow(rowData, sectionID, rowID) {
    const availableDataArray=[];
    availableDataArray.push(
      <TouchableOpacity
        style={[AppStyles.row, { paddingRight: 15, paddingVertical: 8 }]}
        key={'dis'+rowID}
        onPress={() => this.onProfilePage(rowData.instructorId)}
      >
        <Image
          key={'dis_image'+rowID}
          source={{uri: 'https://www.birdienow.com/img/instructor/profile/'+ rowData.instructorId +'.jpg'}}
          style={{width: 249 * r_width, height: 249 * r_width, borderRadius:123 * r_width, marginLeft:36 * r_width}}/>
        <View key={'dis_view1_'+rowID} style={{ flex: 2, justifyContent: 'center', flexDirection: 'column' }}>
          <Text style={{flex: 1, fontSize: 17}} numberOfLines={1} ellipsizeMode="tail">{rowData.firstName}</Text>
          <Text style={{flex: 1, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">{rowData.name}</Text>
          <Text style={{flex: 2, fontSize: 12}} numberOfLines={3} ellipsizeMode="tail">{rowData.address1 + " " + rowData.city + " " + rowData.state + " " + rowData.zip}</Text>
        </View>
        <View key={'dis_view2_'+rowID} style={{ flex: 2 , justifyContent: 'center' }}>
          <Text style={{flex: 1, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">Sat, Feb 25, 2017 </Text>
          <Text style={{flex: 1, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">7:30 PM - 8:30 PM</Text>
          {rowData.overallRating==0 ? <TouchableOpacity style={{flex: 2, backgroundColor: "orange", justifyContent: "center", borderRadius: 5}} onPress={() => this.showRatingPage(rowData, sectionID, rowID)}>
            <Text style={{textAlign: "center", color: "white"}}>Rate your lesson</Text>
          </TouchableOpacity> : <Text style={{textAlign: "center", color: "black"}}>{rowData.overallRating}</Text>
          }
        </View>
      </TouchableOpacity>);
    const key = "dis-sep" + rowID;
    availableDataArray.push(<View key={key} style={{ backgroundColor: '#ececec', height: 1, marginRight: 15 }} />);
    return (
      <View>
        {availableDataArray}
      </View>
    );
  }

  renderRow_Upcoming(rowData, sectionID, rowID) {
    return (
      <View>
      </View>
    );
  }

  render() {
    if (AppConfig.global_freeaccount == true) {
      return (
        <View/>
      );
    } else {
      return (
        <View>
          <View>
            <Text style={{textAlign: 'left', fontSize: 18, color: '#000', marginLeft: 20, marginTop: 20 }}>Upcoming Appointments</Text>
            <View
              style={[AppStyles.row, { paddingRight: 15, marginTop:5, paddingVertical: 8, flexDirection: 'row'}]}>
              <Text style={{ flex: 1, textAlign: 'right', color: '#000', marginRight: 10 }}>Instructor/Location</Text>
              <Text style={{ flex: 1, textAlign: 'left', color: '#000', marginLeft: 10 }}>Date/Time</Text>
            </View>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.ListDataSource_Upcoming}
              renderRow={this.renderRow_Upcoming}/>
            <Text style={{textAlign: 'center', fontSize: 15, color: '#000', marginLeft: 20, marginTop: 5 }}>You have no upcoming appointments</Text>
          </View>
          <View>
            <Text style={{textAlign: 'left', fontSize: 18, color: '#000', marginLeft: 20, marginTop: 20 }}>Past Appointments</Text>
            <View
              style={[AppStyles.row, { paddingRight: 15, marginTop:5, paddingVertical: 8, flexDirection: 'row'}]}>
              <Text style={{ flex: 1, textAlign: 'right', color: '#000', marginRight: 10 }}>Instructor/Location</Text>
              <Text style={{ flex: 1, textAlign: 'left', color: '#000', marginLeft: 10 }}>Date/Time</Text>
            </View>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.ListDataSource}
              renderRow={this.renderRow}/>
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
}

export default AppointmentsView;
