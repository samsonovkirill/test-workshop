import fs from 'fs';
import nock from 'nock';
import getForecast from '../src';

describe('General', () => {
  const locationResponse = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/server_response_location.json', 'utf8'));
  const forecastResponse = JSON.parse(fs.readFileSync('./__tests__/__fixtures__/server_response_forecast.json', 'utf8'));
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf8').trim();
  const [{ title: city, woeid }] = locationResponse;
  nock.disableNetConnect();
  nock('https://www.metaweather.com/api/location/search')
    .get(`/?query=${city}`)
    .reply(200, locationResponse);
  nock('https://www.metaweather.com/api/location')
    .get(`/${woeid}`)
    .reply(200, forecastResponse);
  test('Forecast', async () => {
    const forecast = await getForecast(city);
    expect(forecast).toEqual(result);
  });
});
