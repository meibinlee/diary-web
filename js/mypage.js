const URL_USER_PROFILE = "was/user/profile";
const URL_CODE_COUNTRY = "was/code/country";
const URL_CODE_CITY = "was/code/city";
const URL_USER_CHECK_ID = "was/user/check_id";

const URL_USER = "was/user";
const URL_DIARIES = "data/signup-suc.json";
const URL_NEXT = "diary-home.html";

const SUCCESS = 0;

var myCities = new Array();
var myUser;

function setItems(){
  getCountries();

  var item = sessionStorage.getItem("user");
  if(item != null) {
    myUser = JSON.parse(item);  
    document.getElementById("name").value = myUser.user_name;
    document.getElementById("id").value = myUser.user_id;
    document.getElementById("password").value = myUser.user_pw;
    document.getElementById("birthDate").value = myUser.birthdate;

    var sex = document.getElementsByName("sex");
    if(myUser.sex == "M"){
      sex[0].checked = true;
    }
    else if(myUser.sex == "F"){
      sex[1].checked = true;
    }

    console.log(myUser.city);
    for(city of myUser.city){
      var list = document.getElementById("selectedCities").innerHTML;
      document.getElementById("selectedCities").innerHTML =  list + addCity(city);

      console.log(myUser.city);
    }
  }
  else {
    location.assign(LOC_LOGIN);
  }
}

function profile() {
  var json = new Object();
  json.user_name = document.getElementById("name").value;
  json.user_id = document.getElementById("id").value;
  json.user_pw = document.getElementById("password").value;
  json.birthdate = document.getElementById("birthDate").value;
  json.sex = checkedValue("sex");
  json.city = new Array();

  for(city of myCities){
    json.city.push(city);
  }

  var repeatPassword = document.getElementById("repeatPassword").value;
  if(repeatPassword != json.user_pw) {
    alert("Parameter Error");
    return;
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == 0) {
        sessionStorage.setItem("user", JSON.stringify(json.body));
        location.assign(URL_NEXT);
        alert("Update Profile SUCCESS!");
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_USER_PROFILE, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(json));
}

function checkedValue(name) {
  var element = document.getElementsByName(name);
  for(i = 0; i < element.length; i++) {
    if(element[i].checked) {
      return element[i].value;
    }
  }
  return "";
}

function showCountries(countries){
  var buff = '';
  buff +='<select class="w3-select" name="country" id="country" onchange="countryChanged()">';
  buff +='<option value="">country</option>';
  for(country of countries){
    buff +='<option value="'+ country +'">'+ country + '</option>';
  }
  buff +='</select>';
  document.getElementById("countries").innerHTML = buff;
}

function showCities(cities){
  var buff = '';
  buff +='<select class="w3-select" name="city" id="city" onchange="cityChanged()">';
  buff +='<option value="">city</option>';
  for(city of cities){
    buff +='<option value="'+ city.city_id +'" label="'+ city.city +'">'+ city.city + '</option>';
  }
  buff +='</select>';
  document.getElementById("cities").innerHTML = buff;
}

function getCountries() {
  console.log("country")

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        showCountries(json.body);
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_CODE_COUNTRY, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function getCities(country) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        showCities(json.body);
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_CODE_CITY + "?country=" + country, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function countryChanged() {
  var e = document.getElementById("country");
  var country = e.options[e.selectedIndex].value;
  getCities(country);
}

function cityChanged(){
  var e = document.getElementById("city");
  var city = new Object();
  city.city_id = e.options[e.selectedIndex].value;
  city.city = e.options[e.selectedIndex].label;
  var list = document.getElementById("selectedCities").innerHTML;
  document.getElementById("selectedCities").innerHTML =  list + addCity(city);
}

function addCity(city){
  myCities.push(city);
  var buff = '<div id="'+ city.city_id +'">';
  buff += '<span>' + city.city + '</span>&nbsp;';
  buff += '<button onclick="removeCity(' + city.city_id + ')">x</button>';
  buff += '</div>';
  return buff;
}

function removeCity(id){
  var cities = new Array();
  for(city of myCities){
    if(city.city_id != id){
      cities.push(city);
    }
  }
  myCities = cities;
  document.getElementById(id).style.display = 'none';
}



