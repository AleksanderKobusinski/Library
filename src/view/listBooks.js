function buttonDelete (key){
  Book.destroy(key);
  Book.saveAll();
  window.location.reload(true);
}

function putChanges (numer){
  var modal = document.getElementById('updateModal'),
  formEl = document.forms['Book1'];
  modal.style.display = "block";
  var book = Book.instances[numer];
  formEl.isbn.value = book.isbn;
  formEl.title.value = book.title;
  formEl.author.value = book.author;
  formEl.year.value = book.year;
}

function saveChanges () {
  var modal = document.getElementById('updateModal'),
  formEl = document.forms['Book1'];
  if (formEl.year.value > "2019") {
  } else {
    var slots = { isbn: formEl.isbn.value,
        title: formEl.title.value,
        author: formEl.author.value,
        year: formEl.year.value
    };
    Book.update(slots);
    Book.saveAll();
    formEl.reset();
    modal.style.display = "none";
    window.location.reload(true);
  }
};

function save (){
  var modal = document.getElementById('createModal');
  var formEl = document.forms['Book2'];
  if (formEl.year.value > "2019") {
  } else {
    var slots = { isbn: formEl.isbn.value,
        title: formEl.title.value,
        author: formEl.author.value,
        year: formEl.year.value};
    Book.add( slots);
    Book.saveAll();
    formEl.reset();
    modal.style.display = "none";
    window.location.reload(true);
  }
};

pl.view.listBooks = {
 setupUserInterface: function () {
   var tableBodyEl = document.querySelector("table#books>tbody");
   var i=0, keys=[], key="", row={};
   var updateModal = document.getElementById('updateModal'),
       createModal = document.getElementById('createModal'),
       formEl = document.forms['Book'],
       saveButton = document.getElementById('updateButton');
   // load all book objects
   Book.loadAll();
   keys = Object.keys( Book.instances);
   // for each book, create a table row with a cell for each attribute
   for (i=0; i < keys.length; i++) {
     key = keys[i];
     row = tableBodyEl.insertRow();
     row.insertCell(-1).textContent = Book.instances[key].isbn;
     row.insertCell(-1).textContent = Book.instances[key].title;
     row.insertCell(-1).textContent = Book.instances[key].author;
     row.insertCell(-1).textContent = Book.instances[key].year;
     row.insertCell(-1).innerHTML = '<div class="btn-group"><button type="button" name="'+ key +'" class="update btn btn-xs btn-default" onclick="putChanges (name)"><span class="glyphicon glyphicon-cog"></span></button><button type="button" name="'+ key +'" class="delete btn btn-xs btn-danger" onclick="buttonDelete (name)"><span class="glyphicon glyphicon-remove"></span></button></div>';
   }
// Get the <span> element that closes the modal
var span1 = document.getElementById("close1");
var span2 = document.getElementById("close2");
var create = document.getElementById("create");
// When the user clicks on <span> (x), close the modal
create.onclick = function() {
  createModal.style.display = "block";
}
span1.onclick = function() {
  updateModal.style.display = "none";
}
span2.onclick = function() {
  createModal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == updateModal) {
    updateModal.style.display = "none";
  }
}
window.onclick = function(event) {
  if (event.target == createModal) {
    createModal.style.display = "none";
  }
}
 }
};
