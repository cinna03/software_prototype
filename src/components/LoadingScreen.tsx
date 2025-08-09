import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

const LoadingScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={theme.colors.gradient.primary}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>Cinnarios</Text>
          <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
            Loading...
          </Text>
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            style={styles.spinner}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  spinner: {
    marginTop: 16,
  },
});

export default LoadingScreen; 