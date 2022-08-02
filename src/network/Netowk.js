import axios from 'axios';
import appConstants from '../config-app/appConstants';

const doGet = (endpoint) => {
  return axios.get(appConstants.BASE_URL + endpoint);
};

const doPost = (endpoint, params) => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  return axios.post(
    appConstants.BASE_URL + endpoint,
    params.toString(),
    config,
  );
};

export function getCustomersList(pageNumber) {
  return doGet(`get_customers?current_page=${pageNumber}`);
}

export function findChartDetails(startDate, endDate) {
  const params = new URLSearchParams();
  
  params.append('start_date', startDate);
  params.append('end_date', endDate);
  return doPost('chart_details', params);
}
