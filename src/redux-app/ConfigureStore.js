import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/RootReducer';
import rootSaga from './sagas/RootSagas';


export default function configureStore(reydrationCallback) {
  const sagaMiddleware = createSagaMiddleware();
  let storeInhancers = __DEV__
    ? composeWithDevTools(applyMiddleware(sagaMiddleware))
    : applyMiddleware(sagaMiddleware);

  const persistConfig = {
    version: 1,
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['home'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  let store = createStore(persistedReducer, storeInhancers);
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store, {}, () => {
    reydrationCallback();
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  window.store = store;
  window.persistor = persistor;

  return {store, persistor};
}
