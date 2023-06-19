// Fetch JSON data
fetch('json/permissions.json')
  .then(response => response.json())
  .then(data => {
    const permissionsGrid = document.getElementById('permissions-grid');

    // Function to update the permissions grid
    const updateGrid = () => {
      // Clear the permissions grid
      permissionsGrid.innerHTML = '';

      // Iterate over roles
      data.roles.forEach(role => {
        const roleContainer = document.createElement('div');
        roleContainer.className = 'role-container';
        roleContainer.innerHTML = `<h3>${role.name}</h3>`;

        // Create a grid container for permissions
        const permissionsContainer = document.createElement('div');
        permissionsContainer.className = 'permissions-container';

        // Iterate over permissions
        role.permissions.forEach(permission => {
          const permissionItem = document.createElement('div');
          permissionItem.className = 'permission-item';
          const permissionSymbol = permission.enabled ? '✅' : '❌';

          // Create symbol for each permission
          permissionItem.innerHTML = `
            <span>${permissionSymbol}</span>
            <label>${permission.name}</label>
          `;

          permissionsContainer.appendChild(permissionItem);
        });

        roleContainer.appendChild(permissionsContainer);
        permissionsGrid.appendChild(roleContainer);
      });
    };

    // Initial grid update
    updateGrid();
  });
