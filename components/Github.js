var request = require('request');

var headers = {
    'Authorization': 'token 564ef390402388a2d945ee4f05b4321fef34a616'
};

var options = {
    url: 'https://api.github.com/repos/tmcdaniel511/EE461L-Team-Project/contributors',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

request(options, callback);
