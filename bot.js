  // var $ = require('jquery');
  var Twit = require("twit");
  var TwitterBot = require("node-twitterbot").TwitterBot;
    Bot = new TwitterBot({

  //for deployment in heroku
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
  });
// var phraseArray = [ "going swimming in a creek in Austin? Check for more info",
//                     "im tweeting--have you seen my count",
//                     "tweet tweet--Austin TX--check the bacteria levels",
//                     "tweetstorm? recent rainstorm? hmmmm....",
//                     "looking forward to giving you a count, still in development!",
//                     "it's me, Colin the fecal e.coli! check out my numbers",
//                     "holy cow!, is that e coli?"
//                   ];
// function chooseRandom(myArray) {
//   return myArray[Math.floor(Math.random() * myArray.length)];
// }
// var phrase = chooseRandom(phraseArray) + ", " + chooseRandom(phraseArray);
Bot.tweet(phrase);
