
// require('locus')
var fs = require("fs")
require('dotenv').config()
var Twit = require("twit");
var TwitterBot = require("node-twitterbot").TwitterBot;

var dateMax = new Date();
var prevDate = new Date().setDate(dateMax.getDate()-90);
dateMax = dateMax.toISOString();
var dateMin = new Date(prevDate);
dateMin = dateMin.toISOString();
dateMin=dateMin.slice(0,-1);
dateMax=dateMax.slice(0,-1);
var waterThing =[]
// eval(locus)
// console.log(dateMax,dateMin);
var uriThing = encodeURI(`https://data.austintexas.gov/resource/v7et-4fvp.json?$where=sample_date>='${dateMin}'and sample_date<='${dateMax}'and parameter='E COLI BACTERIA'`)
// console.log(uriThing);
var request = require('request-promise-native');
var options = {
    uri: uriThing,
    qs: {
        $$app_token: process.env.BOT_APP_TOKEN
    },

    json: true
};

request(options)
    .then(function(data){

        waterThing = data

          Bot = new TwitterBot({
            consumer_key: process.env.BOT_CONSUMER_KEY,
            consumer_secret: process.env.BOT_CONSUMER_SECRET,
            access_token: process.env.BOT_ACCESS_TOKEN,
            access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
          })
           var latestDate=[]
            for (let i=0; i<waterThing.length; i++){
              latestDate.push(waterThing[i].sample_date)
            }
              latestDate=latestDate.sort()
              console.log('this is the last sample date ', latestDate[latestDate.length-1]);

              // fs = require('fs');
fs.writeFile('time.json', latestDate[latestDate.length-1], function (err) {
  if (err) return console.log(err);
  console.log('this should have sent something to time.json');
});
fs = require('fs')
fs.readFile('time.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log('this is what was in time.json',data);
});

            for (let i=0; i<waterThing.length; i++){

              var shortDate = new Date(waterThing[i].sample_date).toLocaleDateString()
              if (waterThing[i].result<125){

                // Bot.tweet(`E Coli count on ${shortDate} was ${waterThing[i].result}/100ml \u{2705} \u{1f3ca} at www.google.com/maps/place/${waterThing[i].lat_dd_wgs84},${waterThing[i].lon_dd_wgs84}`);
                }
              else{

                // Bot.tweet(`E Coli count on ${shortDate} was ${waterThing[i].result}/100ml \u{1f6ab} \u{1f4a9} at www.google.com/maps/place/${waterThing[i].lat_dd_wgs84},${waterThing[i].lon_dd_wgs84}`);
                }
              }

console.log('this is the raw date from the returned object', latestDate);
        })
    .catch(function (err) {
      console.log('here is the error: ',err);// API call failed...
    });
