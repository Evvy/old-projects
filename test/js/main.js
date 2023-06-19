// Fetch JSON data
fetch('json/permissions.json')
  .then(response => response.json())
  .then(data => {
    const permissionsGrid = document.getElementById('permissions-grid');
    const roleButtons = document.querySelectorAll('.role-button');

    // Function to update the permissions grid based on the selected role
    const updateGrid = (role) => {
      // Clear the permissions grid
      permissionsGrid.innerHTML = '';

      // Iterate over permissions
      data.permissions.forEach(permission => {
        const permissionItem = document.createElement('div');
        permissionItem.className = 'permission-item';

        const hasPermission = role.permissions.some(p => p.name === permission && p.enabled);
        const symbol = hasPermission ? '✅' : '❌';

        permissionItem.innerHTML = `
          <span>${symbol}</span>
          <label>${permission}</label>
        `;

        permissionsGrid.appendChild(permissionItem);
      });
    };

    // Add event listeners to role buttons
    roleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedRole = data.roles.find(role => role.name === button.dataset.role);
        updateGrid(selectedRole);
      });
    });

    // Initial grid update with the first role
    updateGrid(data.roles[0]);
  });
