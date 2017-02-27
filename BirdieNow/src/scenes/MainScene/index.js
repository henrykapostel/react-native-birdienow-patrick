import React, { PropTypes, Component } from 'react';
import { Text, View, Image, StatusBar, Navigator } from 'react-native';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { default as styles} from './styles';
import { AppointmentsView, FavoritesView, HomeView, ProfileView, SearchView } from 'AppScenes';
import { MainTabBar, HeaderBar } from 'AppComponents';
import AppConfig from 'AppConfig';
import { GlobalStorage } from 'AppUtilities';

class MainScene extends Component {
  static propTypes = {
    pushScene: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    StatusBar.setHidden(false);

    this.onChangeTab = this.onChangeTab.bind(this);
    this.renderScene = this.renderScene.bind(this);

    this.children = [];
    this.moreChildren = [];
    this.state = {
      currentTab: 0,
    };
  }

  async componentWillMount() {
    try {
      this.curStateIndex = await GlobalStorage.getItem(AppConfig.stor_state);
      this.selTicketArray = await GlobalStorage.getJSON(AppConfig.stor_ticket);

      this.props.updateActiveState(this.curStateIndex);

      if (this.children[0]) {
        const navRoutArray = this.children[0].getCurrentRoutes(0);
        this.moreChildren[navRoutArray.length - 1].getWrappedInstance().setHeaderOptions();
      }
      this.props.updateActiveTicket(this.selTicketArray);
    } catch (error) {
    }
  }

  componentDidMount() {
  }

  onChangeTab({ i, ref, from }) {
    // if (i === 2) {
    //   this.children[i].setHeaderOptions();
    // } else if (i === 3) {
    //   const navRoutArray = this.children[i].getCurrentRoutes(0);
    //   this.moreChildren[navRoutArray.length - 1].setHeaderOptions();
    // } else {
    //   const navRoutArray = this.children[i].getCurrentRoutes(0);
    //   if (i === 0 && navRoutArray[navRoutArray.length - 1].index > 0) {
    //     this.moreChildren[navRoutArray.length - 1].setHeaderOptions();
    //   } else {
    //     this.moreChildren[navRoutArray.length - 1].getWrappedInstance().setHeaderOptions();
    //   }
    // }
    // this.setState({ currentTab: i });
  }

  renderScene(route, navigator) {
    const methods = {
      popNavBack: () => navigator.pop(),
      pushNavScene: (component, passProps, transition) =>
        navigator.push({
          component,
          index: route.index + 1,
          transition,
          passProps,
        }),
      getCurrentRoutes: () => navigator.getCurrentRoutes(0),
    };

    return (
      <View style={styles.container}>
        <route.component
          ref={(c) => { this.moreChildren[route.index] = c; }}
          navigator={navigator}
          route={route}
          {...route.passProps}
          {...methods}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollableTabView
          style={styles.scrollTabView}
          renderTabBar={() => <MainTabBar />}
          tabBarPosition="overlayBottom"
          tabBarActiveTextColor={AppConfig.secondaryColor}
          tabBarInactiveTextColor="#909090"
          tabBarUnderlineStyle={{ backgroundColor: '#fff' }}
        >
          <HomeView tabLabel="1"/>
          <SearchView tabLabel="2"/>
          <View tabLabel="3">
            <AppointmentsView {...this.props}/>
          </View>
          <FavoritesView tabLabel="4"/>
          <ProfileView tabLabel="5"/>
        </ScrollableTabView>
      </View>
    );
  }
}

export default MainScene;
