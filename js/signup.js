const URL_USER = "../was/user";
const URL_SIGNUP = "../was/signup";
const URL_NEXT = "login.html";

function checkEmail() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result > 0) {
        document.getElementById("email").value = "Checked!";
      }
      else {
        showDialog("Service Error", "Email Duplicated!");
      }
    }
    else {
      showDialog("Connection Error", this.responseText);
    }
  };
  http.open("GET", URL_USER + "?email=" + document.getElementById("email").value, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function signup() {
  var json = { name:"",  email:"", password:"", birthDate: "", phone: "" };
  json.name = document.getElementById("name").value;
  json.email = document.getElementById("email").value;
  json.password = document.getElementById("password").value;
  json.birthDate = document.getElementById("birthDate").value;
  json.phone = document.getElementById("phone").value;

  var repeatPassword = document.getElementById("repeatPassword").value;
  if(repeatPassword != json.password) {
    showDialog("Parameter Error", "Repeated password is not equal");
    return;
  }

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
  http.open("POST", URL_SIGNUP, true);
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