import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import appColors from './config-app/appColors';
import configureStore from './redux-app/ConfigureStore';
import ReduxRouter from './ReduxRouter';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const {store, persistor} = configureStore(() => {
  console.log('rehydrated App.js');

});

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyStatusBar
          backgroundColor={appColors.header}
          barStyle="light-content"
        />
        {/* <StatusBar backgroundColor={appColors.basic} barStyle="light-content" /> */}
        <ReduxRouter />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default App;
