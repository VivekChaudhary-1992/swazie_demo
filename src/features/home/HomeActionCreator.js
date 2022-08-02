export const FETCH_CUSTOMERS_LIST = 'FETCH_CUSTOMERS_LIST';
export const SAVE_CUSTOMERS_LIST = 'SAVE_CUSTOMERS_LIST';
export const FETCH_CHART_DETAILS = 'FETCH_CHART_DETAILS';
export const SAVE_CHART_DETAILS = 'SAVE_CHART_DETAILS';
export const IS_FETCHING_DATA = 'IS_FETCHING_DATA';
export const CLEAR_HOME_REDUCER_DATA = 'CLEAR_HOME_REDUCER_DATA';

export function fetchCustomersList(pageNumber = 1) {
  return {
    type: FETCH_CUSTOMERS_LIST,
    payload: {
      pageNumber,
    },
  };
}

export function saveCustomersList(list = []) {
  return {
    type: SAVE_CUSTOMERS_LIST,
    payload: {
      list,
    },
  };
}

export function fetchChartDetails(customerId, startDate, endDate) {
  return {
    type: FETCH_CHART_DETAILS,
    payload: {
      customerId,
      startDate,
      endDate,
    },
  };
}

export function saveChartDetails(list = []) {
  return {
    type: SAVE_CHART_DETAILS,
    payload: {
      list,
    },
  };
}

export function isFetchingData(status = false) {
  return {
    type: IS_FETCHING_DATA,
    payload: {status},
  };
}
export function clearHomeReducerData() {
  return {
    type: CLEAR_HOME_REDUCER_DATA,
    payload: {},
  };
}
