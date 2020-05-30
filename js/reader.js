//const URL_LOGIN = "../was/login";
const CELLS = 4;

function getReader(isTable) {
  var obj = sessionStorage.getItem("reader");
  if(obj != null) {
    json = JSON.parse(obj);
    document.getElementById("name").innerHTML = json.name + "의 서재";
    if(isTable) {
      document.getElementById("contents").innerHTML = listupTable(json.otxbs);
      document.getElementById("btTable").disabled = true;
      document.getElementById("btCard").disabled = false;
    }
    else {
      document.getElementById("contents").innerHTML = listupCards(json.otxbs);
      document.getElementById("btTable").disabled = false;
      document.getElementById("btCard").disabled = true;
    }
  }
}

function listupTable(otxbs) {
  var buff = '<table class="w3-table w3-bordered w3-striped w3-border test w3-hoverable">';
  buff += '<tr class="w3-green">';
  buff += '<th>&nbsp;</th>';
  buff += '<th>Title</th>';
  buff += '<th>Author</th>';
  buff += '<th>Publisher</th> </tr>';

  for(otxb of otxbs) {
    buff += '<tr><td>';
    buff += '<div class="w3-card" style="width:40%;min-width:40px;max-width:80px">';
    buff += '<img src="mockup/' + otxb.isbn + '.jpg" alt="' + otxb.title + '" style="width:100%"></div></td>';
    buff += '<td>' + otxb.title + '</td>';
    buff += '<td>' + otxb.author + '</td>';
    buff += '<td>' + otxb.publisher + '</td></tr>';
  }
  buff += '</table>'
  return buff;
}

function listupCards(otxbs) {
  var index = 0;
  var buff = "";
  var opened = false;
  for(otxb of otxbs) {
    if(index % CELLS == 0) {
      buff += '<div class="w3-cell-row w3-margin">';
      opened = true;
    }
    buff += '<div class="w3-container w3-cell">';
    buff += '<div class="w3-card" style="width:100%;min-width:200px;max-width:300px">';
    buff += '<img src="mockup/' + otxb.isbn + '.jpg" alt="' + otxb.title + '" style="width:100%"></div></td>';
    buff += '<div class="w3-container">';
    buff += '<h5><b>' + otxb.title + '</b></h5>';
    buff += '<p>' + otxb.author + '</p>';
    buff += '</div></div>';
    if((index % CELLS) == (CELLS - 1)) {
      buff += '</div>';
      opened = false;
    }
    index++;
  }
  if(opened) {
    buff += '</div>';
  }
  return buff;
}

function showDialog(title, message) {
  document.getElementById('title').innerHTML = title;
  document.getElementById('message').innerHTML = message;
  document.getElementById('dialog').style.display='block';
}

function hideDialog() {
  document.getElementById('dialog').style.display='none';
}