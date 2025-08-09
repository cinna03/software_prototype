# Cinnarios - African Creative Stories Mobile App

A professional mobile application designed to celebrate and showcase African creativity through interactive documentaries, events, and digital magazines. Built with React Native and Expo for cross-platform compatibility.

## 🌟 Vision

Cinnarios aims to break the stigma that art is mere entertainment or a luxury career. Through quality storytelling and documentaries, we celebrate African creative figures from various fields including:

- **Film & Television**: Directors, producers, actors, editors
- **Music**: Producers, DJs, sound engineers
- **Design**: Digital artists, graphic designers, creative directors
- **Photography**: Professional photographers, visual artists
- **Content Creation**: Influencers, digital creators
- **Research**: Creative researchers and scholars

## ✨ Features

### 🎬 Interactive Documentaries
- **Video & Article Format**: Rich multimedia content
- **Star System**: Users can star documentaries they connect with
- **Comments & Sharing**: Interactive engagement features
- **Artist Profiles**: Detailed information about featured creatives

### 📅 Events & Networking
- **Event Discovery**: Browse upcoming creative events
- **Registration System**: Sign up for events directly in the app
- **Calendar Integration**: Automatic calendar updates with reminders
- **Status Tracking**: Track event attendance (upcoming, attended, missed, canceled)

### 📊 Personal Dashboard
- **Documentary Stats**: Track watched and starred content
- **Event Analytics**: Monitor event participation
- **Shareable Reports**: Share dashboard stats like Spotify Wrapped
- **Progress Tracking**: Visual representation of creative journey

### 📖 Digital Magazine
- **Bi-weekly Issues**: Fresh content every 2 weeks
- **Industry Insights**: Latest trends and topics
- **Free Subscription**: No cost to access quality content
- **Offline Reading**: Download issues for offline access

### 👤 User Profiles
- **Customizable Profiles**: Username and profile picture updates
- **Bio Section**: Personal creative journey descriptions
- **Privacy Controls**: User data protection
- **Social Integration**: Share achievements and discoveries

## 🎨 Design Philosophy

### African-Inspired Color Palette
- **Primary**: Vibrant Orange (#FF6B35) - Energy and creativity
- **Secondary**: Deep Blue-Grey (#2C3E50) - Professionalism and depth
- **Accent**: Red (#E74C3C) - Passion and boldness
- **Success**: Green (#27AE60) - Growth and achievement

### Modern UI/UX Features
- **Smooth Animations**: React Native Reanimated for fluid interactions
- **Gradient Backgrounds**: Linear gradients for visual depth
- **Card-Based Design**: Clean, organized content presentation
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Mode Support**: Comfortable viewing in any lighting

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cinnarios.git
   cd cinnarios
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   ├── CustomTabBar.tsx
│   └── LoadingScreen.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   ├── DataContext.tsx
│   └── ThemeContext.tsx
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── DocumentariesScreen.tsx
│   ├── EventsScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── LoginScreen.tsx
│   └── OnboardingScreen.tsx
└── types/              # TypeScript type definitions
```

## 🛠️ Technology Stack

### Core Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript development
- **React Navigation**: Navigation and routing

### UI/UX Libraries
- **React Native Reanimated**: Smooth animations
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **React Native Gesture Handler**: Touch interactions
- **React Native Paper**: Material Design components

### State Management
- **React Context**: Global state management
- **AsyncStorage**: Local data persistence
- **Custom Hooks**: Reusable logic

### Media & Content
- **Expo AV**: Video playback
- **Expo Image Picker**: Profile picture selection
- **React Native Share**: Content sharing
- **Expo Calendar**: Event integration

## 🎯 Key Features Implementation

### Authentication System
- Secure login/registration
- Profile management
- Session persistence
- User preferences

### Content Management
- Documentary categorization
- Search and filtering
- Featured content highlighting
- User interaction tracking

### Event Management
- Event discovery and registration
- Calendar integration
- Status tracking
- Reminder notifications

### Analytics Dashboard
- User engagement metrics
- Content consumption stats
- Event participation tracking
- Shareable achievements

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=your_api_url_here
EXPO_PUBLIC_APP_NAME=Cinnarios
```

### App Configuration
Update `app.json` for app-specific settings:
```json
{
  "expo": {
    "name": "Cinnarios",
    "slug": "cinnarios",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FF6B35"
    }
  }
}
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "expo": "~49.0.0",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "react-native-reanimated": "~3.3.0",
  "react-native-gesture-handler": "~2.12.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/bottom-tabs": "^6.5.11"
}
```

### UI/UX Dependencies
```json
{
  "expo-linear-gradient": "~12.3.0",
  "expo-blur": "~12.4.1",
  "expo-haptics": "~12.4.0",
  "react-native-paper": "^5.11.1",
  "react-native-elements": "^3.4.3"
}
```

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "android": {
         "package": "com.cinnarios.app"
       },
       "ios": {
         "bundleIdentifier": "com.cinnarios.app"
       }
     }
   }
   ```

2. **Build the app**
   ```bash
   # Android
   expo build:android
   
   # iOS
   expo build:ios
   ```

3. **Submit to stores**
   ```bash
   # Android
   expo upload:android
   
   # iOS
   expo upload:ios
   ```

## 🤝 Contributing

We welcome contributions from the creative community! Please read our contributing guidelines and code of conduct.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- African creative community for inspiration
- React Native and Expo teams for amazing tools
- Open source contributors worldwide

## 📞 Contact

- **Email**: hello@cinnarios.com
- **Website**: https://cinnarios.com
- **Twitter**: @cinnarios_app

---

**Cinnarios** - Celebrating African Creativity, One Story at a Time 🌍✨ 