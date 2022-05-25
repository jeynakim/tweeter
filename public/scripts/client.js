/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// Function renderTweets ->
// loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
const renderTweets = function (tweets) {
  const $tweetContainer = $(`<section class="tweet-container"></section>`);
  for (let data in tweets) {
    $(createTweetElement(data)).appendTo($tweetContainer);
  }
  $($tweetContainer).appendTo(".container");
};


// Function createTweetElement ->
// 
  const createTweetElement = function (tweet) {
    return $tweetData = $(`<article class="tweet">
    <header>
      <div class="header-icon">
        <img src="https://i.imgur.com/73hZDYK.png">
        <span class="span-tweet">${tweet.user.name}</span>
      </div>
      <h3>${tweet.user.handle}</h3>
    </header>
    <section>
   <p>If I have seen further it is by standing on the shoulders of giants</p>
    </section>
    <footer>
      <span>${tweet.user.created_at}</span>
      <div class="tweet-icon">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i> 
      </div>
    </footer>
  </article>
  `);
}


$( document ).ready(function() {
  renderTweets(tweetData);
});

//   const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


