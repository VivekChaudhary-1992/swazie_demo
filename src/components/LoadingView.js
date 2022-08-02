import React from 'react';
import {Modal, StyleSheet, View, StatusBar, ActivityIndicator} from 'react-native';
import appColors from '../config-app/appColors';
import appDimensions from '../config-app/appDimensions';

const LoadingView: () => React$Node = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={props.visible}
      onRequestClose={() => {
        props.onRequestClose();
      }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={appColors.header} barStyle="dark-content" />
        <View style={styles.wrapper}>
          <ActivityIndicator size="large" color={appColors.primary} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: appDimensions.DIM_150,
    height: appDimensions.DIM_120,
    backgroundColor: appColors.greyLight,
  },
});

export default LoadingView;
