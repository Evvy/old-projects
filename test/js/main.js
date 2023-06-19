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

          roleContainer.appendChild(permissionItem);
        });

        permissionsGrid.appendChild(roleContainer);
      });
    };

    // Initial grid update
    updateGrid();

    // Function to toggle permission status
    const togglePermission = (roleIndex, permissionIndex) => {
      data.roles[roleIndex].permissions[permissionIndex].enabled = !data.roles[roleIndex].permissions[permissionIndex].enabled;
      updateGrid();
    };

    // Add event listeners for permission toggles
    const permissionItems = document.getElementsByClassName('permission-item');
    for (let i = 0; i < permissionItems.length; i++) {
      permissionItems[i].addEventListener('click', function () {
        const roleIndex = Math.floor(i / role.permissions.length);
        const permissionIndex = i % role.permissions.length;
        togglePermission(roleIndex, permissionIndex);
      });
    }
  });
