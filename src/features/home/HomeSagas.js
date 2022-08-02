import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import {takeLatest, call, put} from 'redux-saga/effects';
import {
  FETCH_CHART_DETAILS,
  FETCH_CUSTOMERS_LIST,
  isFetchingData,
  saveChartDetails,
  saveCustomersList,
} from './HomeActionCreator';
import {findChartDetails, getCustomersList} from '../../network/Netowk';
import appCodes from '../../config-app/appCodes';
import appErrorMessage from '../../config-app/appErrorMessage';
const COLORS = ['red', 'blue', 'green', 'yellow', 'grey', 'pink', 'orange'];

// Our watcher Saga:
function* watchGetCustomerList() {
  yield takeLatest(FETCH_CUSTOMERS_LIST, getCustomerList);
}

function* watchGetChartDetails() {
  yield takeLatest(FETCH_CHART_DETAILS, getChartDetails);
}

// Our worker Saga:
function* getCustomerList(action) {
  yield put(isFetchingData(true));
  // yield delay(3000);
  try {
    const {pageNumber} = action.payload;
    let response = yield call(getCustomersList, pageNumber);
    yield put(isFetchingData());
    if (response.status == 200) {
      if (
        response &&
        response.data &&
        response.data != null &&
        response.data != ''
      ) {
        // console.log('CUSTOMER DATA => ', JSON.stringify(response.data));
        const data = response.data;

        if (appCodes.CODE_SUCCESS == data?.status) {
          let list = [];
          if (
            data.hasOwnProperty('data') &&
            data.data.hasOwnProperty('customers')
          ) {
            list = data.data.customers;
            if (!Array.isArray(list)) {
              list = [];
            }
            if (list.length > 0) {
              list.map((e) => (e.chartList = []));
            }
          }
          yield put(saveCustomersList(list));
        } else {
          Toast.show(appErrorMessage.EXCEPTION_ERROR);
        }
      } else {
        Toast.show(appErrorMessage.EXCEPTION_ERROR);
      }
    } else {
      Toast.show(appErrorMessage.EXCEPTION_ERROR);
    }
    yield put(isFetchingData());
  } catch (error) {
    console.log(error);
    yield put(isFetchingData());
    Toast.show(appErrorMessage.EXCEPTION_ERROR);
  }
}

function* getChartDetails(action) {
  yield put(isFetchingData(true));
  // yield delay(3000);
  try {
    const {customerId, startDate, endDate} = action.payload;
    let response = yield call(findChartDetails, startDate, endDate);
    yield put(isFetchingData());
    if (response.status == 200) {
      if (
        response &&
        response.data &&
        response.data != null &&
        response.data != ''
      ) {
        // console.log('CHART DATA => ', JSON.stringify(response.data));
        const data = response.data;

        if (appCodes.CODE_SUCCESS == data?.status) {
          let list = [];
          let pieChartList = [];
          const storeData = store.getState();
          const {customersList} = storeData.home;
          const tempArray = [...customersList];
          if (
            data.hasOwnProperty('data') &&
            data.data.hasOwnProperty('pie_chart')
          ) {
            list = data.data.pie_chart;
            if (!Array.isArray(list)) {
              list = [];
            }
            if (list.length > 0) {
              list.forEach((e, index) => {
                const obj = {};
                obj.name = e.name;
                obj.data = e.value;
                obj.color = COLORS[index];
                pieChartList.push(obj);
              });
            }
            if (tempArray.length > 0) {
              tempArray.map((e) => {
                if (e.customer_id == customerId) {
                  e.chartList = pieChartList;
                }
              });
            }
          }
          yield put(saveChartDetails(pieChartList));
          yield put(saveCustomersList(tempArray));
        } else {
          Toast.show(appErrorMessage.EXCEPTION_ERROR);
        }
      } else {
        Toast.show(appErrorMessage.EXCEPTION_ERROR);
      }
    } else {
      Toast.show(appErrorMessage.EXCEPTION_ERROR);
    }
    yield put(isFetchingData());
  } catch (error) {
    console.log(error);
    yield put(isFetchingData());
    Toast.show(appErrorMessage.EXCEPTION_ERROR);
  }
}

export {watchGetCustomerList, watchGetChartDetails};
