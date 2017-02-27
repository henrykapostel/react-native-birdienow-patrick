import React, { Component, PropTypes } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, ListView, RefreshControl, TouchableHighlight, ActivityIndicator } from 'react-native';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';
import { SearchBar } from 'AppComponents';
import { FilterScene, AppointmentsDetailScene, ContactorDetailScene } from 'AppScenes';
import { RequestApi, MakeCancelable, GlobalStorage, Appointments } from 'AppUtilities';
import _, { isEqual } from 'lodash';


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
    };

    this.ListSource = [{'name':'AvailableAppointments'}, {'name':'UpcomingAppointments'}, {'name':'PastAppointments'}];
    this.state.ListDataSource = this.state.ListDataSource.cloneWithRows(this.ListSource);

    this.renderRow = this.renderRow.bind(this);
    this.showRatingPage = this.showRatingPage.bind(this);
    this.showContactorDetailPage = this.showContactorDetailPage.bind(this);
    this.pushCallback = this.pushCallback.bind(this);
    this.OnRetrieveAppointments = this.OnRetrieveAppointments.bind(this);
  }

  OnRetrieveAppointments(){
    this.setState({ isLoading: true });
    Appointments(AppConfig.global_userToken)
      .then((response) => {
        if (!response.error_description) { //success 200
          // Alert.alert(response.access_token);
          // AppConfig.global_userToken = response.access_token; // set the user token
          // console.log(response);
          this.setState({isLoading: false});
          // this.setState({ isLoading: false, ListDataSource: this.state.ListDataSource.cloneWithRows(response) });
        } else { // failed 400
          // Alert.alert("error1");
          Alert.alert(response.error_description);
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        Alert.alert("error2");
        // Alert.alert(error.message);
        this.setState({ isLoading: false });
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

  renderRow(rowData, sectionID, rowID) {
    let pStyle=[styles.rowContainer];
    const availableDataArray=[];
    const upcomingDataArray=[];
    const pastDataArray=[];
    availableDataArray.push(
      <View
        style={[AppStyles.row, { paddingRight: 15, paddingVertical: 8, flexDirection: 'row'}]}
        key={'dis_title'}
      >
        <Text style={{ flex: 1, textAlign: 'right', color: '#000', marginRight: 10 }}>Instructor/Location</Text>
        <Text style={{ flex: 1, textAlign: 'left', color: '#000', marginLeft: 10 }}>Date/Time</Text>
      </View>);
    const key = "dis-sep-title";
    availableDataArray.push(<View key={key} style={{ backgroundColor: '#ececec', height: 1, marginRight: 15 }} />);
    for(let i = 0; i < 5; i++) {
      availableDataArray.push(
        <TouchableOpacity
          style={[AppStyles.row, { paddingRight: 15, paddingVertical: 8 }]}
          key={'dis'+i}
          onPress={() => this.showContactorDetailPage(rowData, sectionID, rowID)}
        >
          <Image key={'dis_image'+i} source={require('img/image/photo.png')} style={{ flex: 1, width: 50, height: 70}} />
          <View key={'dis_view1_'+i} style={{ flex: 2, justifyContent: 'center', flexDirection: 'column' }}>
            <Text style={{flex: 1, fontSize: 17}} numberOfLines={1} ellipsizeMode="tail">Derrick</Text>
            <Text style={{flex: 1, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">Closter Golf Center</Text>
            <Text style={{flex: 2, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">153 Homans Ave Closter NJ 07624</Text>
          </View>
          <View key={'dis_view2_'+i} style={{ flex: 2 , justifyContent: 'center' }}>
            <Text style={{flex: 1, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">Mon, Feb 20, 2017</Text>
            <Text style={{flex: 1, fontSize: 12}} numberOfLines={1} ellipsizeMode="tail">7:30 PM - 8:30 PM</Text>
            <TouchableOpacity style={{flex: 2, backgroundColor: "orange", justifyContent: "center", borderRadius: 5}} onPress={() => this.showRatingPage(rowData, sectionID, rowID)}>
              <Text style={{textAlign: "center", color: "white"}}>Rate your lesson</Text>
            </TouchableOpacity>
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
            <View style={[AppStyles.row, styles.titleWrapper]}>
              <Text style={styles.txtTitle} numberOfLines={1} ellipsizeMode="tail">
                {rowData.name}</Text>
            </View>
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
      <View>
        <ListView
          dataSource={this.state.ListDataSource}
          renderRow={this.renderRow}
        />
        <View style={{height: 50, marginBottom: 0}}/>
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

export default AppointmentsView;
