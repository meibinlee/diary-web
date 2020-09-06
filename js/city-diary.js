const LOC_DIARY_HOME = "diary-home.html";
const LOC_LOGIN = "login.html";
const LOC_CITY_DIARY = "city-diary.html";
const LOC_NEW_POSTING = "new-posting.html";

const URL_DIARIES = "was/diary/list";
const URL_POSTINGS = "was/posting/list";

const SUCCESS = 0;

var myPostings;
var myDiary;
var myUser;

function setItems() {
  var item = sessionStorage.getItem("user");
  if(item != null) {
    myUser = JSON.parse(item);
  }
  item = sessionStorage.getItem("diary");
  if(item != null) {
    myDiary = JSON.parse(item);
    document.getElementById("diary-title").innerHTML = "<h2>" + myUser.user_name + "'s " + myDiary.title + "</h2>";
  }
  else {
    location.assign(LOC_LOGIN);
  }
  item = sessionStorage.getItem("postings");
  if(item != null) {
    myPostings = JSON.parse(item);
    showPostings();
  }
  else {
    location.assign(LOC_LOGIN);
  }
}

function showPostings() {
  var buff = '';
  var index = 1;

  buff +='<div class="w3-cell w3-center">';
  buff +='<div class="w3-border w3-border-white w3-hover-border-green" style="width:100%;min-width:150px;max-width:200px">';
  buff +='<img src="img/plus.png" alt="book" style="width:80%" onclick="addNewPosting()">';
  buff +='<div class="w3-container">';
  buff +='<h4><b>Add New Posting</b></h4>';
  buff +='</div>';
  buff +='</div>';
  buff +='</div>';

  for(posting of myPostings) {
    if ((index % 3) == 0) {
      buff += '<div class="w3-cell-row w3-margin">';
    }
    buff +='<div class="w3-cell w3-center">';
    buff +='<div class="w3-card" style="width:100%;min-width:150px;max-width:200px">';
    if(posting.photo == null){
      buff +='<img src="img/noimage.png" alt="book" style="width:100%;opacity:0.80">';
    }
    else {
      buff +='<img src="img/'+ posting.photo + '" alt="book" style="width:100%;opacity:0.80">';
    }
    buff +='<div class="w3-container">';
    buff +='<h5><b>'+ posting.diaryment +'</b></h5>';
    buff +='<p>'+ posting.posting_date +'</p>';
    buff +='</div>';
    buff +='</div>';
    buff +='</div>';

    if ((index % 3) == 2) {
      buff += '</div>'; //w3-cell-row end
    }
    index++;
  }

  if((index % 3) != 0) {
    buff += '</div>';
  }
  document.getElementById("contents").innerHTML = buff;
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

function addNewPosting() {
  location.assign(LOC_NEW_POSTING);
}
