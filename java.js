//getting element from the html page by using these methods of javascript//
let enteredtext = document.getElementById("exampleFormControlTextarea4");
let addnotesbtn = document.getElementById("add-notes");
let notescontainer = document.getElementById("notes");
let search = document.getElementById("btn");

//this function is essential here to show stored data //
notestodisplay();

//<<-------------this will call functions one by one when we gonna click on text add button------------>>//
addnotesbtn.addEventListener("click", function () {
  let text = enteredtext.value;

  addnotetolocalstorage(text);
  notestodisplay();
  clearfields();
});

//<<----------In this project local stroage is playing a central role where i am showing data after feaching from the local storage---------->>
//<<------adding data into local storage-------->>
function addnotetolocalstorage(text) {
  let paratext = avaiablenotes();
  paratext.push(text);

  localStorage.setItem("notes", JSON.stringify(paratext));
}


//<<----------this function is for already avaliable data into the storage---------->>
function avaiablenotes() {
  let notesarray;
  if (localStorage.getItem("notes") == null) {
    notesarray = [];
  } else {
    notesarray = JSON.parse(localStorage.getItem("notes"));
  }

  return notesarray;
}

//<<----------with this function i will be able to show data on the screen----------->>
function notestodisplay() {
  let storedarray = avaiablenotes();
  let array = [];

  storedarray.forEach(function (element, index) {
    let textlength = element.length;

    array += `<div class="notesbox">
        <h3>Notes: ${index + 1}</h3>
        <p class="position">${element}</p>
        <p>No. of characters: ${textlength}</p>
        <span id="${index}" onclick="removingnotefromlocal(this.id)" class=" delete material-symbols-outlined">delete</span>
        <span id="${index}" class="material-symbols-outlined match_case">match_case</span>
      </div>`;
  });

  if (storedarray.length != 0) {
    notescontainer.innerHTML = array;
  } else {
    notescontainer.innerHTML =
      "Nothing to show. Click on Add Section to add notes.";
  }
}

//<<---------After entering data into input field this function will clean the input field----------->>
function clearfields() {
  enteredtext.value = "";
}

//<<---------by this event i will return id number of the upper case convertor box-------->>
notescontainer.addEventListener("click", function (e) {
  uppercasenotes(e.target.id);
});

//<<------this function is essential to convert every first letter of the word into capitalize form--------->> 
function uppercasenotes(index) {
  let notes = avaiablenotes();
  let capitalizedNote = capitalizeWords(notes[index]);
  notes[index] = capitalizedNote;
  localStorage.setItem("notes", JSON.stringify(notes));

  notestodisplay();
}

//<<------a new concept came into play in this function -regular expression------->>
//<<------to understand more about this --visit --(https://regexr.com/3maco)  and code with harry playlist video number 99----->>
function capitalizeWords(note) {
  return note.replace(/\b\w/g, function (e) {
    return e.toUpperCase();
  });
}

//<<-------here i am removing data both from local storage and display by clicking on delete button-------->>
function removingnotefromlocal(iid) {
  let notesremover = avaiablenotes();

  notesremover.splice(iid, 1);

  localStorage.setItem("notes", JSON.stringify(notesremover));
  notestodisplay();
}

//<<-----------this is usefull in searching the text------------->>
search.addEventListener("input", function () {
  let searchtext = search.value.toLowerCase();

  let notescontainer2 = document.querySelectorAll(".notesbox");

  Array.from(notescontainer2).forEach(function (element) {
    let fullpara = element.getElementsByTagName("p")[0].innerText.toLowerCase();

    if (fullpara.includes(searchtext)) {
      element.style.display = "unset";
    } else {
      element.style.display = "none";
    }
  });
});
