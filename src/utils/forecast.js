const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9366e20c9d1d5910f007acd904c09503&query=${latitude},${longitude}&units=f`;
    
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) { 
            callback('Unable to find location!', undefined);
        } else {
            const {temperature, feelslike, weather_descriptions} = body.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
        }
    });
}

module.exports = forecast;