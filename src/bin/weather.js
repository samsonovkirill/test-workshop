#!/usr/bin/env node
import program from 'commander';
import getForecast from '..';

program
  .version('0.0.1')
  .arguments('weather <city>')
  .description('Print a weather forecast for a specified city')
  .action(async (city) => {
    const forecast = await getForecast(city);
    console.log(forecast);
  });
program.parse(process.argv);
