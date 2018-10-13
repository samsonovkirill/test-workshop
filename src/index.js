import axios from 'axios';

const getForecast = async cityName => new Promise(async (resolve, reject) => {
  try {
    const responseLocation = await axios.get(`https://www.metaweather.com/api/location/search/?query=${cityName}`);
    const [{ woeid, title }] = responseLocation.data;
    const responseForecast = await axios.get(`https://www.metaweather.com/api/location/${woeid}`);
    const { consolidated_weather: weather } = responseForecast.data;
    const [{ weather_state_name: weatherState, the_temp: temperature }] = weather;
    const normalizedTemperature = Math.round(temperature);
    const result = `${title}, ${weatherState}, temperature: ${normalizedTemperature}`;
    resolve(result);
  } catch (err) {
    reject(err);
  }
});

export default getForecast;
