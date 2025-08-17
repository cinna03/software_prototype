// Calendar page functionality
class CalendarManager {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
        this.checkForConflicts();
    }

    setupEventListeners() {
        // Calendar navigation
        const prevBtn = document.querySelector('.calendar-nav:first-child');
        const nextBtn = document.querySelector('.calendar-nav:last-child');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousMonth());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextMonth());
    }

    renderCalendar() {
        const calendarGrid = document.querySelector('.calendar-grid');
        if (!calendarGrid) return;

        // Clear existing days (keep headers)
        const headers = calendarGrid.querySelectorAll('.calendar-day-header');
        calendarGrid.innerHTML = '';
        headers.forEach(header => calendarGrid.appendChild(header));

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        // Add empty cells for previous month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if day has events
            const dayEvents = this.getEventsForDay(day);
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-events');
                dayElement.innerHTML = `
                    <span class="day-number">${day}</span>
                    <div class="event-indicator">${dayEvents.length}</div>
                `;
            }

            dayElement.addEventListener('click', () => this.showDayEvents(day, dayEvents));
            calendarGrid.appendChild(dayElement);
        }

        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        const monthDisplay = document.getElementById('currentMonth');
        if (monthDisplay) {
            monthDisplay.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        }
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }

    getEventsForDay(day) {
        const targetDate = new Date(this.currentYear, this.currentMonth, day);
        return this.registeredEvents.filter(event => {
            // This is a simplified check - in a real app you'd have actual event dates
            const eventDate = new Date(event.registeredAt);
            return eventDate.getDate() === day && 
                   eventDate.getMonth() === this.currentMonth &&
                   eventDate.getFullYear() === this.currentYear;
        });
    }

    showDayEvents(day, events) {
        if (events.length === 0) {
            this.showNotification(`No events scheduled for ${day}`, 'info');
            return;
        }

        const eventList = events.map(event => `• ${event.title}`).join('\n');
        this.showNotification(`Events on ${day}:\n${eventList}`, 'info');
    }

    checkForConflicts() {
        // Simple conflict detection - in a real app this would be more sophisticated
        const eventDates = this.registeredEvents.map(event => new Date(event.registeredAt));
        const conflicts = this.findConflicts(eventDates);
        
        if (conflicts.length > 0) {
            this.showNotification('Schedule conflict detected! Check your calendar.', 'warning');
        }
    }

    findConflicts(eventDates) {
        const conflicts = [];
        for (let i = 0; i < eventDates.length; i++) {
            for (let j = i + 1; j < eventDates.length; j++) {
                const date1 = eventDates[i];
                const date2 = eventDates[j];
                
                // Check if events are on the same day and time
                if (date1.getDate() === date2.getDate() &&
                    date1.getMonth() === date2.getMonth() &&
                    date1.getFullYear() === date2.getFullYear()) {
                    conflicts.push({ date1, date2 });
                }
            }
        }
        return conflicts;
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

// Global functions for onclick handlers
function previousMonth() {
    calendarManager.previousMonth();
}

function nextMonth() {
    calendarManager.nextMonth();
}

function viewEventDetails(eventId) {
    // In a real app, this would show detailed event information
    const eventsManager = new EventsManager();
    const event = eventsManager.registeredEvents.find(e => e.id === eventId);
    if (event) {
        calendarManager.showNotification(`Event: ${event.title}\nRegistered: ${new Date(event.registeredAt).toLocaleDateString()}`, 'info');
    }
}

// Initialize calendar manager
const calendarManager = new CalendarManager();