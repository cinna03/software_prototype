import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useNavigation } from '@react-navigation/native';

const EventsScreen = () => {
  const { theme } = useTheme();
  const { events, registerForEvent, unregisterFromEvent } = useData();
  const navigation = useNavigation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'Conference', label: 'Conferences' },
    { id: 'Film Festival', label: 'Film Festivals' },
    { id: 'Workshop', label: 'Workshops' },
    { id: 'Exhibition', label: 'Exhibitions' },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleEventPress = (eventId: string) => {
    navigation.navigate('EventDetail', { id: eventId } as never);
  };

  const handleRegister = (eventId: string) => {
    registerForEvent(eventId);
  };

  const handleUnregister = (eventId: string) => {
    unregisterFromEvent(eventId);
  };

  const renderEvent = ({ item }: { item: any }) => {
    const isRegistered = item.registeredUsers.includes('current-user-id');
    
    return (
      <TouchableOpacity
        style={[styles.eventCard, { backgroundColor: theme.colors.surface }]}
        onPress={() => handleEventPress(item.id)}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.eventImage}
          resizeMode="cover"
        />
        
        <View style={styles.eventContent}>
          <View style={styles.eventHeader}>
            <Text style={[styles.eventTitle, { color: theme.colors.text }]} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.categoryText, { color: '#FFFFFF' }]}>
                {item.category}
              </Text>
            </View>
          </View>
          
          <View style={styles.eventDetails}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailIcon, { color: theme.colors.textSecondary }]}>📍</Text>
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                {item.location}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailIcon, { color: theme.colors.textSecondary }]}>📅</Text>
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                {item.date.toLocaleDateString()} at {item.time}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={[styles.detailIcon, { color: theme.colors.textSecondary }]}>👤</Text>
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]}>
                {item.organizer}
              </Text>
            </View>
          </View>
          
          <View style={styles.eventFooter}>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, { color: theme.colors.primary }]}>
                ${item.price}
              </Text>
              <Text style={[styles.capacity, { color: theme.colors.textTertiary }]}>
                {item.registeredUsers.length}/{item.capacity} registered
              </Text>
            </View>
            
            <TouchableOpacity
              style={[
                styles.registerButton,
                {
                  backgroundColor: isRegistered 
                    ? theme.colors.error 
                    : theme.colors.primary,
                },
              ]}
              onPress={() => isRegistered ? handleUnregister(item.id) : handleRegister(item.id)}
            >
              <Text style={[styles.registerButtonText, { color: '#FFFFFF' }]}>
                {isRegistered ? 'Unregister' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Events
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Discover and join creative events
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            },
          ]}
          placeholder="Search events..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === category.id 
                  ? theme.colors.primary 
                  : theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                {
                  color: selectedCategory === category.id 
                    ? '#FFFFFF' 
                    : theme.colors.text,
                },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  eventCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventImage: {
    width: '100%',
    height: 160,
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    lineHeight: 24,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  capacity: {
    fontSize: 12,
  },
  registerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EventsScreen; 