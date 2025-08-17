// Supabase configuration
const SUPABASE_URL = 'https://rurxrpzpznmsdhdtjcoa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1cnhycHpwem5tc2RoZHRqY29hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0NTY3MTIsImV4cCI6MjA3MTAzMjcxMn0.NnMCF-TjTACO3zMoC9Xx1P4E7y1wT9iNU03c6Q9V5I4';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Supabase Authentication Manager
class SupabaseAuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    async init() {
        await this.checkAuthStatus();
        this.setupEventListeners();
        this.updateNavigation();
        this.setupAuthStateListener();
    }

    async checkAuthStatus() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error) throw error;
            
            if (user) {
                this.isAuthenticated = true;
                this.currentUser = {
                    id: user.id,
                    email: user.email,
                    firstName: user.user_metadata?.firstName || user.email.split('@')[0],
                    lastName: user.user_metadata?.lastName || '',
                    avatar: user.user_metadata?.avatar_url
                };
            } else {
                this.isAuthenticated = false;
                this.currentUser = null;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            this.isAuthenticated = false;
            this.currentUser = null;
        }
    }

    setupAuthStateListener() {
        supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state change:', event, session?.user?.email);
            
            if (event === 'SIGNED_IN' && session?.user) {
                this.isAuthenticated = true;
                this.currentUser = {
                    id: session.user.id,
                    email: session.user.email,
                    firstName: session.user.user_metadata?.firstName || session.user.email.split('@')[0],
                    lastName: session.user.user_metadata?.lastName || '',
                    avatar: session.user.user_metadata?.avatar_url
                };
                console.log('User signed in:', this.currentUser);
                this.updateNavigation();
            } else if (event === 'SIGNED_OUT') {
                this.isAuthenticated = false;
                this.currentUser = null;
                console.log('User signed out');
                this.updateNavigation();
            }
        });
        
        // Periodic navigation update to ensure it stays in sync
        setInterval(() => {
            this.updateNavigation();
        }, 2000);
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

    async handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const remember = form.remember?.checked;

        const btn = document.getElementById('loginBtn');
        this.setButtonLoading(btn, true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

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
        const terms = form.terms?.checked;

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
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        firstName: firstName,
                        lastName: lastName
                    }
                }
            });

            if (error) throw error;

            this.showNotification('Account created! Please check your email to verify your account.', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);

        } catch (error) {
            this.showNotification(error.message || 'Signup failed', 'error');
        } finally {
            this.setButtonLoading(btn, false);
        }
    }

    async logout() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            this.showNotification('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } catch (error) {
            this.showNotification('Logout failed', 'error');
        }
    }

    async handleGoogleAuth() {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/index.html'
                }
            });

            if (error) throw error;

        } catch (error) {
            this.showNotification('Google authentication failed', 'error');
        }
    }

    updateNavigation() {
        const nav = document.querySelector('.page-navigation');
        if (!nav) return;

        // Remove existing user menu first to avoid duplicates
        const existingUserMenu = nav.querySelector('.user-menu');
        if (existingUserMenu) {
            existingUserMenu.remove();
        }

        if (this.isAuthenticated && this.currentUser) {
            // Show all navigation links
            const protectedLinks = nav.querySelectorAll('a[href="dashboard.html"], a[href="calendar.html"], a[href="events.html"]');
            protectedLinks.forEach(link => {
                link.style.display = 'inline-block';
            });

            // Add user menu
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <div class="user-info">
                    <span class="user-name">👤 ${this.currentUser?.firstName || this.currentUser?.email || 'User'}</span>
                    <button class="logout-btn" onclick="window.supabaseAuthManager.logout()">Logout</button>
                </div>
            `;
            nav.appendChild(userMenu);

            // Hide login/signup links
            const authLinks = nav.querySelectorAll('a[href="login.html"], a[href="signup.html"]');
            authLinks.forEach(link => link.style.display = 'none');
        } else {
            // Hide protected links
            const protectedLinks = nav.querySelectorAll('a[href="dashboard.html"], a[href="calendar.html"], a[href="events.html"]');
            protectedLinks.forEach(link => {
                link.style.display = 'none';
            });

            // Show login link if not present
            let existingLogin = nav.querySelector('a[href="login.html"]');
            if (!existingLogin) {
                const loginLink = document.createElement('a');
                loginLink.href = 'login.html';
                loginLink.className = 'nav-link';
                loginLink.textContent = 'Login';
                nav.appendChild(loginLink);
            } else {
                existingLogin.style.display = 'inline-block';
            }
        }
    }

    // Utility methods (keep existing ones)
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

    // Public methods
    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Route Guard (updated for Supabase)
class SupabaseRouteGuard {
    constructor(authManager) {
        this.authManager = authManager;
        this.protectedRoutes = [
            'dashboard.html',
            'calendar.html',
            'events.html'
        ];
        // Wait for auth to be ready before checking route access
        this.checkAuthReady();
    }

    async checkAuthReady() {
        // Wait a bit longer for Supabase auth to initialize
        setTimeout(() => {
            this.checkRouteAccess();
        }, 2000);
    }

    checkRouteAccess() {
        const currentPage = window.location.pathname.split('/').pop();
        const isProtectedRoute = this.protectedRoutes.includes(currentPage);
        
        if (isProtectedRoute && (!this.authManager || !this.authManager.isUserAuthenticated())) {
            // Double-check after a short delay
            setTimeout(() => {
                if (!this.authManager || !this.authManager.isUserAuthenticated()) {
                    // Redirect to login with return URL
                    const returnUrl = encodeURIComponent(window.location.href);
                    window.location.href = `login.html?returnUrl=${returnUrl}`;
                }
            }, 1000);
        }
    }

    canAccess(route) {
        if (this.protectedRoutes.includes(route)) {
            return this.authManager.isUserAuthenticated();
        }
        return true;
    }
}

// Initialize Supabase auth system
let supabaseAuthManager;
let supabaseRouteGuard;

// Initialize immediately if Supabase is available
function initializeAuth() {
    if (typeof window.supabase !== 'undefined') {
        supabaseAuthManager = new SupabaseAuthManager();
        supabaseRouteGuard = new SupabaseRouteGuard(supabaseAuthManager);
        
        // Make available globally
        window.authManager = supabaseAuthManager;
        window.routeGuard = supabaseRouteGuard;
        window.supabaseAuthManager = supabaseAuthManager;
        
        console.log('Supabase auth manager initialized');
        return true;
    }
    return false;
}

// Try to initialize immediately
if (!initializeAuth()) {
    // If not available, wait for DOM and try again
    document.addEventListener('DOMContentLoaded', async function() {
        if (!initializeAuth()) {
            console.error('Supabase not loaded. Please ensure the Supabase script is included.');
        }
    });
}

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
