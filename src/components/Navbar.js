import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import appColors from '../config-app/appColors';
import appDimensions from '../config-app/appDimensions';
import Icon from 'react-native-vector-icons/Ionicons';

const Navbar: () => React$Node = (props) => {
  const combineStyles = StyleSheet.flatten([styles.container, props.style]);
  return (
    <View style={combineStyles}>
      <View style={{flex: 0.7}}>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => {
            props.onBackPress();
          }}>
          <Icon
            backgroundColor="transparent"
            name="ios-arrow-back-circle-outline"
            size={appDimensions.DIM_28}
            color={appColors.white}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>{props.title || ''}</Text>

      <View style={{flex: 0.7}}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    height: appDimensions.DIM_50,
    backgroundColor: appColors.header,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: appDimensions.DIM_8,
  },
  titleText: {
    flex: 1.4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: appDimensions.DIM_13,
    lineHeight: appDimensions.DIM_16,
    color: appColors.white,
  },
});

export default Navbar;
