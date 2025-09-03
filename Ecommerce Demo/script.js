// ====== Carrito de Compras con persistencia ======
let cart = [];

const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');

const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');

// ====== Recuperar carrito del localStorage al cargar ======
window.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if(savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
});

// ====== Funciones Modal ======
cartBtn.addEventListener('click', () => cartModal.style.display = 'block');
closeBtn.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target === cartModal) cartModal.style.display = 'none'; });

// ====== Actualizar carrito ======
function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.precio * item.cantidad;

    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x 
      <input type="number" min="1" value="${item.cantidad}" data-index="${index}" class="qty-input">
      = $${item.precio * item.cantidad}
      <button class="remove-btn" data-index="${index}">❌</button>
    `;
    cartList.appendChild(li);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.cantidad, 0);
  cartTotal.textContent = total;

  // Guardar carrito en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Eliminar producto
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      cart.splice(idx, 1);
      updateCart();
    });
  });

  // Cambiar cantidad
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      let qty = parseInt(e.target.value);
      if(qty < 1) qty = 1;
      cart[idx].cantidad = qty;
      updateCart();
    });
  });
}

// ====== Agregar productos ======
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const itemDiv = e.target.closest('.item');
    const nombre = itemDiv.getAttribute('data-nombre');
    const precio = parseInt(itemDiv.getAttribute('data-precio'));

    const existing = cart.find(p => p.nombre === nombre);
    if(existing) {
      existing.cantidad += 1;
    } else {
      cart.push({ nombre, precio, cantidad: 1 });
    }
    updateCart();
  });
});

// ====== Finalizar compra ======
document.getElementById('checkout-btn').addEventListener('click', () => {
  if(cart.length === 0){
    alert('Tu carrito está vacío.');
    return;
  }

  let mensaje = 'Compra realizada con éxito!\n\nResumen:\n';
  cart.forEach(item => {
    mensaje += `${item.nombre} - $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}\n`;
  });
  mensaje += `\nTotal: $${cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0)}`;

  alert(mensaje);
  cart = [];
  updateCart();
  cartModal.style.display = 'none';
});
