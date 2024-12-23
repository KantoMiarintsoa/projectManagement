// Get the modal
var modal = document.getElementById("taskModal");

// Get the button that opens the modal
var btn = document.getElementById("addTaskBtn");

// Get the <span> element that closes the modal
var closeBtn = document.getElementById("closeModalBtn");

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var title = document.getElementById("taskTitle").value;
    var description = document.getElementById("taskDescription").value;
    var members = document.getElementById("members").value;
    var status = document.getElementById("taskStatus").value;

    // You can process the data here or display the task dynamically

    // Close modal after form submission
    modal.style.display = "none";
});
