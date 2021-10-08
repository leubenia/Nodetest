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
    error: function (error) {},
  });
}

function usercall(callback) {
  $.ajax({
    type: "GET",
    url: "/userdo/checkid",
    success: function (response) {
      callback(response["doit"]["user"]);
    },
    error: function (error) {},
  });
}

function checklikeunm(write) {
  let tolike = 0;
  console.log(tolike);
  usercall(function (a) {
    if (a == null) {
      user.name = "";
    } else {
      user = a;
    }
  });
  for (liketo of write["like"]) {
    if (liketo["like"]) {
      tolike++;
      console.log(liketo["like"]);
    }
    if (!liketo["like"]) {
      tolike--;
      console.log(liketo["like"]);
    }
    if (liketo["name"] == user.name) {
      isuserid = liketo["_id"];
      console.log(isuserid);
    }
    console.log(tolike);
  }
  console.log(tolike);
  return tolike;
}
