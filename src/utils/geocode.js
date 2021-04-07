const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibW1kYWxpcmUiLCJhIjoiY2tteXh3aHp1MDR5NjJvbGNqNnRieW9qOCJ9.6_usUpNdam3dBPzGPLLNyA&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            const {place_name, center} = body.features[0];
            const data = {
                location: place_name,
                latitude: center[1],
                longitude: center[0]
            };
            callback(undefined, data)
        }
    })
};

module.exports = geocode;