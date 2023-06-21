// Fetch the JSON file
fetch('gems.json')
  .then(response => response.json())
  .then(data => {
    const gemsContainer = document.getElementById('gems-container');

    // Loop through the gems data
    data.gems.forEach(gem => {
      // Create a gem card element
      const gemCard = document.createElement('div');
      gemCard.className = 'gem-card';

      // Populate the gem card with data
      gemCard.innerHTML = `
        <h1 class="card-title">${gem.name} ${gem.status ? '✔️' : '❌'}</h3>
        <p><strong>Color:</strong>${gem.color}</p>
        <p><strong>${gem.stats}</strong></p>
        <p><strong>Members:</strong>${gem.members.length}</p>
        <img src="https://wow.zamimg.com/images/wow/icons/large/${gem.icon}.jpg" alt="${gem.icon}">`;

      // Append the gem card to the container
      gemsContainer.appendChild(gemCard);
    });
  })
  .catch(error => console.log(error));
