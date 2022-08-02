import React from 'react';
import {Scene, Router, Stack, Drawer} from 'react-native-router-flux';
import HomeScreen from './features/home/HomeScreen';

const ReduxRouter: () => React$Node = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar>
        <Scene key="home" component={HomeScreen} initial />
      </Stack>
    </Router>
  );
};

export default ReduxRouter;
