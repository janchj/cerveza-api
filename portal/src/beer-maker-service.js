import axios from 'axios';

const ENDPOINT_URL = 'https://bf90fi326d.execute-api.eu-west-2.amazonaws.com/dev/';

const getDeviceReadings = (deviceId) => {
  return axios.get(`${ENDPOINT_URL}/devices/${deviceId}`);
};

export default {
  getDeviceReadings,
};
