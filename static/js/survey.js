// true if phone, false if no phone
const SET_A = [true, false, false, true, false, true, true, true, false, false];

$(function () {
  $("#submit-button").attr("disabled", true);
  const using_set_a = false;
  for (let i = 0; i < 10; i++) {
    const phone_present = using_set_a ? SET_A[i] : !SET_A[i];
    const dir = phone_present ? "phone" : "no_phone";
    $(`#image${i}`).append(`<img src="static/images/${dir}/${i}.jpg">`);
    if (phone_present) {
      $(`#phone${i}`).prop("checked", true);
      $(`#no-phone${i}`).prop("checked", false);
    }
    else {
      $(`#phone${i}`).prop("checked", false);
      $(`#no-phone${i}`).prop("checked", true);
    }
  }

  $("#next-button").click(function () {
    $("#initial-form").hide();
    console.log("original listener fired");
    $("#next-button").unbind();
    showQuestion(0);
  });
});

function showQuestion(num) {
  // Show image for set amount of time
  $("#next-button").hide();
  $(`#image${num}`).show();
  setTimeout(function () {
    $(`#image${num}`).hide();
    $(`#question${num}`).show();
    $('#next-button').show();
  }, 0);

  // Show question with multiple choice answers
  $("#next-button").unbind();
  $("#next-button").attr("disabled", true);
  $(`#answer${num}-options`).on("change", function() {
    $("#next-button").attr("disabled", false);
  });

  // Move on to next question, or end survey if all questions have been done
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
