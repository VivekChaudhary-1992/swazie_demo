import {
  CLEAR_HOME_REDUCER_DATA,
  FETCH_CUSTOMERS_LIST,
  IS_FETCHING_DATA,
  SAVE_CHART_DETAILS,
  SAVE_CUSTOMERS_LIST,
} from './HomeActionCreator';

const INITIAL_STATE = {
  currentPageNo: 1,
  customersList: [],
  chartList: [],
  isFetchingData: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_LIST:
      return {
        ...state,
        currentPageNo: action.payload.pageNumber,
      };
    case SAVE_CUSTOMERS_LIST:
      return {
        ...state,
        customersList: action.payload.list,
      };
    case SAVE_CHART_DETAILS:
      return {
        ...state,
        chartList: action.payload.list,
      };
    case IS_FETCHING_DATA:
      return {
        ...state,
        isFetchingData: action.payload.status,
      };

    case CLEAR_HOME_REDUCER_DATA:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
};
