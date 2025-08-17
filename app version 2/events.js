// Events page functionality
class EventsManager {
    constructor() {
        this.registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateRegisteredEvents();
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Register buttons
        const registerBtns = document.querySelectorAll('.register-btn');
        registerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleRegistration(e));
        });
    }

    handleFilter(e) {
        const filter = e.target.dataset.filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter events
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    handleRegistration(e) {
        const eventId = e.target.dataset.eventId;
        const eventCard = e.target.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        
        if (this.isEventRegistered(eventId)) {
            this.unregisterFromEvent(eventId, eventTitle);
            e.target.textContent = 'Register Now';
            e.target.classList.remove('registered');
        } else {
            this.registerForEvent(eventId, eventTitle);
            e.target.textContent = 'Registered ✓';
            e.target.classList.add('registered');
        }
    }

    registerForEvent(eventId, eventTitle) {
        if (!this.isEventRegistered(eventId)) {
            this.registeredEvents.push({
                id: eventId,
                title: eventTitle,
                registeredAt: new Date().toISOString()
            });
            this.saveRegisteredEvents();
            this.showNotification(`Successfully registered for "${eventTitle}"`, 'success');
        }
    }

    unregisterFromEvent(eventId, eventTitle) {
        this.registeredEvents = this.registeredEvents.filter(event => event.id !== eventId);
        this.saveRegisteredEvents();
        this.showNotification(`Unregistered from "${eventTitle}"`, 'info');
    }

    isEventRegistered(eventId) {
        return this.registeredEvents.some(event => event.id === eventId);
    }

    saveRegisteredEvents() {
        localStorage.setItem('registeredEvents', JSON.stringify(this.registeredEvents));
    }

    updateRegisteredEvents() {
        const registerBtns = document.querySelectorAll('.register-btn');
        registerBtns.forEach(btn => {
            const eventId = btn.dataset.eventId;
            if (this.isEventRegistered(eventId)) {
                btn.textContent = 'Registered ✓';
                btn.classList.add('registered');
            }
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Global function for onclick handlers
function registerForEvent(eventId) {
    const eventsManager = new EventsManager();
    const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
    if (eventCard) {
        const eventTitle = eventCard.querySelector('h3').textContent;
        eventsManager.registerForEvent(eventId, eventTitle);
    }
}

// Initialize events manager
const eventsManager = new EventsManager();