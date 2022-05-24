let numberOfCharacters = 140;
$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    const chartersInTextArea = $(this).val().length;
    const charactersLeft = numberOfCharacters - chartersInTextArea;
    if (chartersInTextArea > 140) {
      ["-", charactersLeft].join("");
      $(".counter").css("color", "red").text(charactersLeft)
    }
    else {
      $(".counter").css("color", "black").text(charactersLeft)
    }
  });
});
  

