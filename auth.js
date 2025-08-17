// Authentication functionality
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.setupEventListeners();
        this.updateNavigation();
    }

    checkAuthStatus() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            this.isAuthenticated = true;
            this.currentUser = JSON.parse(user);
        }
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }

        // Password strength checker
        const signupPassword = document.getElementById('signupPassword');
        if (signupPassword) {
            signupPassword.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
        }

        // Confirm password validation
        const confirmPassword = document.getElementById('confirmPassword');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', (e) => this.validateConfirmPassword(e.target.value));
        }

        // Google auth buttons
        const googleBtns = document.querySelectorAll('.google-btn');
        googleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleGoogleAuth());
        });
    }

    updateNavigation() {
        const nav = document.querySelector('.page-navigation');
        if (!nav) return;

        if (this.isAuthenticated) {
            // Add user menu and logout
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <div class="user-info">
                    <span class="user-name">${this.currentUser?.firstName || 'User'}</span>
                    <button class="logout-btn" onclick="authManager.logout()">Logout</button>
                </div>
            `;
            nav.appendChild(userMenu);
        } else {
            // Add login/signup links if not present
            const existingLogin = nav.querySelector('a[href="login.html"]');
            if (!existingLogin) {
                const loginLink = document.createElement('a');
                loginLink.href = 'login.html';
                loginLink.className = 'nav-link';
                loginLink.textContent = 'Login';
                nav.appendChild(loginLink);
            }
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const remember = form.remember?.checked;

        const btn = document.getElementById('loginBtn');
        this.setButtonLoading(btn, true);

        try {
            // Simulate API call
            await this.simulateApiCall();
            
            // Validate credentials (demo purposes)
            if (email === 'demo@cinnarios.com' && password === 'password123') {
                const user = {
                    id: 1,
                    firstName: 'Demo',
                    lastName: 'User',
                    email: email
                };

                this.login(user, remember);
                this.showNotification('Login successful!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.showNotification(error.message || 'Login failed', 'error');
        } finally {
            this.setButtonLoading(btn, false);
        }
    }

    async handleSignup(e) {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const terms = form.terms.checked;

        // Validation
        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        if (!terms) {
            this.showNotification('Please accept the terms and conditions', 'error');
            return;
        }

        const btn = document.getElementById('signupBtn');
        this.setButtonLoading(btn, true);

        try {
            // Simulate API call
            await this.simulateApiCall();
            
            const user = {
                id: Date.now(),
                firstName,
                lastName,
                email
            };

            this.login(user, false);
            this.showNotification('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } catch (error) {
            this.showNotification(error.message || 'Signup failed', 'error');
        } finally {
            this.setButtonLoading(btn, false);
        }
    }

    login(user, remember = false) {
        this.isAuthenticated = true;
        this.currentUser = user;
        
        const token = this.generateToken();
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        
        this.showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    checkPasswordStrength(password) {
        const strengthEl = document.getElementById('passwordStrength');
        if (!strengthEl) return;

        let strength = 0;
        let feedback = '';

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        strengthEl.className = 'password-strength';
        
        if (strength < 3) {
            strengthEl.classList.add('weak');
            feedback = 'Weak password';
        } else if (strength < 4) {
            strengthEl.classList.add('medium');
            feedback = 'Medium strength password';
        } else {
            strengthEl.classList.add('strong');
            feedback = 'Strong password';
        }

        strengthEl.title = feedback;
    }

    validateConfirmPassword(confirmPassword) {
        const password = document.getElementById('signupPassword')?.value;
        const confirmInput = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                confirmInput.style.borderColor = '#4ade80';
            } else {
                confirmInput.style.borderColor = '#ef4444';
            }
        }
    }

    setButtonLoading(btn, loading) {
        const btnText = btn.querySelector('.btn-text');
        const btnLoader = btn.querySelector('.btn-loader');
        
        if (loading) {
            btn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
        } else {
            btn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    }

    async simulateApiCall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 10% chance of failure
                if (Math.random() < 0.1) {
                    reject(new Error('Network error. Please try again.'));
                } else {
                    resolve();
                }
            }, 1500);
        });
    }

    generateToken() {
        return 'token_' + Math.random().toString(36).substr(2, 9);
    }

    handleGoogleAuth() {
        this.showNotification('Google authentication coming soon!', 'info');
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

    // Public method to check if user is authenticated
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    // Public method to get current user
    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    }

    .notification-success {
        background: #4ade80;
    }

    .notification-error {
        background: #ef4444;
    }

    .notification-info {
        background: #3b82f6;
    }

    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .user-menu {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .user-name {
        color: white;
        font-weight: 500;
    }

    .logout-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }

    .logout-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);