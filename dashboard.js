// Dashboard functionality
class DashboardManager {
    constructor() {
        this.features = {
            notifications: false,
            darkMode: false,
            autoPlay: false,
            downloads: false
        };
        this.init();
    }

    init() {
        this.loadUserPreferences();
        this.setupEventListeners();
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        // Wait a bit for Supabase auth to initialize
        setTimeout(() => {
            console.log('Checking auth status...', window.supabaseAuthManager);
            if (!window.supabaseAuthManager || !window.supabaseAuthManager.isUserAuthenticated()) {
                console.log('User not authenticated, redirecting to login');
                window.location.href = 'login.html';
                return;
            }
            console.log('User authenticated, updating user info');
            this.updateUserInfo();
        }, 2000);
    }

    updateUserInfo() {
        if (window.supabaseAuthManager) {
            const user = window.supabaseAuthManager.getCurrentUser();
            if (user) {
                const welcomeTitle = document.querySelector('.dashboard-header .content-title');
                if (welcomeTitle) {
                    welcomeTitle.textContent = `Welcome back, ${user.firstName}!`;
                }
            }
        }
    }

    loadUserPreferences() {
        const savedFeatures = localStorage.getItem('dashboardFeatures');
        if (savedFeatures) {
            this.features = { ...this.features, ...JSON.parse(savedFeatures) };
        }
        this.updateToggleStates();
    }

    setupEventListeners() {
        // Initialize toggle switches
        Object.keys(this.features).forEach(feature => {
            const toggle = document.getElementById(`${feature}Toggle`);
            if (toggle) {
                if (this.features[feature]) {
                    toggle.classList.add('active');
                }
            }
        });
    }

    updateToggleStates() {
        Object.keys(this.features).forEach(feature => {
            const toggle = document.getElementById(`${feature}Toggle`);
            if (toggle) {
                if (this.features[feature]) {
                    toggle.classList.add('active');
                } else {
                    toggle.classList.remove('active');
                }
            }
        });
    }

    savePreferences() {
        localStorage.setItem('dashboardFeatures', JSON.stringify(this.features));
    }
}

// Global functions for dashboard interactions
function toggleFeature(featureName) {
    const toggle = document.getElementById(`${featureName}Toggle`);
    if (!toggle) return;

    dashboardManager.features[featureName] = !dashboardManager.features[featureName];
    
    if (dashboardManager.features[featureName]) {
        toggle.classList.add('active');
        showNotification(`${featureName.charAt(0).toUpperCase() + featureName.slice(1)} enabled`, 'success');
    } else {
        toggle.classList.remove('active');
        showNotification(`${featureName.charAt(0).toUpperCase() + featureName.slice(1)} disabled`, 'info');
    }

    dashboardManager.savePreferences();
    
    // Handle specific feature actions
    switch (featureName) {
        case 'darkMode':
            toggleDarkMode(dashboardManager.features[featureName]);
            break;
        case 'notifications':
            handleNotifications(dashboardManager.features[featureName]);
            break;
        case 'autoPlay':
            handleAutoPlay(dashboardManager.features[featureName]);
            break;
        case 'downloads':
            handleDownloads(dashboardManager.features[featureName]);
            break;
    }
}

function toggleDarkMode(enabled) {
    const body = document.body;
    if (enabled) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function handleNotifications(enabled) {
    if (enabled && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification('Notifications enabled!', 'success');
            } else {
                showNotification('Please enable notifications in your browser settings', 'info');
                // Revert toggle
                setTimeout(() => {
                    toggleFeature('notifications');
                }, 2000);
            }
        });
    }
}

function handleAutoPlay(enabled) {
    // Store autoplay preference
    localStorage.setItem('autoPlay', enabled);
    showNotification(`Auto-play ${enabled ? 'enabled' : 'disabled'}`, 'info');
}

function handleDownloads(enabled) {
    if (enabled) {
        showNotification('Offline mode enabled. Content will be downloaded for offline viewing.', 'success');
    } else {
        showNotification('Offline mode disabled', 'info');
    }
}

function markAsCompleted(button) {
    if (button.classList.contains('completed')) {
        button.textContent = 'Mark Complete';
        button.classList.remove('completed');
        showNotification('Marked as incomplete', 'info');
    } else {
        button.textContent = 'Completed';
        button.classList.add('completed');
        showNotification('Marked as completed!', 'success');
        
        // Update stats
        updateStats();
    }
}

function removeFavorite(button) {
    const activityItem = button.closest('.activity-item');
    if (activityItem) {
        activityItem.style.opacity = '0';
        setTimeout(() => {
            activityItem.remove();
            showNotification('Removed from favorites', 'info');
            updateStats();
        }, 300);
    }
}

function watchContent(contentName) {
    showNotification(`Opening ${contentName}...`, 'info');
    // Simulate opening content
    setTimeout(() => {
        window.location.href = 'documentary.html';
    }, 1000);
}

function updateStats() {
    // Update the stats numbers based on user actions
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
        // Update documentaries watched
        const currentWatched = parseInt(statNumbers[0].textContent);
        statNumbers[0].textContent = currentWatched + 1;
        
        // Update articles read
        const currentRead = parseInt(statNumbers[1].textContent);
        statNumbers[1].textContent = currentRead + 1;
        
        // Update favorites
        const currentFavorites = parseInt(statNumbers[2].textContent);
        statNumbers[2].textContent = Math.max(0, currentFavorites - 1);
    }
}

function showNotification(message, type = 'info') {
    if (typeof authManager !== 'undefined' && authManager.showNotification) {
        authManager.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 3000);
    }
}

// Initialize dashboard - wait for Supabase auth to be ready
let dashboardManager;

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for Supabase auth to initialize
    setTimeout(() => {
        dashboardManager = new DashboardManager();
    }, 1500);
});

// Add dashboard-specific styles
const dashboardStyles = document.createElement('style');
dashboardStyles.textContent = `
    .dashboard-content {
        flex: 1;
        margin-bottom: 3rem;
    }

    .dashboard-header {
        text-align: center;
        margin-bottom: 3rem;
    }

    .dashboard-section {
        margin-bottom: 4rem;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: transform 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-5px);
    }

    .stat-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .stat-number {
        font-size: 2rem;
        font-weight: 700;
        color: #4ade80;
        margin: 0.5rem 0;
    }

    .stat-label {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        margin: 0;
    }

    .actions-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .action-btn {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        padding: 1.5rem;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
    }

    .action-btn:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
    }

    .action-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
    }

    .toggle-switch {
        width: 50px;
        height: 25px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 25px;
        position: relative;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .toggle-switch.active {
        background: #4ade80;
    }

    .toggle-slider {
        width: 21px;
        height: 21px;
        background: white;
        border-radius: 50%;
        position: absolute;
        top: 2px;
        left: 2px;
        transition: transform 0.3s ease;
    }

    .toggle-switch.active .toggle-slider {
        transform: translateX(25px);
    }

    .activity-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
    }

    .activity-item {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
    }

    .activity-icon {
        font-size: 1.5rem;
        min-width: 40px;
    }

    .activity-content {
        flex: 1;
    }

    .activity-content h4 {
        color: white;
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
    }

    .activity-content p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
        font-size: 0.9rem;
    }

    .activity-btn {
        background: rgba(74, 222, 128, 0.2);
        color: #4ade80;
        border: 1px solid rgba(74, 222, 128, 0.3);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .activity-btn:hover {
        background: rgba(74, 222, 128, 0.3);
    }

    .activity-btn.completed {
        background: #4ade80;
        color: #1f2937;
    }

    .recommendations-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 2rem;
    }

    .recommendation-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: transform 0.3s ease;
    }

    .recommendation-card:hover {
        transform: translateY(-5px);
    }

    .rec-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .recommendation-card h4 {
        color: white;
        margin: 0 0 1rem 0;
        font-size: 1.2rem;
    }

    .recommendation-card p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0 0 1.5rem 0;
        font-size: 0.9rem;
    }

    .rec-btn {
        background: #4ade80;
        color: #1f2937;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .rec-btn:hover {
        background: #22c55e;
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }

        .actions-grid {
            grid-template-columns: 1fr;
        }

        .recommendations-grid {
            grid-template-columns: 1fr;
        }

        .activity-item {
            flex-direction: column;
            text-align: center;
        }

        .activity-btn {
            width: 100%;
            margin-top: 1rem;
        }
    }

    @media (max-width: 480px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }

        .action-btn {
            padding: 1rem;
        }

        .toggle-switch {
            width: 40px;
            height: 20px;
        }

        .toggle-slider {
            width: 16px;
            height: 16px;
        }

        .toggle-switch.active .toggle-slider {
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(dashboardStyles);