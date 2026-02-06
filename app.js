// Modal functions for image gallery
function openModal(src) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.classList.add('active');
  modalImg.src = src;
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
