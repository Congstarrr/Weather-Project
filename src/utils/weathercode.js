const request = require('postman-request');

const weathercode = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cc1a6404a54857a95840c39dc59603bb&query=${latitude}, ${longitude}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    const data = body;
    if (error) {
      callback("Unable to connect to the service")
    } else if (data.error) {
      callback("The location could't be found")
    } else {
      callback(null, {
        location: data.location.name,
        temperature: data.current.temperature,
        feelslike: data.current.feelslike,
      });
    }
  });
}

module.exports = weathercode;



