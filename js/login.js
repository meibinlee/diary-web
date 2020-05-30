const URL_LOGIN = "../was/login";
const URL_MOCKUP = "mockup/reader.json";
const URL_NEXT = "reader.html";

function setRemember(checkbox) {
  if (checkbox.checked) {
    var json = { email:"", password:""};
    json.email = document.getElementById("email").value;
    json.password = document.getElementById("password").value;
    localStorage.setItem("remember", window.btoa(JSON.stringify(json)));
  }
  else {
    localStorage.clear("remember");
  }
}

function getRemember() {
  var obj = localStorage.getItem("remember");
  if(obj != null) {
    json = JSON.parse(window.atob(obj));
    document.getElementById("email").value = json.email;
    document.getElementById("password").value = json.password;
    document.getElementById("remember").checked = true;
  }
  else {
    document.getElementById("remember").checked = false;
  }
}

function login() {
  var json = { email:"", password:""};
  json.email = document.getElementById("email").value;
  json.password = document.getElementById("password").value;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == 0) {
        sessionStorage.setItem("reader", this.responseText);
        location.assign(URL_NEXT);
      }
      else {
        showDialog("Service Error", json.error);
      }
    }
    else {
      showDialog("Connection Error", this.responseText);
    }
  };
  http.open("POST", URL_LOGIN, true);
//  http.open("GET", URL_MOCKUP, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(json));
}

function showDialog(title, message) {
  document.getElementById('title').innerHTML = title;
  document.getElementById('message').innerHTML = message;
  document.getElementById('dialog').style.display='block';
}

function hideDialog() {
  document.getElementById('dialog').style.display='none';
}