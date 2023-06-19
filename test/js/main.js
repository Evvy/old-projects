// Fetch JSON data
fetch('json/permissions.json')
  .then(response => response.json())
  .then(data => {
    const permissionsGrid = document.getElementById('permissions-grid');

    // Iterate over roles
    data.roles.forEach(role => {
      const roleContainer = document.createElement('div');
      roleContainer.className = 'role-container';
      roleContainer.innerHTML = `<h3>${role.name}</h3>`;

      // Iterate over permissions
      role.permissions.forEach(permission => {
        const permissionItem = document.createElement('div');
        permissionItem.className = 'permission-item';
        const inputId = `${role.name}-${permission.name.replace(/\s+/g, '-')}`;

        // Create checkbox for each permission
        permissionItem.innerHTML = `
          <input type="checkbox" id="${inputId}" ${permission.enabled ? 'checked' : ''}>
          <label for="${inputId}">${permission.name}</label>
        `;

        roleContainer.appendChild(permissionItem);
      });

      permissionsGrid.appendChild(roleContainer);
    });
});
