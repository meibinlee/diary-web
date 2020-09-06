const LOC_LOGIN = "login.html";
const LOC_CITY_DIARY = "city-diary.html";

const URL_UPLOAD = "was/posting/upload";
const URL_POSTINGS = "was/posting/list";

const SUCCESS = 0;

var myPostings;
var myDiary;
var myUser;
var myFile;

function setItems() {
  var item = sessionStorage.getItem("user");
  if(item != null) {
    myUser = JSON.parse(item);
  }
  item = sessionStorage.getItem("diary");
  if(item != null) {
    myDiary = JSON.parse(item);
    document.getElementById("headerTitle").innerHTML = "<h2>" + myUser.user_name + "'s " + myDiary.title + "</h2>";
  }
  else {
    location.assign(LOC_LOGIN);
  }
  document.getElementById("addButton").disabled = true;
  document.getElementById("imageDisplayer").style.display = 'none';
  document.getElementById("fileSelector").addEventListener('change', showImage);
}

function showImage() {
  myFile = document.getElementById("fileSelector").files[0];
  document.getElementById("postingImage").innerHTML = '<img src="' + URL.createObjectURL(myFile) + '" style="width:100%;min-width:150px;max-width:230px">';
  document.getElementById("imageDisplayer").style.display = 'block';
  document.getElementById("addButton").disabled = false;
  document.getElementById("date").value = getFormatDate(new Date());
}

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

function createDiary() {
  var diary_id = myDiary.diary_id;
  var photo = myFile.name;
  var diaryment = document.getElementById("diaryment").value;
  var posting_date = document.getElementById("date").value;

  if(diaryment == "" || posting_date == ""){
    alert("Enter Comment and Date");
    return;
  }

  var formData = new FormData();
  formData.append("file", myFile);
  formData.append("diary_id", diary_id);
  formData.append("photo", photo);
  formData.append("diaryment", diaryment);
  formData.append("posting_date", posting_date);

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        getPostings(myDiary.diary_id);
      }
      else {
        alert("Service Error\n" + json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200) {
      alert("Connection Error\n" + this.responseText);
    }
  };
  http.open("POST", URL_UPLOAD, true);
  http.send(formData);
}

function getPostings(diary_id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == SUCCESS) {
        console.log("Get Postings Success!!");
        sessionStorage.setItem("postings", JSON.stringify(json.body));
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

/*
function setItems() {
  var mode = sessionStorage.getItem("mode");
  var item = sessionStorage.getItem("account");
  if(item != null) {
    myAccount = JSON.parse(item);
    document.getElementById("user").innerHTML = myAccount.profile.name +"(" + mode + ")";
  }

  text = sessionStorage.getItem("book");
  if(text != null) {
    myRequest = URL_PROFILE;
    document.getElementById("divSequence").style.display = 'block';

    myBook = JSON.parse(text);
  }
  else {
    myRequest = URL_POST;
    document.getElementById("divSequence").style.display = 'none';

    myBook = new Object();
    myBook.pubKey = myAccount.pubKey;
    myBook.isbn = "";
    myBook.profile = new Object();
    myBook.profile.isbnSub = "";
    myBook.profile.title = "";
    myBook.profile.writer = "";
    myBook.profile.publisher = myAccount.profile.name;
    myBook.profile.compRegNum = myAccount.profile.compRegNum;
    myBook.profile.translator = "";
    myBook.profile.synopsis = "";
    myBook.profile.coverFile = "";
    myBook.profile.bookFile = "";
    myBook.profile.origTitle = "";
    myBook.profile.genre = "";
  }
  setBookMeta();
}

function setBookMeta() {
  document.getElementById("isbn").value = myBook.isbn;
  if(myBook.isbn != "") {
    document.getElementById("isbn").disabled = true;
  }
  document.getElementById("isbnSub").value = myBook.profile.isbnSub;
  document.getElementById("title").value = myBook.profile.title;
  document.getElementById("writer").value = myBook.profile.writer;
  document.getElementById("translator").value = myBook.profile.translator;
  document.getElementById("synopsis").innerHTML = myBook.profile.synopsis;
  document.getElementById("coverImage").innerHTML = '<img src="image/' + myBook.profile.coverFile + '" style="width:100%">';
  document.getElementById("bookSize").value = myBook.profile.bookFile;
  document.getElementById("sequence").value = myBook.sequence;
  document.getElementById("origTitle").value = myBook.profile.origTitle;
  document.getElementById("genre").value = myBook.profile.genre;

  document.getElementById("coverUploader").style.display = 'none';
  document.getElementById("bookUploader").style.display = 'none';

  document.getElementById("coverFile").addEventListener('change', showCoverImage);
  document.getElementById("bookFile").addEventListener('change', showBookSize);
}

function showCoverImage() {
  var file = document.getElementById("coverFile").files[0];
  document.getElementById("coverImage").innerHTML = '<img src="' + URL.createObjectURL(file) + '" style="width:100%">';
  document.getElementById("coverUploader").style.display = 'block';
}

function showBookSize() {
  var file = document.getElementById("bookFile").files[0];
  document.getElementById("bookSize").value = file.name + " (" + file.size + " bytes)";
  document.getElementById("bookUploader").style.display = 'block';
}

function getFileName(isbn, filename) {
  var cols = filename.split(".");
  return isbn + "." + cols[1];
}

function uploadCover() {
  var file = document.getElementById("coverFile").files[0];
  myBook.profile.coverFile = getFileName(document.getElementById("isbn").value, file.name);
  uploadFile("cover", file);
}

function uploadBook() {
  var file = document.getElementById("bookFile").files[0];
  myBook.profile.bookFile = getFileName(document.getElementById("isbn").value, file.name);
  uploadFile("book", file);
}

function uploadFile(type, file) {
  var isbn = document.getElementById("isbn").value;
  if(isbn == undefined || isbn == null || isbn == "") {
    showDialog("Input Error", "ISBN must be set");
    return;
  }

  var formData = new FormData();
  formData.append("file", file);
  formData.append("isbn", isbn);

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == RESULT_SUCCESS) {
        if(type == "cover") {
          document.getElementById("coverImage").innerHTML = '<img src="image/' + myBook.profile.coverFile + '" style="width:100%">';
          document.getElementById("coverUploader").style.display = 'none';
        }
        else {
          document.getElementById("bookSize").value = myBook.profile.bookFile ;
          document.getElementById("bookUploader").style.display = 'none';
        }
      }
      else {
        showDialog("Service Error", json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200) {
      showDialog("Connection Error", this.responseText);
    }
  };
  http.open("POST", URL_UPLOAD + type, true);
  http.send(formData);
}

function postBook() {
  myBook.isbn = document.getElementById("isbn").value;
  myBook.profile.isbnSub = document.getElementById("isbnSub").value;
  myBook.profile.title = document.getElementById("title").value;
  myBook.profile.writer = document.getElementById("writer").value;
  myBook.profile.translator = document.getElementById("translator").value;
  myBook.profile.synopsis = document.getElementById("synopsis").value;
  myBook.profile.origTitle = document.getElementById("origTitle").value;
  myBook.profile.genre = document.getElementById("genre").value;

  if(myBook.isbn == undefined || myBook.isbn == "") {
    showDialog("Input Error", "Mandatory parameters are missed");
    return;
  }

  if(myBook.profile.coverFile == undefined || myBook.profile.coverFile == "") {
    showDialog("Input Error", "Cover file is not uploaded");
    return;
  }
  if(myBook.profile.bookFile == undefined || myBook.profile.bookFile == "") {
    showDialog("Input Error", "Book file is not uploaded");
    return;
  }

  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      if(json.result == RESULT_SUCCESS) {
        location.assign(LOCATION_BOOKLIST);
      }
      else {
        showDialog("Service Error", json.error);
      }
    }
    else if (this.readyState == 4 && this.status != 200) {
      showDialog("Connection Error", this.responseText);
    }
  };

  http.open("POST", myRequest, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send(JSON.stringify(myBook));
}

function publish() {
  location.assign(LOCATION_PUBLISH);
}

function showDialog(title, message) {
  document.getElementById('dialogTitle').innerHTML = title;
  document.getElementById('dialogMessage').innerHTML = message;
  document.getElementById('dialog').style.display='block';
}

function hideDialog() {
  document.getElementById('dialog').style.display='none';
}
*/