// Main Application Controller
class AppController {
    constructor() {
        this.currentView = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.handleInitialRoute();
        this.setupEventListeners();
        this.initializeComponents();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                this.navigateToView(view);
            });
        });
    }

    handleInitialRoute() {
        // Check if there's a hash in the URL
        const hash = window.location.hash.slice(1);
        if (hash && this.isValidView(hash)) {
            this.navigateToView(hash);
        } else {
            this.navigateToView('home');
        }
    }

    navigateToView(viewName) {
        if (!this.isValidView(viewName)) {
            console.error('Invalid view:', viewName);
            return;
        }

        // Hide all views
        const allViews = document.querySelectorAll('.app-view');
        allViews.forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(viewName);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
        }

        // Update navigation
        this.updateNavigation(viewName);

        // Update URL hash
        window.location.hash = viewName;

        // Initialize view-specific functionality
        this.initializeView(viewName);

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateNavigation(activeView) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-view') === activeView) {
                link.classList.add('active');
            }
        });
    }

    isValidView(viewName) {
        const validViews = ['home', 'about', 'documentary', 'dashboard', 'profile', 'events', 'calendar'];
        return validViews.includes(viewName);
    }

    initializeView(viewName) {
        switch (viewName) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'events':
                this.initializeEvents();
                break;
            case 'calendar':
                this.initializeCalendar();
                break;
            case 'profile':
                this.initializeProfile();
                break;
        }
    }

    initializeDashboard() {
        // Dashboard-specific initialization
        console.log('Dashboard initialized');
    }

    initializeEvents() {
        // Events-specific initialization
        if (window.eventsManager) {
            window.eventsManager.updateRegisteredEvents();
        }
    }

    initializeCalendar() {
        // Calendar-specific initialization
        if (window.calendarManager) {
            window.calendarManager.renderCalendar();
        }
    }

    initializeProfile() {
        // Profile-specific initialization
        console.log('Profile initialized');
    }

    setupEventListeners() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.slice(1);
            if (hash && this.isValidView(hash)) {
                this.navigateToView(hash);
            }
        });

        // Handle hash changes
        window.addEventListener('hashchange', (e) => {
            const hash = window.location.hash.slice(1);
            if (hash && this.isValidView(hash)) {
                this.navigateToView(hash);
            }
        });
    }

    initializeComponents() {
        // Initialize all components that need to be ready
        this.setupMobileMenu();
        this.setupSmoothTransitions();
    }

    setupMobileMenu() {
        // Mobile menu functionality
        const hamburger = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('.page-navigation');
        
        if (hamburger && nav) {
            hamburger.addEventListener('click', () => {
                nav.classList.toggle('mobile-open');
                hamburger.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    nav.classList.remove('mobile-open');
                    hamburger.classList.remove('active');
                });
            });
        }
    }

    setupSmoothTransitions() {
        // Add smooth transitions between views
        const style = document.createElement('style');
        style.textContent = `
            .app-view {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease-in-out;
            }
            
            .app-view.active {
                opacity: 1;
                transform: translateY(0);
            }
            
            .nav-link {
                transition: all 0.3s ease;
            }
            
            .nav-link:hover {
                transform: translateY(-2px);
            }
        `;
        document.head.appendChild(style);
    }
}

// Global functions for onclick handlers
function toggleMobileMenu() {
    const nav = document.querySelector('.page-navigation');
    const hamburger = document.querySelector('.hamburger-menu');
    
    if (nav && hamburger) {
        nav.classList.toggle('mobile-open');
        hamburger.classList.toggle('active');
    }
}

function joinForum(forumId) {
    appController.showNotification(`Joining forum: ${forumId}`, 'info');
    // In a real app, this would navigate to the forum or open a modal
}

function markAsCompleted(button) {
    button.textContent = 'Completed';
    button.classList.add('completed');
    appController.showNotification('Activity marked as completed!', 'success');
}

function viewEventDetails(eventId) {
    appController.showNotification(`Viewing event details for: ${eventId}`, 'info');
    // In a real app, this would show event details
}

function viewComment(commentId) {
    appController.showNotification(`Viewing comment: ${commentId}`, 'info');
    // In a real app, this would show the comment
}

// Dashboard enhancement functions
function navigateToView(viewName) {
    appController.navigateToView(viewName);
}

function refreshDashboard() {
    // Simulate refreshing dashboard data
    appController.showNotification('Dashboard refreshed!', 'success');
    
    // Update some random stats to show refresh effect
    const docCount = document.getElementById('docCount');
    const eventCount = document.getElementById('eventCount');
    const forumCount = document.getElementById('forumCount');
    const favCount = document.getElementById('favCount');
    
    if (docCount) docCount.textContent = Math.floor(Math.random() * 10) + 18;
    if (eventCount) eventCount.textContent = Math.floor(Math.random() * 5) + 7;
    if (forumCount) forumCount.textContent = Math.floor(Math.random() * 8) + 23;
    if (favCount) favCount.textContent = Math.floor(Math.random() * 6) + 15;
}

function viewForumStats(forumId) {
    appController.showNotification(`Viewing stats for forum: ${forumId}`, 'info');
    // In a real app, this would show detailed forum statistics
}

function addToFavorites(itemId) {
    appController.showNotification(`Added ${itemId} to favorites!`, 'success');
    // In a real app, this would add the item to user's favorites
}

function addToCalendar(itemId) {
    appController.showNotification(`Added ${itemId} to calendar!`, 'success');
    // In a real app, this would add the item to user's calendar
}

function editComment(commentId) {
    appController.showNotification(`Editing comment: ${commentId}`, 'info');
    // In a real app, this would open comment editing interface
}

function watchDocumentary(docId) {
    appController.showNotification(`Starting documentary: ${docId}`, 'success');
    // In a real app, this would start playing the documentary
}

function registerForEvent(eventId) {
    appController.showNotification(`Registering for event: ${eventId}`, 'success');
    // In a real app, this would register the user for the event
}

// Documentary functions
function playDocumentary(docId) {
    appController.showNotification(`Starting documentary: ${docId}`, 'success');
    // In a real app, this would start playing the documentary
    // Update watch history
    updateWatchHistory(docId);
}

function continueSeries(seriesId) {
    appController.showNotification(`Continuing series: ${seriesId}`, 'info');
    // In a real app, this would continue the series from where user left off
}

function updateWatchHistory(docId) {
    // Simulate updating watch history
    console.log(`Added ${docId} to watch history`);
}

// Add notification method to app controller
AppController.prototype.showNotification = function(message, type = 'info') {
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
};

// Initialize the application
const appController = new AppController();

// Make appController globally available
window.appController = appController;