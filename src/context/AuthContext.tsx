import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture?: string;
  bio?: string;
  createdAt: Date;
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
  stats: {
    documentariesWatched: number;
    documentariesStarred: number;
    eventsAttended: number;
    eventsMissed: number;
    eventsCanceled: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateStats: (stats: Partial<User['stats']>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserToStorage = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your backend
      const mockUser: User = {
        id: '1',
        username: 'creative_user',
        email,
        profilePicture: 'https://via.placeholder.com/150',
        bio: 'Passionate about African creativity and storytelling',
        createdAt: new Date(),
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'en',
        },
        stats: {
          documentariesWatched: 12,
          documentariesStarred: 8,
          eventsAttended: 5,
          eventsMissed: 2,
          eventsCanceled: 1,
        },
      };

      setUser(mockUser);
      await saveUserToStorage(mockUser);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date(),
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'en',
        },
        stats: {
          documentariesWatched: 0,
          documentariesStarred: 0,
          eventsAttended: 0,
          eventsMissed: 0,
          eventsCanceled: 0,
        },
      };

      setUser(newUser);
      await saveUserToStorage(newUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) return;

    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await saveUserToStorage(updatedUser);
    } catch (error) {
      console.error('Profile update error:', error);
    }
  };

  const updateStats = async (stats: Partial<User['stats']>): Promise<void> => {
    if (!user) return;

    try {
      const updatedStats = { ...user.stats, ...stats };
      const updatedUser = { ...user, stats: updatedStats };
      setUser(updatedUser);
      await saveUserToStorage(updatedUser);
    } catch (error) {
      console.error('Stats update error:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    updateStats,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 