const btnDetails = document.getElementById("btn-details");
const btnItems = document.getElementById("btn-items");
const fileTaken = document.getElementById("files");
const emailWritten = document.getElementById("inputEmail");
const isoutput = document.querySelector(".output");
let updateEmail = [];

fileTaken.addEventListener("change", function () {
  var filePath = fileTaken.value;
  var allowedExtensions = /(\.pdf|\.txt|\.csv)$/i;
  if (!allowedExtensions.exec(filePath)) {
    alert("Please upload file having extensions .pdf/.txt/.csv/ only.");
  } else {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      localStorage.setItem("recent-file", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const recentFile = localStorage.getItem("recent-file");
  if (recentFile) {
    document.querySelector("#filePreview").setAttribute("src", recentFile);
  }
});
btnDetails.addEventListener("click", function () {
  const valueEmailAdress = emailWritten.value;
  const image = localStorage.getItem("recent-file");
  let item = { email: valueEmailAdress, image: image };
  if (image !== null) {
    if (valueEmailAdress) {
      let arr = [{}];
      if (localStorage.getItem("emailaddress")) {
        let array = JSON.parse(localStorage.getItem("emailaddress"));
        array.push(item);
        console.log(typeof array);
        localStorage.setItem("emailaddress", JSON.stringify(array));
        localStorage.removeItem("recent-file");
      } else {
        localStorage.setItem("emailaddress", JSON.stringify([item]));
        localStorage.removeItem("recent-file");
      }
    }
  }
});
function createTable(objectArray, fields, fieldTitles) {
  let body = document.getElementsByTagName("body")[0];
  let tbl = document.createElement("table");
  let thead = document.createElement("thead");
  let thr = document.createElement("tr");
  fieldTitles.forEach((fieldTitle) => {
    let th = document.createElement("th");
    th.appendChild(document.createTextNode(fieldTitle));
    thr.appendChild(th);
  });
  thead.appendChild(thr);
  tbl.appendChild(thead);

  let tbdy = document.createElement("tbody");
  let tr = document.createElement("tr");
  objectArray.forEach((object) => {
    let tr = document.createElement("tr");
    fields.forEach((field) => {
      var td = document.createElement("td");
      function valueReturn() {
        if (field === "image") {
          // td.innerHTML = `<a href=${object[field]}>view</a>`
          return object[field];
        } else {
          return object[field];
        }
      }
      td.appendChild(document.createTextNode(valueReturn()));
      // td.innerHTML = `<a href={${object[field]}}>view</a>`
      if (field === "image") {
        td.innerHTML = `<a href=${object[field]}>view</a>`;
      }
      tr.appendChild(td);
      console.log(td);
    });
    tbdy.appendChild(tr);
  });
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
  return tbl;
}
createTable(
  JSON.parse(localStorage.getItem("emailaddress")),
  ["email", "image"],
  ["Email", "File"]
);
btnItems.addEventListener("click", function () {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)) {
      isoutput.innerHTML += `<table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          
        </table>`;
    }
  }
});
