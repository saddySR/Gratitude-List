function getAndUpdate() {
    console.log("Updating List...");
    var tit = document.getElementById('title').value;
    var desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
      var itemArray = [];
      itemArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemArray));
    } else {
      itemArrayStr = localStorage.getItem('itemsJson');
      itemArray = JSON.parse(itemArrayStr);
      itemArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemArray));
    }
    update();
  }

  function update() {
    if (localStorage.getItem('itemsJson') == null) {
      var itemArray = [];
      localStorage.setItem('itemsJson', JSON.stringify(itemArray));
    } else {
      itemArrayStr = localStorage.getItem('itemsJson');
      itemArray = JSON.parse(itemArrayStr);
    }
    //Populate the table
    let tableBody = document.getElementById("tableBody");
    var str = "";
    itemArray.forEach((element, index) => {
      str += `
  <tr>
    <th scope="row">${index+1}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button type="submit" class="btn btn-sm btn-dark" onclick="deleted(${index})">Change</button></td>
  </tr>`;
    });
    tableBody.innerHTML = str;
  }
  add = document.getElementById("add");
  add.addEventListener('click', getAndUpdate);
  update();

  function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemArrayStr = localStorage.getItem('itemsJson');
    itemArray = JSON.parse(itemArrayStr);
    //Delete item index element from array
    itemArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemArray));
    update();
  }

  function cleared() {
    if (confirm("Are you sure?")) {
      console.log("Clearing the storage");
      localStorage.clear();
      update();
    }
  }