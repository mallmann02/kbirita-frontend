// require('dotenv').config();

// const url = process.env.URL_SERVER;
// console.log(url);

const getServerUrl = () => (
  // const url = process.env.URL_SERVER;
  process.env.REACT_APP_API_BASE_URL
);

module.exports = getServerUrl;
