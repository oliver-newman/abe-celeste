// true if phone, false if no phone
const SET_A = [true, false, false, true, false, true, true, true, false, false];


$(function () {
  $("#submit-button").attr("disabled", true);
  const using_set_a = $("input:radio[name='set_name']:checked").val() == "A";

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
  
  $('#initial-form input').on("change", checkInitialForm);
  $('#initial-form select').on("change", checkInitialForm);

  $("#next-button").click(function () {
    $("#initial-form").hide();
    console.log("original listener fired");
    $("#next-button").unbind();
    showQuestion(0);
  });
});


// Enables "next" button if initial form is completed
function checkInitialForm() {
  let initialFormCompleted = true; // Assume that it is completed

  // Check every input in the initial form - not a very nice way to do this
  // but whatever

  // Administrator radiogroup
  if (!$("#initial-form input[name='admin']:checked").val()) {
    initialFormCompleted = false;
  }

  // Gender radiogroup
  if (!$("#initial-form input[name='subject_gender']:checked").val()) {
    initialFormCompleted = false;
  }

  // Age selector
  if (!$("#initial-form select[name='subject_age']").val()) {
    initialFormCompleted = false;
  }

  // Text inputs
  $("#initial-form input:text").each(function () {
    if ($(this).val() == "") {
      initialFormCompleted = false;
    }
  });

  // Set disabled status of button based on inputs
  $("#next-button").attr("disabled", !initialFormCompleted);
}


function showQuestion(num) {
  // Show image for set amount of time
  $("#next-button").hide();
  $(`#image${num}`).show();
  setTimeout(function () {
    $(`#image${num}`).hide();
    $(`#question${num}`).show();
    $('#next-button').show();
  }, 3000);

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
