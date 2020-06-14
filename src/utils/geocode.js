const request = require('postman-request');


const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWVya3VyMTIzIiwiYSI6ImNrYjVndDk3bjBvNGEyeW16cHlid2txZ3YifQ.NGOWOq0yq0wvkhzDzjnUpQ&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    const data = body;
    if (error) {
      callback('Unable to connect to the Geo API', null);
    } else if (data.message === 'Not Found' || data.features.length === 0) {
      callback('Location not found', null);
    } else {
      callback(null, {
        longitude: data.features[0].center[0],
        latitude: data.features[0].center[1],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;