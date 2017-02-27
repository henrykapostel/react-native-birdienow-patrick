import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

class MainTabBar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    scrollValue: PropTypes.any,
    style: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);

    this.tabRefIcons = [];
    this.tabRefTexts = [];
    this.tabIcons = [
      require('img/icon/nav-home.png'),
      require('img/icon/nav-search.png'),
      require('img/icon/nav-appointment.png'),
      require('img/icon/nav-favorite.png'),
      require('img/icon/nav-profile.png')
    ];

    this.setAnimationValue = this.setAnimationValue.bind(this);
  }

  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  }

  setAnimationValue({ value, }) {
    this.tabRefIcons.forEach((icon, i) => {
      const progress = Math.min(1, Math.abs(value - i));
      icon.setNativeProps({
        style: {
          tintColor: this.iconColor(progress),
        },
      });
    });
    this.tabRefTexts.forEach((text, i) => {
      const progress = Math.min(1, Math.abs(value - i));
      text.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });
  }

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 70 + ((177 - 70) * progress);
    const green = 70 + ((177 - 70) * progress);
    const blue = 70 + ((177 - 70) * progress);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          const colStyle = this.props.activeTab === i ? { tintColor: 'rgb(70,70,70)' } : { tintColor: 'rgb(177,177,177)' };
          const txtColStyle = this.props.activeTab === i ? { color: 'rgb(70,70,70)' } : { color: 'rgb(177,177,177)' };
          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Image
                source={this.tabIcons[i]}
                style={[styles.iconTab, colStyle]}
                ref={(c) => { this.tabRefIcons[i] = c; }}
              />
            </TouchableOpacity>);
        })}
      </View>);
  }
}

export default MainTabBar;
