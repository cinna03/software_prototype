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
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { userEvents } = useData();

  const statsOpacity = useSharedValue(0);
  const chartsOpacity = useSharedValue(0);

  React.useEffect(() => {
    statsOpacity.value = withTiming(1, { duration: 600 });
    chartsOpacity.value = withTiming(1, { duration: 800, delay: 200 });
  }, []);

  const animatedStatsStyle = useAnimatedStyle(() => ({
    opacity: statsOpacity.value,
  }));

  const animatedChartsStyle = useAnimatedStyle(() => ({
    opacity: chartsOpacity.value,
  }));

  const handleShareDashboard = () => {
    // Implement sharing functionality
    console.log('Sharing dashboard...');
  };

  const StatCard = ({ title, value, icon, color }: any) => (
    <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      <View style={styles.statContent}>
        <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
        <Text style={[styles.statTitle, { color: theme.colors.textSecondary }]}>{title}</Text>
      </View>
    </View>
  );

  const EventStatusCard = ({ title, count, color }: any) => (
    <View style={[styles.statusCard, { backgroundColor: theme.colors.surface }]}>
      <View style={[styles.statusIndicator, { backgroundColor: color }]} />
      <View style={styles.statusContent}>
        <Text style={[styles.statusCount, { color: theme.colors.text }]}>{count}</Text>
        <Text style={[styles.statusTitle, { color: theme.colors.textSecondary }]}>{title}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, animatedStatsStyle]}>
          <LinearGradient
            colors={theme.colors.gradient.primary}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Text style={[styles.greeting, { color: '#FFFFFF' }]}>
                Your Creative Journey
              </Text>
              <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>
                Track your progress and achievements
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.content, animatedChartsStyle]}>
          {/* Documentary Stats */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Documentary Engagement
              </Text>
            </View>
            
            <View style={styles.statsGrid}>
              <StatCard
                title="Watched"
                value={user?.stats.documentariesWatched || 0}
                icon="👁️"
                color={theme.colors.primary}
              />
              <StatCard
                title="Starred"
                value={user?.stats.documentariesStarred || 0}
                icon="⭐"
                color={theme.colors.accent}
              />
            </View>
          </View>

          {/* Event Stats */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Event Participation
              </Text>
            </View>
            
            <View style={styles.statusGrid}>
              <EventStatusCard
                title="Attended"
                count={user?.stats.eventsAttended || 0}
                color={theme.colors.success}
              />
              <EventStatusCard
                title="Missed"
                count={user?.stats.eventsMissed || 0}
                color={theme.colors.error}
              />
              <EventStatusCard
                title="Canceled"
                count={user?.stats.eventsCanceled || 0}
                color={theme.colors.warning}
              />
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Recent Activity
              </Text>
            </View>
            
            {userEvents.length > 0 ? (
              userEvents.slice(0, 3).map((event) => (
                <View key={event.id} style={[styles.activityCard, { backgroundColor: theme.colors.surface }]}>
                  <View style={styles.activityContent}>
                    <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
                      {event.title}
                    </Text>
                    <Text style={[styles.activityDate, { color: theme.colors.textSecondary }]}>
                      {event.date.toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={[styles.activityStatus, { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.activityStatusText, { color: '#FFFFFF' }]}>
                      {event.status}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.emptyStateIcon, { color: theme.colors.textSecondary }]}>
                  📅
                </Text>
                <Text style={[styles.emptyStateText, { color: theme.colors.textSecondary }]}>
                  No events registered yet
                </Text>
                <Text style={[styles.emptyStateSubtext, { color: theme.colors.textTertiary }]}>
                  Start exploring events to build your creative network
                </Text>
              </View>
            )}
          </View>

          {/* Share Dashboard */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.shareButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleShareDashboard}
            >
              <Text style={[styles.shareButtonText, { color: '#FFFFFF' }]}>
                📊 Share My Dashboard
              </Text>
            </TouchableOpacity>
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statIconText: {
    fontSize: 20,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
  },
  statusGrid: {
    gap: 12,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusContent: {
    flex: 1,
  },
  statusCount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusTitle: {
    fontSize: 14,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
  },
  activityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activityStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 12,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  shareButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DashboardScreen; 