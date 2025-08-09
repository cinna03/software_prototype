import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']}
        style={[
          styles.tabBar,
          {
            borderTopColor: theme.colors.border,
            ...theme.shadows.lg,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = options.tabBarIcon as string;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: isFocused 
                        ? theme.colors.primary 
                        : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.icon,
                      {
                        color: isFocused 
                          ? '#FFFFFF' 
                          : theme.colors.textSecondary,
                      },
                    ]}
                  >
                    {getIcon(iconName)}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: isFocused 
                        ? theme.colors.primary 
                        : theme.colors.textSecondary,
                    },
                  ]}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </Animated.View>
  );
};

const getIcon = (iconName: string) => {
  const icons: { [key: string]: string } = {
    home: '🏠',
    'play-circle': '📺',
    calendar: '📅',
    'bar-chart': '📊',
    user: '👤',
  };
  return icons[iconName] || '📱';
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 1,
    paddingBottom: 20,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default CustomTabBar; 