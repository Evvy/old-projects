// Function to populate the table with gem data
function populateGemTable(data) {
  var gemTableBody = document.getElementById("gemTableBody");

  for (var i = 0; i < data.gems.length; i++) {
    var gem = data.gems[i];

    var row = document.createElement("tr");

    var nameCell = document.createElement("td");
    nameCell.textContent = gem.name;
    row.appendChild(nameCell);

    var colorCell = document.createElement("td");
    colorCell.textContent = gem.color;
    row.appendChild(colorCell);

    var statsCell = document.createElement("td");
    statsCell.textContent = gem.stats.join(", ");
    row.appendChild(statsCell);

    gemTableBody.appendChild(row);
  }
}

// Fetch the JSON file asynchronously
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
