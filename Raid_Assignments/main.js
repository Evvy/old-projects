const sortableList = document.querySelector(".sortable-list");

// Event listener for dragstart event using event delegation
sortableList.addEventListener("dragstart", (event) => {
    const targetItem = event.target.closest(".item");
    if (targetItem) {
        // Adding dragging class to item after a delay
        setTimeout(() => targetItem.classList.add("dragging"), 0);
    }
});

// Event listener for dragend event using event delegation
sortableList.addEventListener("dragend", (event) => {
    const targetItem = event.target.closest(".item");
    if (targetItem) {
        // Removing dragging class from item on dragend event
        targetItem.classList.remove("dragging");
    }
});

// Function to handle sorting of the list items
const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const siblings = sortableList.querySelectorAll(".item:not(.dragging)");

    let nextSibling = null;
    // Finding the sibling after which the dragging item should be placed
    for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        const siblingMiddleY = sibling.offsetTop + sibling.offsetHeight / 2;
        if (e.clientY <= siblingMiddleY) {
            nextSibling = sibling;
            break;
        }
    }

    // Inserting the dragging item before the found sibling
    sortableList.insertBefore(draggingItem, nextSibling);
};

// Event listener for dragover event to trigger sorting
sortableList.addEventListener("dragover", initSortableList);

// Prevent default behavior on dragenter event
sortableList.addEventListener("dragenter", (e) => e.preventDefault());
