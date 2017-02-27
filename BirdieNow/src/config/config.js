import Dimensions from 'Dimensions';
import { Platform, StatusBar } from 'react-native';

const window = Dimensions.get('window');

export default {
  // App Details
  appName: 'BirdieNow',

  // Window Dimensions
  windowHeight: window.height,
  windowWidth: window.width,

  // App Strings
  sceneFromBottom: 'FloatFromBottom',
  sceneFromRight: 'FloatFromRight',
  sceneFade: 'FadeAndroid',

  globalStoragePrefix: 'TIX_DATA_',
  stor_state: 'State',
  stor_ticket: 'Ticket',
  stor_isFirst: 'First',
  stor_events: 'Events',

  // App Values
  aryLoc: [
    { key: 'NSW', description: 'New South Wales' },
    { key: 'VIC', description: 'Victoria' },
    { key: 'QLD', description: 'Queensland' },
    { key: 'SA', description: 'South Australia' },
    { key: 'ACT', description: 'Australian Capital Territory' },
    { key: 'TAS', description: 'Tasmania' },
    { key: 'NT', description: 'Northern Territory' },
    { key: 'ALL', description: 'All Australia' },
  ],
  apiUrl: 'https://api.birdienow.com/api/v2/',
  leftAction: null,
  rightAction: null,
  rightAction2: null,

  //GlobalConstants
  global_userToken: "",

  // General Element Dimensions
  navbarHeight: 50,
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,

  // Fonts
  baseFont: 'Arial',
  baseFontSize: 14,

  // Colors
  primaryColor: '#f9f9f9',
  secondaryColor: '#464646',
  textColor: '#464646',
  borderColor: '#E7E7E7',
};
