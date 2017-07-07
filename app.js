// Today
// require('locus')
var fs = require("fs")
require('dotenv').config()
var Twit = require("twit");
var TwitterBot = require("node-twitterbot").TwitterBot;
var dateMax = new Date();
var prevDate = new Date().setDate(dateMax.getDate()-70);
dateMax = dateMax.toISOString();
var dateMin = new Date(prevDate);
var waterThing =[]
dateMin = dateMin.toISOString();
dateMin=dateMin.slice(0,-1);
dateMax=dateMax.slice(0,-1);
// eval(locus)
console.log(dateMax,dateMin);
var uriThing = encodeURI(`https://data.austintexas.gov/resource/v7et-4fvp.json?$where=sample_date>='${dateMin}'and sample_date<='${dateMax}'and parameter='E COLI BACTERIA'`)
console.log(uriThing);
var request = require('request-promise-native');
var options = {
    uri: uriThing,
    qs: {
        $$app_token: process.env.BOT_APP_TOKEN

    },

    json: true
};

request(options)
    .then(function (data) {
        // console.log('****data is****: ', data);
        waterThing = data

        // console.log('this is the waterThing',waterThing)
        // console.log('this is the first parameter in waterThing', waterThing[0].result);
        // console.log('this is where it was tested',waterThing[0].location.coordinates);

          Bot = new TwitterBot({
            consumer_key: process.env.BOT_CONSUMER_KEY,
            consumer_secret: process.env.BOT_CONSUMER_SECRET,
            access_token: process.env.BOT_ACCESS_TOKEN,
            access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
          })
          console.log(waterThing)
          var shortDate = new Date(waterThing[0].sample_date).toLocaleDateString()
          console.log(shortDate);
          Bot.tweet(`E Coli count on ${shortDate} was ${waterThing[0].result}/100ml \u{2705} \u{1f3ca} at www.google.com/maps/place/${waterThing[0].lat_dd_wgs84},${waterThing[0].lon_dd_wgs84}`);
          // Bot.tweet("\u{2705}"+"\u{1f3ca}"+" or "+"\u{1f6ab}"+"\u{1f4a9}")
    })
//
//     .catch(function (err) {
//         console.log('here is the error: ',err);// API call failed...
//     });
