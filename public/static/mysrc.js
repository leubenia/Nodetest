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
          alert(response["doit"]["msg"]);
          window.location.href = "/";
      },
      error: function (error) {
      },
    });
  }

function usercall(callback) {
    $.ajax({
      type: "GET",
      url: "/userdo/checkid",
      success: function (response) {
        callback(response["doit"]["user"]);
      },
      error: function (error) {
      },
    });
  }