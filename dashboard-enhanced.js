// Dashboard Enhancement Manager
class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupProgressBars();
        this.setupAchievementAnimations();
        this.setupRealTimeUpdates();
        this.setupInteractiveElements();
    }

    setupProgressBars() {
        // Animate progress bars on dashboard load
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    setupAchievementAnimations() {
        // Add hover effects to achievement badges
        const badges = document.querySelectorAll('.achievement-badge');
        badges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                if (badge.classList.contains('earned')) {
                    badge.style.transform = 'scale(1.05)';
                    badge.style.boxShadow = '0 8px 25px rgba(74, 222, 128, 0.3)';
                }
            });
            
            badge.addEventListener('mouseleave', () => {
                if (badge.classList.contains('earned')) {
                    badge.style.transform = 'scale(1)';
                    badge.style.boxShadow = 'none';
                }
            });
        });
    }

    setupRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateRandomStats();
        }, 30000);
    }

    updateRandomStats() {
        // Randomly update one stat to show real-time activity
        const stats = ['docCount', 'eventCount', 'forumCount', 'favCount'];
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        const statElement = document.getElementById(randomStat);
        
        if (statElement) {
            const currentValue = parseInt(statElement.textContent);
            const newValue = currentValue + Math.floor(Math.random() * 3) + 1;
            statElement.textContent = newValue;
            
            // Update progress bar
            this.updateProgressBar(randomStat, newValue);
        }
    }

    updateProgressBar(statId, newValue) {
        // Find corresponding progress bar and update it
        const statCard = document.getElementById(statId)?.closest('.stat-card');
        if (statCard) {
            const progressBar = statCard.querySelector('.progress-fill');
            const statLabel = statCard.querySelector('.stat-label');
            
            if (progressBar && statLabel) {
                // Calculate new percentage based on stat type
                let percentage = 0;
                let goal = 0;
                
                switch (statId) {
                    case 'docCount':
                        goal = 25;
                        percentage = Math.min((newValue / goal) * 100, 100);
                        break;
                    case 'eventCount':
                        goal = 10;
                        percentage = Math.min((newValue / goal) * 100, 100);
                        break;
                    case 'forumCount':
                        goal = 25;
                        percentage = Math.min((newValue / goal) * 100, 100);
                        break;
                    case 'favCount':
                        goal = 20;
                        percentage = Math.min((newValue / goal) * 100, 100);
                        break;
                }
                
                progressBar.style.width = `${percentage}%`;
                statLabel.textContent = `${Math.round(percentage)}% of monthly goal (${goal})`;
            }
        }
    }

    setupInteractiveElements() {
        // Add click effects to interactive elements
        const interactiveElements = document.querySelectorAll('.stat-card, .achievement-badge, .recommendation-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', () => {
                element.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
        });
    }

    // Method to refresh all dashboard data
    refreshAllData() {
        // Simulate API call delay
        setTimeout(() => {
            this.updateAllStats();
            this.updateAchievements();
            this.updateRecommendations();
            
            // Show success notification
            if (window.appController) {
                window.appController.showNotification('Dashboard data refreshed successfully!', 'success');
            }
        }, 1000);
    }

    updateAllStats() {
        // Update all statistics with new data
        const stats = {
            docCount: Math.floor(Math.random() * 15) + 20,
            eventCount: Math.floor(Math.random() * 8) + 5,
            forumCount: Math.floor(Math.random() * 12) + 20,
            favCount: Math.floor(Math.random() * 10) + 12
        };

        Object.entries(stats).forEach(([statId, value]) => {
            const element = document.getElementById(statId);
            if (element) {
                element.textContent = value;
                this.updateProgressBar(statId, value);
            }
        });
    }

    updateAchievements() {
        // Simulate unlocking new achievements
        const lockedBadges = document.querySelectorAll('.achievement-badge.locked');
        if (lockedBadges.length > 0) {
            const randomBadge = lockedBadges[Math.floor(Math.random() * lockedBadges.length)];
            randomBadge.classList.remove('locked');
            randomBadge.classList.add('earned');
            
            // Add unlock animation
            randomBadge.style.animation = 'unlockAchievement 0.5s ease-out';
            setTimeout(() => {
                randomBadge.style.animation = '';
            }, 500);
        }
    }

    updateRecommendations() {
        // Simulate updating recommendations
        const recCards = document.querySelectorAll('.recommendation-card');
        recCards.forEach(card => {
            card.style.opacity = '0.7';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 500);
        });
    }
}

// Initialize dashboard manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard manager
    window.dashboardManager = new DashboardManager();
});

// Add unlock achievement animation
const style = document.createElement('style');
style.textContent = `
    @keyframes unlockAchievement {
        0% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        50% {
            transform: scale(1.1);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);