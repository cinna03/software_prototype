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

const DocumentariesScreen = () => {
  const { theme } = useTheme();
  const { documentaries } = useData();
  const navigation = useNavigation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'video', label: 'Videos' },
    { id: 'article', label: 'Articles' },
    { id: 'featured', label: 'Featured' },
  ];

  const filteredDocumentaries = documentaries.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'featured' ? doc.featured : doc.type === selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  const handleDocumentaryPress = (documentaryId: string) => {
    navigation.navigate('DocumentaryDetail', { id: documentaryId } as never);
  };

  const renderDocumentary = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.documentaryCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleDocumentaryPress(item.id)}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.documentaryImage}
        resizeMode="cover"
      />
      <View style={styles.documentaryContent}>
        <View style={styles.documentaryHeader}>
          <Text style={[styles.documentaryTitle, { color: theme.colors.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          {item.featured && (
            <View style={[styles.featuredBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.featuredText, { color: '#FFFFFF' }]}>Featured</Text>
            </View>
          )}
        </View>
        
        <View style={styles.artistInfo}>
          <Image
            source={{ uri: item.artist.image }}
            style={styles.artistImage}
            resizeMode="cover"
          />
          <View style={styles.artistDetails}>
            <Text style={[styles.artistName, { color: theme.colors.text }]}>
              {item.artist.name}
            </Text>
            <Text style={[styles.artistProfession, { color: theme.colors.textSecondary }]}>
              {item.artist.profession}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.documentaryFooter}>
          <View style={styles.stats}>
            <Text style={[styles.stat, { color: theme.colors.textTertiary }]}>
              👁️ {item.views.toLocaleString()}
            </Text>
            <Text style={[styles.stat, { color: theme.colors.textTertiary }]}>
              ⭐ {item.stars}
            </Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.typeText, { color: '#FFFFFF' }]}>
              {item.type === 'video' ? '📺 Video' : '📖 Article'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Documentaries
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Discover African creative stories
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
          placeholder="Search documentaries..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedFilter === filter.id 
                  ? theme.colors.primary 
                  : theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedFilter === filter.id 
                    ? '#FFFFFF' 
                    : theme.colors.text,
                },
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Documentaries List */}
      <FlatList
        data={filteredDocumentaries}
        renderItem={renderDocumentary}
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
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 24,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  documentaryCard: {
    marginBottom: 20,
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
    height: 200,
  },
  documentaryContent: {
    padding: 16,
  },
  documentaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  documentaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
    lineHeight: 24,
  },
  featuredBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: '600',
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  artistImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  artistDetails: {
    flex: 1,
  },
  artistName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  artistProfession: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  documentaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    fontSize: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DocumentariesScreen; 