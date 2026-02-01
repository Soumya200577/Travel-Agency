document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navLinks.classList.contains('active') ? 'fa-times' : 'fa-bars';
            const iElement = mobileBtn.querySelector('i');
            iElement.classList.remove('fa-bars', 'fa-times');
            iElement.classList.add(icon);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Booking Logic
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;
            const guests = document.getElementById('guests').value;

            const booking = {
                id: Date.now(),
                fullName,
                email,
                phone,
                destination,
                date,
                guests,
                createdAt: new Date().toLocaleDateString()
            };

            // Get existing bookings
            const bookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
            bookings.push(booking);
            localStorage.setItem('travelBookings', JSON.stringify(bookings));

            alert('Booking confirmed! Thank you ' + fullName + '.');
            window.location.href = 'my-bookings.html';
        });
    }

    // My Bookings Logic
    const bookingsList = document.getElementById('bookingsList');
    const noBookings = document.getElementById('noBookings');

    if (bookingsList) {
        renderBookings();
    }

    function renderBookings() {
        const bookings = JSON.parse(localStorage.getItem('travelBookings')) || [];

        if (bookings.length === 0) {
            bookingsList.style.display = 'none';
            if (noBookings) noBookings.style.display = 'block';
            return;
        }

        bookingsList.style.display = 'grid';
        if (noBookings) noBookings.style.display = 'none';

        bookingsList.innerHTML = bookings.map(booking => `
            <div class="card" style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 0.5rem; border-left: 5px solid var(--primary-color);">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3 style="margin-bottom: 0.5rem; color: var(--primary-color);">${booking.destination}</h3>
                    <span style="font-size: 0.85rem; color: #9ca3af; background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 0.25rem;">ID: ${booking.id}</span>
                </div>
                <p><strong>Traveler:</strong> ${booking.fullName}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Guests:</strong> ${booking.guests}</p>
                <div style="margin-top: 1rem; text-align: right;">
                     <button onclick="cancelBooking(${booking.id})" class="btn" style="background-color: #ef4444; color: white; padding: 0.5rem 1rem; font-size: 0.9rem;">Cancel Booking</button>
                </div>
            </div>
        `).join('');
    }

    // Make cancelBooking available globally
    window.cancelBooking = function (id) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const bookings = JSON.parse(localStorage.getItem('travelBookings')) || [];
            const updatedBookings = bookings.filter(b => b.id !== id);
            localStorage.setItem('travelBookings', JSON.stringify(updatedBookings));
            renderBookings();
        }
    };

});
