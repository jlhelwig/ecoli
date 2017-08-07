var fs = require("fs")
require('dotenv').config()
var Twit = require("twit");
var TwitterBot = require("node-twitterbot").TwitterBot;
var dateMax = new Date();
var prevDate = new Date().setDate(dateMax.getDate()-90);
var waterThing =[]
var timeData
dateMax = dateMax.toISOString();
var dateMin = new Date(prevDate);
var latestDate=[]
dateMin = dateMin.toISOString();
dateMin=dateMin.slice(0,-1);
dateMax=dateMax.slice(0,-1);
var uriThing = encodeURI(`https://data.austintexas.gov/resource/v7et-4fvp.json?$where=sample_date>='${dateMin}'and sample_date<='${dateMax}'and parameter='E COLI BACTERIA'`)
var request = require('request-promise-native');
var options = {
    uri: uriThing,
    simple: false,
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

              // this reads the time.json file and compares to daily call on API
        fs.readFile('time.json', 'utf8', function (err,timeData) {
            for (let i=0; i<waterThing.length; i++){
              //converts the long date string to human readable string
              var shortDate = new Date(waterThing[i].sample_date).toLocaleDateString()
              //tests if the water test is safe, and tests if the sample_date is newer than the latest sample date stored in time.json
                if (waterThing[i].result<125 && waterThing[i].sample_date>timeData){
              //good test result 'tweet'
                  Bot.tweet(`E Coli count on ${shortDate} was ${waterThing[i].result}/100ml \u{2705} \u{1f3ca} at www.google.com/maps/place/${waterThing[i].lat_dd_wgs84},${waterThing[i].lon_dd_wgs84}`);
                };

                else{
              //bad test result 'tweet'
                  Bot.tweet(`E Coli count on ${shortDate} was ${waterThing[i].result}/100ml \u{1f6ab} \u{1f4a9} at www.google.com/maps/place/${waterThing[i].lat_dd_wgs84},${waterThing[i].lon_dd_wgs84}`);
                };
              };
              //finds the latest test data
            for (let i=0; i<waterThing.length; i++){
              latestDate.push(waterThing[i].sample_date);
            };
              latestDate=latestDate.sort();
              lastSampleDate = latestDate[latestDate.length-1];
              //updates the latest test data in time.json file
fs.writeFile('time.json', lastSampleDate, function(err) {
  if (err)
    return console.log(err);
  }
);

if (err) {
  return console.log(err);
}

}).catch(function(err) {
console.log('here is the error: ', err); // API call failed...
});
});
