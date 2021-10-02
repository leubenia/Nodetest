function callSelf() {
  $.ajax({
    type: "GET",
    url: "/userdo/checkid",
    success: function (response) {},
    error: function (error) {
      console.log(error);
      alert(error.responseJSON.errorMessage);
      window.location.href = "/";
    },
  });
}
function uncallSelf() {
    $.ajax({
      type: "GET",
      url: "/userdo/checkid",
      success: function (response) {
          alert(response["doit"]);
          window.location.href = "/";
      },
      error: function (error) {
      },
    });
  }
