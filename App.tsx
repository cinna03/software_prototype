import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { DataProvider } from './src/context/DataContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import DocumentariesScreen from './src/screens/DocumentariesScreen';
import EventsScreen from './src/screens/EventsScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MagazineScreen from './src/screens/MagazineScreen';
import DocumentaryDetailScreen from './src/screens/DocumentaryDetailScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import LoginScreen from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

// Components
import CustomTabBar from './src/components/CustomTabBar';
import LoadingScreen from './src/components/LoadingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen 
        name="Documentaries" 
        component={DocumentariesScreen}
        options={{
          tabBarLabel: 'Documentaries',
          tabBarIcon: 'play-circle',
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: 'calendar',
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: 'bar-chart',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: 'user',
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <DataProvider>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                  }}
                >
                  <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Main" component={TabNavigator} />
                  <Stack.Screen name="DocumentaryDetail" component={DocumentaryDetailScreen} />
                  <Stack.Screen name="EventDetail" component={EventDetailScreen} />
                  <Stack.Screen name="Magazine" component={MagazineScreen} />
                </Stack.Navigator>
              </NavigationContainer>
              <StatusBar style="light" />
            </DataProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App; 