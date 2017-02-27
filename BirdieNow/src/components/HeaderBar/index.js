import React, { PropTypes } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from './styles';
import AppConfig from 'AppConfig';
import AppStyles from 'AppStyles';

const renderLeftRightSide = (label, action, sideFontSize, color, leftWidth, isDisabled) => {
  return (<TouchableOpacity onPress={action} style={styles.button} disabled={isDisabled}>
    {
      typeof label === 'object' ? label :
        <Text style={{ color, fontSize: sideFontSize }}>
          {label}
        </Text>
    }
  </TouchableOpacity>);
};

const renderCenter = (rightLabel2, centerLabel, action, centerFontSize, color) => {
  const pStyle = rightLabel2 ? { marginLeft: 30 } : { marginRight: 10 };
  if (action) {
    return (<TouchableOpacity onPress={action} style={[styles.centerView, pStyle]}>
      {
        typeof centerLabel === 'object' ? centerLabel :
          <Text style={[AppStyles.semiBoldFont, { color, fontSize: centerFontSize }]} numberOfLines={1} ellipsizeMode="tail">
            {centerLabel}
          </Text>
      }
    </TouchableOpacity>);
  }
  return (<View style={[styles.centerView, pStyle]}>
    {
      typeof centerLabel === 'object' ? centerLabel :
        <Text style={[AppStyles.semiBoldFont, { color, fontSize: centerFontSize }]} numberOfLines={1} ellipsizeMode="tail">
          {centerLabel}
        </Text>
    }
  </View>);
};

const getLeftLabel = (leftLabel, tintColor, sideFontSize, isDisabled) => {
  if (leftLabel && typeof leftLabel === 'object') {
    return leftLabel;
  }
  const opacity = isDisabled ? { opacity: 0.6 } : { opacity: 1 };

  return (
    <View style={styles.leftLabelView}>
      <Image
        source={require('img/icon/icon_back.png')}
        style={[styles.iconBack, { tintColor }, opacity]}
      />
    </View>
  );
};

const getRightLabel = (label, action, sideFontSize, color, isDisabled) => {
  const opacity = isDisabled ? { opacity: 0.6 } : { opacity: 1 };
  return (<TouchableOpacity onPress={action} style={[styles.button, { minWidth: 40 }]} disabled={isDisabled}>
    {
      typeof label === 'object' ? label :
        <Text style={[{ color, fontSize: sideFontSize, paddingRight: 5 }, AppStyles.boldFont, opacity]}>
          {label}
        </Text>
    }
  </TouchableOpacity>);
};

export default function HeaderBar({
  leftLabel,
  leftDisabled,
  rightLabel,
  rightLabel2,
  rightDisabled,
  centerLabel,
  leftAction,
  centerAction,
  rightAction,
  rightAction2,
  backgroundColor,
  sideFontSize,
  centerFontSize,
  color,
  iconBack,
  wrapStyle,
  leftWidth,
  isShadow,
}) {
  const shadow = isShadow ? { shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0
    } } : null;
  return (
    <View style={[styles.container, { backgroundColor }, wrapStyle, shadow]}>
      <View style={styles.statusBar} />
      <View style={styles.headerContainer}>
        {leftLabel || iconBack ?
          renderLeftRightSide(
            getLeftLabel(leftLabel, color, sideFontSize, leftDisabled), leftAction, sideFontSize, color, leftWidth, leftDisabled
          ) :
          <View style={{ width: 50 }} />
        }
        {centerLabel ? renderCenter(rightLabel2, centerLabel, centerAction, centerFontSize, color) : <View style={{ width: 1 }} /> }
        {rightLabel2 ? getRightLabel(rightLabel2, rightAction2, sideFontSize, color, rightDisabled) : <View />}
        {rightLabel ? getRightLabel(rightLabel, rightAction, sideFontSize, color, rightDisabled) :
          <View style={{ width: 50 }} />}
      </View>
    </View>
  );
}

HeaderBar.propTypes = {
  iconBack: PropTypes.bool,
  leftLabel: PropTypes.any,
  leftDisabled: PropTypes.bool,
  rightLabel: PropTypes.any,
  rightDisabled: PropTypes.bool,
  rightLabel2: PropTypes.any,
  centerLabel: PropTypes.any,
  leftAction: PropTypes.func,
  centerAction: PropTypes.func,
  rightAction: PropTypes.func,
  rightAction2: PropTypes.func,
  backgroundColor: PropTypes.string,
  sideFontSize: PropTypes.number,
  centerFontSize: PropTypes.number,
  color: PropTypes.string,
  wrapStyle: View.propTypes.style,
  leftWidth: PropTypes.number,
  isShadow: PropTypes.bool,
};

HeaderBar.defaultProps = {
  iconBack: false,
  backgroundColor: AppConfig.primaryColor,
  sideFontSize: 15,
  centerFontSize: 19,
  color: '#464646',
  leftWidth: 50,
  isShadow: true,
};
