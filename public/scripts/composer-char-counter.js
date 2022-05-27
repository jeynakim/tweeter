// Number of Character and Characters in text area limit setting (140 words)
let numberOfCharacters = 140;
$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    const chartersInTextArea = $(this).val().length;
    const charactersLeft = numberOfCharacters - chartersInTextArea;
    if (chartersInTextArea > 140) {
      ["-", charactersLeft].join("");
      $(".counter").css("color", "#bc4749").text(charactersLeft)
    }
    else {
      $(".counter").css("color", "#545149").text(charactersLeft)
    }
  });
});
  

