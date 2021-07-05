const request = require("postman-request");

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query='+long+','+lat+'&units=m'

    request({ url, json: true }, (error, {body}) => {
        //da se vec parsira u objekat sa json: true
        if(error){
            callback("Unable to connect to the server", undefined);
        } else if (body.error){
            callback(body.error.info, undefined);
        } else {
            callback(undefined, body.location.name+ ":"+ body.current.weather_descriptions[0]); 
        }
    })
}

module.exports = forecast;