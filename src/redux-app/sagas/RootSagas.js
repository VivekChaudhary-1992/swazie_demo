import {all} from 'redux-saga/effects';
import {
  watchGetCustomerList,
  watchGetChartDetails,
} from '../../features/home/HomeSagas';

export default function* rootSaga() {
  yield all([watchGetCustomerList(), watchGetChartDetails()]);
}
