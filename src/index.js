import axios from 'axios';

const getForecast = async (cityName) => {
  try {
    const responseLocation = await axios.get(`https://www.metaweather.com/api/location/search/?query=${cityName}`);
    const [{ woeid, title }] = responseLocation.data;
    const responseForecast = await axios.get(`https://www.metaweather.com/api/location/${woeid}`);
    const { consolidated_weather: weather } = responseForecast.data;
    const [{ weather_state_name: weatherState, the_temp: temperature }] = weather;
    const normalizedTemperature = Math.round(temperature);
    return `${title}, ${weatherState}, temperature: ${normalizedTemperature}`;
  } catch (err) {
    return err;
  }
};

export default getForecast;
