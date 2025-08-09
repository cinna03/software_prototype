import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Celebrate African Creativity',
    subtitle: 'Discover the stories behind Africa\'s most influential artists, designers, and creators',
    image: 'https://via.placeholder.com/300x300/FF6B35/FFFFFF?text=🎨',
    color: '#FF6B35',
  },
  {
    id: 2,
    title: 'Interactive Documentaries',
    subtitle: 'Watch and read compelling stories about African creative journeys',
    image: 'https://via.placeholder.com/300x300/2C3E50/FFFFFF?text=📺',
    color: '#2C3E50',
  },
  {
    id: 3,
    title: 'Connect & Network',
    subtitle: 'Join events, meet fellow creatives, and build your professional network',
    image: 'https://via.placeholder.com/300x300/E74C3C/FFFFFF?text=🤝',
    color: '#E74C3C',
  },
  {
    id: 4,
    title: 'Stay Updated',
    subtitle: 'Get the latest insights from our bi-weekly digital magazine',
    image: 'https://via.placeholder.com/300x300/27AE60/FFFFFF?text=📖',
    color: '#27AE60',
  },
];

const OnboardingScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
    
    translateX.value = withSpring(contentOffset * 0.1);
    scale.value = withSpring(1 - Math.abs(contentOffset - index * width) / width * 0.1);
  };

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    opacity.value = withTiming(0, { duration: 300 }, () => {
      navigation.navigate('Login' as never);
    });
  };

  const handleSkip = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['rgba(255, 107, 53, 0.1)', 'rgba(44, 62, 80, 0.1)']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.logo, { color: theme.colors.primary }]}>Cinnarios</Text>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {onboardingData.map((item, index) => (
            <View key={item.id} style={styles.slide}>
              <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <View style={[styles.imageWrapper, { backgroundColor: item.color }]}>
                  <Text style={styles.emoji}>{item.image.split('text=')[1]}</Text>
                </View>
              </Animated.View>
              
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentIndex 
                    ? theme.colors.primary 
                    : theme.colors.border,
                },
              ]}
            />
          ))}
        </View>

        {/* Bottom */}
        <View style={styles.bottom}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              {
                backgroundColor: theme.colors.primary,
                ...theme.shadows.md,
              },
            ]}
            onPress={handleNext}
          >
            <Text style={[styles.nextButtonText, { color: '#FFFFFF' }]}>
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    marginBottom: 40,
  },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  emoji: {
    fontSize: 80,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OnboardingScreen; 