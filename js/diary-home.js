const LOC_DIARY_HOME = "diary-home.html";
const LOC_LOGIN = "login.html";
const LOC_CITY_DIARY = "city-diary.html";

const URL_DIARIES = "was/diary/list";
const URL_POSTINGS = "was/posting/list";
const URL_CODE_COUNTRY = "was/code/country";
const URL_CODE_CITY = "was/code/city";
const URL_CREATE_DIARY = "was/diary/create";

const SUCCESS = 0;

var myUser;
var myDiaries;
var myCity = new Object();

function setItems() {
  var item = sessionStorage.getItem("user");
  if(item != null) {
    myUser = JSON.parse(item);
    document.getElementById("user_name").innerHTML = "<h2>" + myUser.user_name + "'s Diaries</h2>";
    getDiaries();
  }
  else {
    location.assign(LOC_LOGIN);
  }
}

function getDiaries() {

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Diaries Success!!");
        myDiaries = json.body;
        showDiaries();
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_DIARIES + "?user_id=" + myUser.user_id, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function showDiaries() {
  var buff = '';
  var index = 0;
  for(diary of myDiaries) {
    if ((index % 3) == 0) {
      buff += '<div class="w3-cell-row w3-margin">';
    }
    buff +='<div class="w3-cell">';
    buff +='<div class="w3-card" style="width:100%;min-width:150px;max-width:200px">';
    buff +='<div class="w3-container">';
    buff +='<p><h5><b><a href="javascript:getPostings('+diary.diary_id+')">'+diary.title+'</a></b></h5><p>';
    buff +='</div>';
    buff +='</div>';
    buff +='</div>'; //
    if ((index % 3) == 2) {
      buff += '</div>'; //w3-cell-row end
    }
    index++;
  }

  if((index % 3) != 0) {
    buff += '</div>';
  }
  document.getElementById("diary").innerHTML =  buff;
}

function getPostings(diary_id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Postings Success!!");
        sessionStorage.setItem("postings", JSON.stringify(json.body));
        for(diary of myDiaries) {
          if(diary_id == diary.diary_id){
            sessionStorage.setItem("diary", JSON.stringify(diary));
          }
        }
        location.assign(LOC_CITY_DIARY);
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_POSTINGS + "?diary_id=" + diary_id, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function popupNewDiary(){
  getCountries();
  document.getElementById('newDiary').style.display='block';
}

function hideNewDiary(){
  document.getElementById('newDiary').style.display='none';
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
  myCity.city_id = e.options[e.selectedIndex].value;
  myCity.city = e.options[e.selectedIndex].label;
  console.log("city_id="+ myCity.city_id + ", city="+ myCity.city);
}

function createNewDiary(){
  var body = new Object();
  body.user_id = myUser.user_id;
  body.title = myCity.city;
  body.city_id = myCity.city_id;

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        getDiaries();
        hideNewDiary();
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_CREATE_DIARY, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(body));
}

















