const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=52e5537d6fd5ad5905078f54953c9899&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the weather service", undefined);
    } else if (response.body.error) {
      callback(
        "The provided location could not be found based on coordinates. Please re-enter the location correctly.",
        undefined
      );
    } else
      callback(
        undefined,
        `The current temperature in ${response.body.location.name} is ${response.body.current.temperature} and the chances of rain are ${response.body.current.precip}%`
      );
  });
};

module.exports = forecast;
