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
        <h3>${gem.name}</h3>
        <p><strong>Color:</strong> ${gem.color}</p>
        <p><strong>Stats:</strong> ${gem.stats}</p>
        <p><strong>Status:</strong> ${gem.status ? '✔️' : '❌'}</p>
        <p><strong>Members:</strong> ${gem.members.length}</p>
        <img src="${gem.icon}" alt="Gem Icon">`;

      // Append the gem card to the container
      gemsContainer.appendChild(gemCard);
    });
  })
  .catch(error => console.log(error));
