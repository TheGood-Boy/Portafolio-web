document.addEventListener('DOMContentLoaded', function() {
    // Variables para los elementos del DOM
    const calendarEl = document.getElementById('calendar');
    const selectedDateEl = document.getElementById('selected-date');
    const selectedTimeEl = document.getElementById('selected-time');
    const timeSlotsEl = document.getElementById('time-slots');
    const payButton = document.getElementById('pay-button');
    const paymentModal = document.getElementById('payment-modal');
    const closeModalButton = document.getElementById('close-modal');
    let selectedDate = null;
    let selectedTime = null;

    // Arreglo de horarios de ejemplo
    const availableHours = ['09:00', '10:30', '12:00', '14:30', '16:00'];

    // Función para generar los botones de horarios disponibles
    function renderTimeSlots() {
        timeSlotsEl.innerHTML = '';
        availableHours.forEach(hour => {
            const button = document.createElement('button');
            button.textContent = hour;
            button.classList.add('px-4', 'py-2', 'bg-blue-100', 'hover:bg-blue-200', 'text-blue-700', 'font-semibold', 'rounded-full', 'transition-colors', 'duration-200', 'focus:ring-2', 'focus:ring-blue-500', 'focus:outline-none');
            button.addEventListener('click', () => {
                // Resetea el estilo de todos los botones
                document.querySelectorAll('#time-slots button').forEach(btn => {
                    btn.classList.remove('bg-blue-500', 'text-white');
                    btn.classList.add('bg-blue-100', 'text-blue-700');
                });
                // Aplica el estilo al botón seleccionado
                button.classList.remove('bg-blue-100', 'text-blue-700');
                button.classList.add('bg-blue-500', 'text-white');
                selectedTime = hour;
                selectedTimeEl.innerHTML = `<i class="fa-solid fa-clock text-blue-500 mr-2"></i> <span class="font-medium">Hora:</span> ${selectedTime} hrs`;
                payButton.disabled = false; // Habilita el botón de pago
            });
            timeSlotsEl.appendChild(button);
        });
    }

    // Inicialización de FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es', // Establece el idioma del calendario a español
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            // Maneja el clic en una fecha
            selectedDate = info.dateStr;
            selectedDateEl.innerHTML = `<i class="fa-solid fa-calendar-days text-blue-500 mr-2"></i> <span class="font-medium">Fecha:</span> ${selectedDate}`;
            selectedTime = null; // Resetea la hora
            selectedTimeEl.innerHTML = `<i class="fa-solid fa-clock text-blue-500 mr-2"></i> <span class="font-medium">Hora:</span> No seleccionada`;
            payButton.disabled = true; // Deshabilita el botón de pago
            renderTimeSlots(); // Muestra los horarios disponibles para la fecha
        },
        // Deshabilita fechas pasadas
        validRange: {
            start: new Date()
        }
    });

    calendar.render();

    // Lógica para mostrar y ocultar el modal de pago
    payButton.addEventListener('click', () => {
        if (selectedDate && selectedTime) {
            // Simulación del proceso de pago
            console.log(`Simulando pago para la cita en ${selectedDate} a las ${selectedTime}.`);
            paymentModal.classList.remove('hidden');
        }
    });

    closeModalButton.addEventListener('click', () => {
        paymentModal.classList.add('hidden');
    });
});