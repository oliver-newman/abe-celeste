$(function () {
  $('#next-button').click(function () {
    $('#initial-form').hide();
    showQuestion(0)
  });
});

function showQuestion(num) {
  $(`#form${num}`).show();
  $('#next-button').click(function() {
    $(`#form${num}`).hide();
    if (num < 9) {
      showQuestion(num + 1);
    }
  });
}
