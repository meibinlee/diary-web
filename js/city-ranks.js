const URL_RANKS_ALL = "was/ranks/all";
const URL_RANKS_AGE = "was/ranks/age";
const URL_RANKS_FEMALE = "was/ranks/female";
const URL_RANKS_MALE = "was/ranks/male";

const URL_USER = "was/user";
const URL_DIARIES = "data/signup-suc.json";
const URL_NEXT = "diary-home.html";

const SUCCESS = 0;

var myRanksAll;
var myRanksAge;
var myRanksFeamle;
var myRanksMale;

function setItems() {
  getRanksAll();
  getRanksAge();
  getRanksFemale();
  getRanksMale();
}

function getRanksAll() {

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Ranks All Success!!");
        myRanksAll = json.body;
        showRanksAll();
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_RANKS_ALL, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function showRanksAll() {
  var sumRanksAll = 0;
  var buff = '';
  var index = 0;
  var colors = ["w3-red", "w3-orange", "w3-yellow", "w3-green", "w3-blue"];
  for(ranksAll of myRanksAll) {
    sumRanksAll += ranksAll.count
  }

  for(ranksAll of myRanksAll) {
    buff +='<li><div class='+ colors[index];
    buff +=' style="height:'+ ((ranksAll.count/sumRanksAll)*100) +'%">';
    buff +='<em class="w3-dark-grey">'+ ranksAll.city + '(' + ranksAll.count +')</em></div></li>';
    index++;
  }

  document.getElementById("ranks_all").innerHTML =  buff;
}

function getRanksAge() {

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Ranks Age Success!!");
        myRanksAge = json.body;
        showRanksAge();
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_RANKS_AGE, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function showRanksAge() {
  var sumRanksAge = 0;
  var buff = '';
  var index = 0;
  var colors = ["w3-red", "w3-orange", "w3-yellow", "w3-green", "w3-blue"];
  for(ranksAge of myRanksAge) {
    sumRanksAge += ranksAge.count
  }

  for(ranksAge of myRanksAge) {
    buff +='<li><div class='+ colors[index];
    buff +=' style="height:'+ ((ranksAge.count/sumRanksAge)*100) +'%">';
    buff +=' <div class="w3-center w3-text-black"><h5>'+ (index+1) +'0s</h5></div>';
    buff +='<em class="w3-dark-grey">'+ ranksAge.city + '(' + ranksAge.count +')</em></div></li>';
    index++;
  }

  document.getElementById("ranks_age").innerHTML =  buff;
}

function getRanksFemale() {

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Ranks Female Success!!");
        myRanksFemale = json.body;
        showRanksFemale();
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_RANKS_FEMALE, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function showRanksFemale() {
  var sumRanksFemale = 0;
  var buff = '';
  var index = 0;
  for(ranksFemale of myRanksFemale) {
    sumRanksFemale += ranksFemale.count
  }

  for(ranksFemale of myRanksFemale) {
    buff +='<li><div class="w3-pale-red"';
    buff +=' style="height:'+ ((ranksFemale.count/sumRanksFemale)*100) +'%">';
    buff +='<em class="w3-dark-grey">'+ ranksFemale.city + '(' + ranksFemale.count +')</em></div></li>';
    index++;
  }

  //  <li><div class="w3-pale-red" style="height:20%"><em class="w3-dark-grey">Barcelona</em></div></li>

  document.getElementById("ranks_female").innerHTML =  buff;
}

function getRanksMale() {

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Ranks Male Success!!");
        myRanksMale = json.body;
        showRanksMale();
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200){
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("GET", URL_RANKS_MALE, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

function showRanksMale() {
  var sumRanksMale = 0;
  var buff = '';
  var index = 0;
  for(ranksMale of myRanksMale) {
    sumRanksMale += ranksMale.count
  }

  for(ranksMale of myRanksMale) {
    buff +='<li><div class="w3-light-blue"';
    buff +=' style="height:'+ ((ranksMale.count/sumRanksMale)*100) +'%">';
    buff +='<em class="w3-dark-grey">'+ ranksMale.city + '(' + ranksMale.count +')</em></div></li>';
    index++;
  }

  //  <li><div class="w3-pale-red" style="height:20%"><em class="w3-dark-grey">Barcelona</em></div></li>

  document.getElementById("ranks_male").innerHTML =  buff;
}







