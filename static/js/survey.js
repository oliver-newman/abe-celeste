// true if phone, false if no phone
const SET_A = [true, false, false, true, false, true, true, true, false, false];

$(function () {
  $("#submit-button").attr("disabled", false);
  const set_a = false;
  for (let i = 0; i < 10; i++) {
    const dir = (set_a ? !SET_A[i] : SET_A[i]) ? "phone" : "no_phone";
    $(`#image${i}`).append(`<img src="static/images/${dir}/${i}.jpg">`);
  }

  // $("#next-button").attr("disabled", true);

  $("#next-button").click(function () {
    $("#initial-form").hide();
    console.log("original listener fired");
    $("#next-button").unbind();
    showQuestion(0);
  });
});

function showQuestion(num) {
  $("#next-button").hide();
  $(`#image${num}`).show();
  setTimeout(function () {
    $(`#image${num}`).hide();
    $(`#question${num}`).show();
    $('#next-button').show();
  }, 5000);
  $("#next-button").unbind();
  $("#next-button").click(function() {
    $(`#question${num}`).hide();
    if (num < 9) {
      showQuestion(num + 1);
    }
    else {
      $("#next-button").hide();
      $("#submit-container").show();
      $("#submit-button").attr("disabled", false);
    }
  });
}
