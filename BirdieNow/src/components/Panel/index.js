import React, { Component, PropTypes } from 'react';
import { Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import styles from './styles';

class Panel extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    fontStyle: PropTypes.any,
    image: PropTypes.any,
    titleStyle: PropTypes.any,
    bodyStyle: PropTypes.any,
    index: PropTypes.any,
  };
  constructor(props) {
    super(props);

    if (this.props.index === 0) {
      this.icons = {
        up: require('img/icon/icon_expand_up.png'),
        down: require('img/icon/icon_expand_down.png')
      };
    } else {
      this.icons = {
        up: require('img/icon/icon_up.png'),
        down: require('img/icon/icon_down.png')
      };
    }

    this.state = {
      expanded: false,
      animation: new Animated.Value(),
      isFirst: true,
      minHeight: 0,
      maxHeight: 0,
    };

    this.setMaxHeight = this.setMaxHeight.bind(this);
    this.setMinHeight = this.setMinHeight.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  setMaxHeight(event) {
    if (this.state.maxHeight >= event.nativeEvent.layout.height) {
      return;
    }
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  }

  setMinHeight(event) {
    if (this.state.minHeight > event.nativeEvent.layout.height) {
      return;
    }
    if (this.state.isFirst) {
      this.state.animation.setValue(event.nativeEvent.layout.height);
    }
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  }

  toggle() {
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
      finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    if (this.state.isFirst) {
      this.setState({ expanded: !this.state.expanded, isFirst: false });
    } else {
      this.setState({ expanded: !this.state.expanded });
    }

    this.state.animation.setValue(initialValue);
    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();
  }

  render() {
    let icon = this.icons.down;

    if (this.state.expanded) {
      icon = this.icons.up;
    }

    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <TouchableOpacity
          onPress={this.toggle}
        >
          <View style={[styles.titleContainer, this.props.titleStyle]} onLayout={this.setMinHeight}>
            {this.props.image ? <Image style={styles.icon} source={this.props.image} /> : null }
            <Text style={[styles.title, this.props.fontStyle]}>{this.props.title}</Text>
            <Image style={styles.buttonImage} source={icon} />
          </View>
        </TouchableOpacity>

        <View style={[styles.body, this.props.bodyStyle]} onLayout={this.setMaxHeight}>
          {this.props.children}
        </View>

      </Animated.View>
    );
  }
}

export default Panel;
