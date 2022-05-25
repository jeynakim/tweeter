/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Function renderTweets ->
  // loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(`<section class="tweets-container"></section>`);
    for (let data of tweets) {
      $(createTweetElement(data)).appendTo($tweetsContainer);
    }
    $($tweetsContainer).appendTo(".container");
  };
  
  // Event Listener and Prevent the Default Behaviour
  $("form").submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: formData,
      success: function (data) {
        $(".tweets-container").empty()
        loadTweets();
      }, error: function () {
        alert('error loading page');
      }
    });
  });
  
  // Function createTweetElement
  const createTweetElement = function (tweet) {
    return $tweetData = $(`<article class="tweet">
      <header>
        <div class="header-icon">
          <img src="${tweet.user.avatars}">
          <span class="span-tweet">${tweet.user.name}</span>
        </div>
        <h3>${tweet.user.handle}</h3>
      </header>
      <section>
      <p>${tweet.content.text}</p>
      </section>
      <footer>
        <span>${timeago.format(tweet.created_at)}</span>
        <div class="tweet-icon">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i> 
        </div>
      </footer>
    </article>
    `);
  }
  
    // Function loadTweets
    function loadTweets() {
      $.ajax({
        type: "GET",
        url: '/tweets',
        success: function (data) {
          const sortedData = data.sort((pre, crr) => {
            return crr.created_at - pre.created_at;
          })
          renderTweets(sortedData);
        }, error: function () {
          alert('error loading page');
        }
      });
    }
  loadTweets();
    // renderTweets(tweetData);
  });



//   const $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.


