# Cinnarios - Digital Creative Platform

A digital solution to shift perception and empower creative talent in Africa. Cinnarios is a web platform that combines technology with storytelling, education, and community to break down barriers and make art accessible to everyone.

## 🌟 Features

- **User Authentication**: Secure login/signup with Supabase
- **Interactive Dashboard**: Personalized user experience with performance tracking
- **Documentary Section**: Educational content and storytelling
- **Events Management**: Creative events and community gatherings
- **Calendar Integration**: Event scheduling and management
- **Responsive Design**: Modern, accessible UI that works on all devices

## 📋 Prerequisites

### For Live Demo (Recommended)
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet Connection**: Required for accessing the deployed application

### For Local Development
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Text Editor**: VS Code, Sublime Text, or any code editor
- **Internet Connection**: Required for Supabase services and external resources

## 🚀 Quick Start

### Method 0: Live Demo (Recommended for everyone)

The application is **already deployed and live**! You can access it immediately:

🌐 **Live Demo**: [Access the deployed application here](https://software-prototype.onrender.com)

- No setup required
- Works on all devices
- Full functionality available
- Create an account to access all features

### Method 1: Local Development (For developers and customization)

1. **Download/Clone the Project**
   ```bash
   # If you have Git installed:
   git clone <repository-url>
   
   # Or download the ZIP file and extract it
   ```

2. **Navigate to Project Directory**
   ```bash
   cd software_prototype
   ```

3. **Open the Project**
   - **Windows**: Double-click `preview.bat` or right-click `index.html` → "Open with" → Choose your browser
   - **Mac/Linux**: Right-click `index.html` → "Open with" → Choose your browser
   - **Alternative**: Drag `index.html` directly into your browser window

4. **Start Exploring**
   - The application will load in your default browser
   - Navigate through different sections using the menu
   - Create an account or log in to access full features

### Method 2: Local Server (For advanced development)

1. **Install a Local Server** (Choose one option):

   **Option A: Using Python (if Python is installed)**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Using Node.js (if Node.js is installed)**
   ```bash
   # Install a simple HTTP server globally
   npm install -g http-server
   
   # Start the server
   http-server -p 8000
   ```

   **Option C: Using Live Server (VS Code Extension)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` → "Open with Live Server"

2. **Access the Application**
   - Open your browser
   - Go to `http://localhost:8000`
   - The application will load with live reload capabilities

## 🔧 Project Structure

```
software_prototype/
├── index.html              # Main landing page
├── about.html              # About us page
├── documentary.html        # Documentary content
├── dashboard.html          # User dashboard
├── events.html            # Events page
├── calendar.html          # Calendar functionality
├── login.html             # User login
├── signup.html            # User registration
├── profile.html           # User profile
├── auth-demo.html         # Authentication demo
├── app.html               # Main application
├── style.css              # Main stylesheet
├── user-features.css      # Dashboard-specific styles
├── about.css              # About page styles
├── script.js              # Main JavaScript
├── app.js                 # Application logic
├── dashboard.js           # Dashboard functionality
├── dashboard-enhanced.js  # Enhanced dashboard features
├── events.js              # Events functionality
├── calendar.js            # Calendar functionality
├── auth.js                # Basic authentication
├── auth-enhanced.js       # Enhanced authentication
├── supabase-auth.js       # Supabase authentication
├── supabase-auth-clean.js # Clean Supabase auth
├── preview.bat            # Windows quick start script
└── temporary/             # Temporary files
```

## 🔐 Authentication Setup

The application uses Supabase for authentication. The configuration is already set up in `supabase-auth.js`:

- **Supabase URL**: `https://rurxrpzpznmsdhdtjcoa.supabase.co`
- **Authentication**: Email/password and Google OAuth
- **Features**: User registration, login, profile management

### Creating a Test Account

**For Live Demo:**
1. Visit the deployed application
2. Click "Login" or "Sign up" in the navigation
3. Fill in your email and password
4. Verify your email (if required)
5. Log in with your credentials

**For Local Development:**
1. Navigate to the login page (`login.html`)
2. Click "Sign up" to create a new account
3. Fill in your email and password
4. Verify your email (if required)
5. Log in with your credentials

## 🎨 Customization

### Styling
- Edit `style.css` for global styles
- Modify `user-features.css` for dashboard-specific styling
- Update `about.css` for about page customization

### Content
- Update text content in HTML files
- Replace images with your own assets
- Modify navigation links as needed

### Functionality
- Edit JavaScript files to add new features
- Modify authentication logic in `supabase-auth.js`
- Update dashboard functionality in `dashboard.js`

## 🌐 Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🔍 Troubleshooting

### Common Issues

1. **Page Not Loading**
   - Ensure all files are in the same directory
   - Check that `index.html` is the entry point
   - Verify internet connection for external resources

2. **Authentication Not Working**
   - Check browser console for errors
   - Ensure Supabase services are accessible
   - Verify email/password format

3. **Styling Issues**
   - Clear browser cache
   - Check CSS file paths
   - Verify CSS syntax

4. **JavaScript Errors**
   - Open browser developer tools (F12)
   - Check Console tab for error messages
   - Ensure all JavaScript files are loaded

### Getting Help

1. **Check Browser Console**: Press F12 → Console tab
2. **Verify File Structure**: Ensure all files are present
3. **Test in Different Browser**: Try another browser
4. **Check Network Tab**: Look for failed resource loads

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🔄 Updates and Maintenance

- Keep your browser updated
- Clear cache regularly for best performance
- Check for new versions of the project

## 📄 License

This project is part of the Cinnarios creative platform initiative.

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions about the platform:
- **Live Demo Issues**: Check the troubleshooting section above
- **Local Development Issues**: Review browser console for error messages
- **General Questions**: Ensure all prerequisites are met
- **Deployment Status**: The application is live and accessible 24/7

## 🌐 Deployment Information

- **Status**: ✅ Live and deployed
- **Access**: Available worldwide
- **Uptime**: 24/7 availability
- **Performance**: Optimized for all devices

---

**Cinnarios** - Empowering creative talent in Africa through technology and community.