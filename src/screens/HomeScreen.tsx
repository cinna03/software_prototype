import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { theme } = useTheme();
  const { featuredDocumentaries, upcomingEvents, magazines } = useData();
  const { user } = useAuth();
  const navigation = useNavigation();

  const headerOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);

  React.useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    contentTranslateY.value = withSpring(0, { damping: 15 });
  }, []);

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const handleDocumentaryPress = (documentaryId: string) => {
    navigation.navigate('DocumentaryDetail', { id: documentaryId } as never);
  };

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetail', { id: eventId } as never);
  };

  const handleMagazinePress = () => {
    navigation.navigate('Magazine' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, animatedHeaderStyle]}>
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Text style={[styles.greeting, { color: '#FFFFFF' }]}>
                Welcome back, {user?.username || 'Creative'}! 👋
              </Text>
              <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
                Discover amazing African creative stories
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.content, animatedContentStyle]}>
          {/* Featured Documentaries */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Featured Documentaries
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Documentaries' as never)}>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {featuredDocumentaries.map((documentary) => (
                <TouchableOpacity
                  key={documentary.id}
                  style={[styles.documentaryCard, { backgroundColor: theme.colors.surface }]}
                  onPress={() => handleDocumentaryPress(documentary.id)}
                >
                  <Image
                    source={{ uri: documentary.thumbnail }}
                    style={styles.documentaryImage}
                    resizeMode="cover"
                  />
                  <View style={styles.documentaryContent}>
                    <Text style={[styles.documentaryTitle, { color: theme.colors.text }]} numberOfLines={2}>
                      {documentary.title}
                    </Text>
                    <Text style={[styles.documentaryArtist, { color: theme.colors.textSecondary }]}>
                      {documentary.artist.name}
                    </Text>
                    <View style={styles.documentaryStats}>
                      <Text style={[styles.stat, { color: theme.colors.textTertiary }]}>
                        {documentary.views.toLocaleString()} views
                      </Text>
                      <Text style={[styles.stat, { color: theme.colors.textTertiary }]}>
                        ⭐ {documentary.stars}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Upcoming Events */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Upcoming Events
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Events' as never)}>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {upcomingEvents.slice(0, 2).map((event) => (
              <TouchableOpacity
                key={event.id}
                style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}
                onPress={() => handleEventPress(event.id)}
              >
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                <View style={styles.eventContent}>
                  <Text style={[styles.eventTitle, { color: theme.colors.text }]} numberOfLines={2}>
                    {event.title}
                  </Text>
                  <Text style={[styles.eventLocation, { color: theme.colors.textSecondary }]}>
                    📍 {event.location}
                  </Text>
                  <Text style={[styles.eventDate, { color: theme.colors.textSecondary }]}>
                    📅 {event.date.toLocaleDateString()} at {event.time}
                  </Text>
                  <View style={styles.eventPrice}>
                    <Text style={[styles.price, { color: theme.colors.primary }]}>
                      ${event.price}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Magazine Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Latest Magazine
              </Text>
              <TouchableOpacity onPress={handleMagazinePress}>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>Read</Text>
              </TouchableOpacity>
            </View>
            
            {magazines.length > 0 && (
              <TouchableOpacity
                style={[styles.magazineCard, { backgroundColor: theme.colors.surface }]}
                onPress={handleMagazinePress}
              >
                <Image
                  source={{ uri: magazines[0].coverImage }}
                  style={styles.magazineImage}
                  resizeMode="cover"
                />
                <View style={styles.magazineContent}>
                  <Text style={[styles.magazineTitle, { color: theme.colors.text }]}>
                    {magazines[0].title}
                  </Text>
                  <Text style={[styles.magazineIssue, { color: theme.colors.textSecondary }]}>
                    {magazines[0].issue}
                  </Text>
                  <Text style={[styles.magazineArticles, { color: theme.colors.textSecondary }]}>
                    {magazines[0].articles.length} articles
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  headerContent: {
    marginTop: 40,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  documentaryCard: {
    width: 280,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  documentaryImage: {
    width: '100%',
    height: 160,
  },
  documentaryContent: {
    padding: 16,
  },
  documentaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 22,
  },
  documentaryArtist: {
    fontSize: 14,
    marginBottom: 8,
  },
  documentaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 12,
  },
  eventCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventImage: {
    width: 80,
    height: 80,
  },
  eventContent: {
    flex: 1,
    padding: 12,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  eventLocation: {
    fontSize: 12,
    marginBottom: 2,
  },
  eventDate: {
    fontSize: 12,
    marginBottom: 4,
  },
  eventPrice: {
    alignSelf: 'flex-start',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
  },
  magazineCard: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  magazineImage: {
    width: 60,
    height: 80,
  },
  magazineContent: {
    flex: 1,
    padding: 12,
  },
  magazineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  magazineIssue: {
    fontSize: 12,
    marginBottom: 2,
  },
  magazineArticles: {
    fontSize: 12,
  },
});

export default HomeScreen; 