const permissionsContainer = document.getElementById('permissions-container');
let permissionsData; // Variable to store permissions data

// Fetch permissions data from JSON file
fetch('json/permissions.json')
  .then(response => response.json())
  .then(data => {
    permissionsData = data;
    createPermissionGrids(); // Create permission grids once data is fetched
  })
  .catch(error => {
    console.error('Error fetching permissions data:', error);
  });

// Function to create permission grids
function createPermissionGrids() {
  for (const role in permissionsData) {
    const permissions = permissionsData[role];

    const permissionGrid = document.createElement('div');
    permissionGrid.id = `${role}-permissions`;
    permissionGrid.classList.add('permission-grid');

    for (const permission in permissions) {
      const permissionItem = document.createElement('div');
      permissionItem.classList.add('permission-item');

      const checkmark = document.createElement('span');
      checkmark.classList.add('checkmark');
      checkmark.innerHTML = '&#10004;';

      const xMark = document.createElement('span');
      xMark.classList.add('x-mark');
      xMark.innerHTML = '&#10008;';

      const label = document.createElement('label');
      label.innerHTML = permission;

      permissionItem.appendChild(checkmark);
      permissionItem.appendChild(xMark);
      permissionItem.appendChild(label);

      permissionGrid.appendChild(permissionItem);
    }

    permissionsContainer.appendChild(permissionGrid);
  }
}

// Function to toggle role permissions visibility and update checkmarks and X marks
function toggleRole(role) {
  const roles = Object.keys(permissionsData);

  for (let i = 0; i < roles.length; i++) {
    const roleElement = document.getElementById(`${roles[i]}-permissions`);
    const permissions = roleElement.getElementsByClassName('permission-item');

    if (roles[i] === role) {
      roleElement.style.display = 'grid';

      for (let j = 0; j < permissions.length; j++) {
        const permission = permissions[j];
        const checkmark = permission.querySelector('.checkmark');
        const xMark = permission.querySelector('.x-mark');

        checkmark.style.display = 'inline';
        xMark.style.display = 'none';
      }
    } else {
      roleElement.style.display = 'none';

      for (let j = 0; j < permissions.length; j++) {
        const permission = permissions[j];
        const checkmark = permission.querySelector('.checkmark');
        const xMark = permission.querySelector('.x-mark');

        checkmark.style.display = 'none';
        xMark.style.display = 'inline';
      }
    }
  }
}
