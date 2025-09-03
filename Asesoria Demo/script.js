// Simple form validation
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if(name && email) {
    alert('Gracias por tu solicitud, ' + name + '! Te contactaré pronto a ' + email);
    this.reset();
  } else {
    alert('Por favor completa todos los campos requeridos');
  }
});
