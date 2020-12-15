const LOC_DIARY_HOME = "diary-home.html";
const URL_LOGIN = "was/user/login";
const SUCCESS = 0;

function setItems() {
  var item = localStorage.getItem("remember");
  if(item != null) {
    var remember = JSON.parse(item);
    document.getElementById("user_id").value = remember.user_id;
    document.getElementById("user_pw").value = remember.user_pw;
    document.getElementById("remember").checked = true;
  }
  else {
   document.getElementById("remember").checked = false;    
  }
}

function login() {
  var body = new Object();
  body.user_id = document.getElementById("user_id").value;
  body.user_pw = document.getElementById("user_pw").value;

  if (document.getElementById("remember").checked) {
    console.log("set Remember!!");
    localStorage.setItem("remember", JSON.stringify(body));
  }
  else {
    localStorage.removeItem("remember");
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Log In Success!!");
        sessionStorage.setItem("user", JSON.stringify(json.body));
        location.assign(LOC_DIARY_HOME);
      }
      else {
        sessionStorage.removeItem("user");
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_LOGIN, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(body));
}
