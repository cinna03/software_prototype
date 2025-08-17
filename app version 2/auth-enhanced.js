// Route protection functionality
class RouteGuard {
    constructor(authManager) {
        this.authManager = authManager;
        this.protectedRoutes = [
            'dashboard.html',
            'profile.html',
            'calendar.html',
            'events.html'
        ];
        this.init();
    }

    init() {
        this.checkRouteAccess();
    }

    checkRouteAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        const isProtectedRoute = this.protectedRoutes.includes(currentPage);
        
        if (isProtectedRoute && !this.authManager.isUserAuthenticated()) {
            // Redirect to login with return URL
            const returnUrl = encodeURIComponent(window.location.href);
            window.location.href = `login.html?returnUrl=${returnUrl}`;
        }
    }

    // Check if user can access a specific route
    canAccess(route) {
        if (this.protectedRoutes.includes(route)) {
            return this.authManager.isUserAuthenticated();
        }
        return true;
    }
}

// Authentication enhancements
function enhanceAuthManager() {
    // Check if authManager exists
    if (typeof authManager === 'undefined') {
        console.error('authManager not found');
        return;
    }

    // Store original methods
    const originalHandleLogin = authManager.handleLogin.bind(authManager);
    const originalUpdateNavigation = authManager.updateNavigation.bind(authManager);

    // Enhanced login with return URL handling
    authManager.handleLogin = async function(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const remember = form.remember?.checked;

        const btn = document.getElementById('loginBtn');
        this.setButtonLoading(btn, true);

        try {
            await this.simulateApiCall();
            
            if (email === 'demo@cinnarios.com' && password === 'password123') {
                const user = {
                    id: 1,
                    firstName: 'Demo',
                    lastName: 'User',
                    email: email
                };

                this.login(user, remember);
                this.showNotification('Login successful!', 'success');
                
                // Handle return URL
                const urlParams = new URLSearchParams(window.location.search);
                const returnUrl = urlParams.get('returnUrl');
                
                setTimeout(() => {
                    if (returnUrl) {
                        window.location.href = decodeURIComponent(returnUrl);
                    } else {
                        window.location.href = 'index.html';
                    }
                }, 1000);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.showNotification(error.message || 'Login failed', 'error');
        } finally {
            this.setButtonLoading(btn, false);
        }
    };

    // Enhanced navigation with better auth state handling
    authManager.updateNavigation = function() {
        const nav = document.querySelector('.page-navigation');
        if (!nav) return;

        if (this.isAuthenticated) {
            // Show all navigation links
            const protectedLinks = nav.querySelectorAll('a[href="dashboard.html"], a[href="profile.html"], a[href="calendar.html"], a[href="events.html"]');
            protectedLinks.forEach(link => {
                link.style.display = 'inline-block';
            });

            // Add user menu
            let userMenu = nav.querySelector('.user-menu');
            if (!userMenu) {
                userMenu = document.createElement('div');
                userMenu.className = 'user-menu';
                userMenu.innerHTML = `
                    <div class="user-info">
                        <span class="user-name">${this.currentUser?.firstName || 'User'}</span>
                        <button class="logout-btn" onclick="authManager.logout()">Logout</button>
                    </div>
                `;
                nav.appendChild(userMenu);
            }

            // Hide login/signup links
            const authLinks = nav.querySelectorAll('a[href="login.html"], a[href="signup.html"]');
            authLinks.forEach(link => link.style.display = 'none');
        } else {
            // Hide protected links
            const protectedLinks = nav.querySelectorAll('a[href="dashboard.html"], a[href="profile.html"], a[href="calendar.html"], a[href="events.html"]');
            protectedLinks.forEach(link => {
                link.style.display = 'none';
            });

            // Remove user menu
            const userMenu = nav.querySelector('.user-menu');
            if (userMenu) {
                userMenu.remove();
            }

            // Show login link if not present
            const existingLogin = nav.querySelector('a[href="login.html"]');
            if (!existingLogin) {
                const loginLink = document.createElement('a');
                loginLink.href = 'login.html';
                loginLink.className = 'nav-link';
                loginLink.textContent = 'Login';
                nav.appendChild(loginLink);
            }
        }
    };

    // Setup return URL handling on init
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnUrl');
    
    if (returnUrl && authManager.isAuthenticated) {
        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(() => {
            window.location.href = decodeURIComponent(returnUrl);
        }, 100);
    }

    // Re-run navigation update with enhancements
    authManager.updateNavigation();
}

// Initialize enhanced auth and route guard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for authManager to be available
    if (typeof authManager !== 'undefined') {
        enhanceAuthManager();
        const routeGuard = new RouteGuard(authManager);
        window.routeGuard = routeGuard;
    } else {
        // Retry after a short delay if authManager isn't ready yet
        setTimeout(() => {
            if (typeof authManager !== 'undefined') {
                enhanceAuthManager();
                const routeGuard = new RouteGuard(authManager);
                window.routeGuard = routeGuard;
            }
        }, 100);
    }
});
