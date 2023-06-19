// Fetch JSON data
fetch('json/permissions.json')
  .then(response => response.json())
  .then(data => {
    const permissionsGrid = document.getElementById('permissions-grid');

    // Function to update the permissions grid
    const updateGrid = () => {
      // Clear the permissions grid
      permissionsGrid.innerHTML = '';

      // Iterate over permissions
      data.permissions.forEach(permission => {
        const permissionItem = document.createElement('div');
        permissionItem.className = 'permission-item';
        const permissionSymbol = (role) => role.permissions.includes(permission) ? '✅' : '❌';

        // Create symbol for each permission for each role
        permissionItem.innerHTML = `
          <span>${permissionSymbol('Admin')}</span>
          <span>${permissionSymbol('Officer')}</span>
          <span>${permissionSymbol('Everyone')}</span>
          <label>${permission}</label>
        `;

        permissionsGrid.appendChild(permissionItem);
      });
    };

    // Initial grid update
    updateGrid();
  });
