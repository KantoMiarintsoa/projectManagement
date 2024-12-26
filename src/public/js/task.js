// Afficher le modal lorsque l'utilisateur clique sur une tâche
document.querySelectorAll('.ticket').forEach(ticket => {
    ticket.addEventListener('click', () => {
      const modal = document.getElementById('taskModal');
      const title = ticket.getAttribute('data-title');
      const description = ticket.getAttribute('data-description');
  
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalDescription').textContent = description;
  
      modal.style.display = 'flex';
    });
  });
  
  // Fermer le modal
  document.querySelector('.modal .close').addEventListener('click', () => {
    document.getElementById('taskModal').style.display = 'none';
  });
  
  // Fermer le modal en cliquant à l'extérieur
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('taskModal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  const modal = document.getElementById("taskModal");
const closeModal = document.querySelector(".close");

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Ajouter votre logique pour afficher le modal.

  