// Function to populate the table with gem data
function populateGemTable(data) {
  var gemTableBody = document.getElementById("gemTableBody");

  for (var i = 0; i < data.gems.length; i++) {
    var gem = data.gems[i];

    var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    var nameLink = document.createElement("a");
    nameLink.textContent = gem.name;
    nameLink.href = "#";
    nameLink.addEventListener("click", sortTable);
    nameCell.appendChild(nameLink);
    row.appendChild(nameCell);

    var colorCell = document.createElement("td");
    colorCell.textContent = gem.color;
    row.appendChild(colorCell);

    var statsCell = document.createElement("td");
    statsCell.textContent = gem.stats.join(", ");
    row.appendChild(statsCell);

    var iconCell = document.createElement("td");
    var iconImage = document.createElement("img");
    iconImage.src = "https://example.com/" + gem.name.replace(/ /g, "_") + ".jpg"; // Replace example.com with the actual URL for the item icons
    iconImage.alt = gem.name;
    iconCell.appendChild(iconImage);
    row.appendChild(iconCell);

    gemTableBody.appendChild(row);
  }
}

// Sort the table based on gem name
function sortTable(event) {
  event.preventDefault();
  var table = document.getElementById("gemTableBody");
  var rows = Array.from(table.getElementsByTagName("tr"));
  var index = Array.from(this.parentNode.parentNode.getElementsByTagName("td")).indexOf(this.parentNode);
  var sortFunction;

  if (index === 0) {
    sortFunction = function(a, b) {
      return a.cells[index].textContent.localeCompare(b.cells[index].textContent);
    };
  } else {
    sortFunction = function(a, b) {
      return parseInt(a.cells[index].textContent) - parseInt(b.cells[index].textContent);
    };
  }

  rows.sort(sortFunction);
  rows.forEach(function(row) {
    table.appendChild(row);
  });
}

// Fetch the gem data from the JSON file
fetch("gems.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // Call the function to populate the table with gem data
    populateGemTable(data);
  })
  .catch(function(error) {
    console.log("Error fetching gem data:", error);
  });
