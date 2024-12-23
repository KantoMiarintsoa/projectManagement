function toggleDropdown(event) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== event.target.nextElementSibling) {
            menu.style.display = 'none';
        }
    });

    const dropdownMenu = event.target.nextElementSibling;
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function(event) {
    if (!event.target.matches('.dots')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
};

function openEditModal(id, title, dateStart, dueDate) {
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; 
    }
    
    document.getElementById('editProjectForm').action = `/project/edit/${id}`;
    document.getElementById('projectName').value = title;
    document.getElementById('startDate').value = formatDate(dateStart);
    document.getElementById('endDate').value = formatDate(dueDate);      
    document.getElementById("editProjectModal").style.display = "flex";
}



function closeEditModal(){
    document.getElementById("editProjectModal").style.display="none"
}


