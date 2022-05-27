/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const $button = $('.scroll-button')  // Scroll Button Action for the user
  $button.hide();
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      $button.show();
    } else {
      $button.hide();
    }
  });

  // Function renderTweets ->
  // loops through tweets, calls createTweetElement for each tweet, takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(`<section class="tweets-container"></section>`);
    for (let data of tweets) {
      $(createTweetElement(data)).appendTo($tweetsContainer);
    }
    $($tweetsContainer).appendTo(".container");
  };

  // Function tweetsPost -> to post new tweets
  const tweetsPost = function() {
    $("form").submit(function (event) {
      event.preventDefault();
      const formData = $(this).serialize();
      if ($('#tweet-text').val().length > 140) { //error-message handler
        $('.error-message').text('Oops! You have reached the maximum message length(140)').slideDown().delay(3000).slideUp();
      } else if ($('#tweet-text').val().length === 0) {
        $('.error-message').text('Please add any message to post your tweet!').slideDown().delay(12000).slideUp();
      } else {
        $.ajax({
          type: "POST",
          url: "/tweets",
          data: formData,
          success: function (data) {
            $(".tweets-container").empty();
            loadTweets();
          },
          error: function () {
            alert("error loading page");
          },
        });
      }
    });
  };
  
  // Function createTweetElement -> create new tweet post
const createTweetElement = function(tweet) {
 const $tweetData = $(`<article class="tweet">
      <header>
        <div class="avatar-icon">
          <img src="${tweet.user.avatars}">
          <span class="span-tweet">${tweet.user.name}</span>
        </div>
        <h3>${tweet.user.handle}</h3>
      </header>
      <p class ="tweet-content">${tweet.content.text}</p>
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
    $tweetData.find(".tweet-content").text(tweet.content.text);
    return $tweetData;
};

  // Function loadTweets -> to laad tweets
  function loadTweets() {
    $.ajax({
      type: "GET",
      url: "/tweets",
      success: function(data) {
        const sortedData = data.sort((pre, crr) => {
          return crr.created_at - pre.created_at;
        });
        renderTweets(sortedData);
      },
      error: function() {
        alert("error loading page");
      },
    });
  }
  loadTweets();
  tweetsPost();
});