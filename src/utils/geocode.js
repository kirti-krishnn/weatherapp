const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=52e5537d6fd5ad5905078f54953c9899&query=${address}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the location service", undefined);
    } else if (response.body.error) {
      callback(
        "The provided location could not be found. Please re-enter the location correctly.",
        undefined
      );
    } else {
      callback(undefined, [
        response.body.location.lat,
        response.body.location.lon,
      ]);
    }
  });
};

module.exports = geocode;
