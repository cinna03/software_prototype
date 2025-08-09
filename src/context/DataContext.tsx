import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Documentary {
  id: string;
  title: string;
  description: string;
  artist: {
    name: string;
    profession: string;
    country: string;
    bio: string;
    image: string;
  };
  type: 'video' | 'article';
  duration?: string;
  thumbnail: string;
  videoUrl?: string;
  articleContent?: string;
  tags: string[];
  views: number;
  stars: number;
  comments: Comment[];
  createdAt: Date;
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  organizer: string;
  image: string;
  category: string;
  price: number;
  capacity: number;
  registeredUsers: string[];
  status: 'upcoming' | 'attended' | 'missed' | 'canceled';
  tags: string[];
}

export interface Magazine {
  id: string;
  title: string;
  coverImage: string;
  issue: string;
  publishDate: Date;
  articles: MagazineArticle[];
}

export interface MagazineArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  createdAt: Date;
}

interface DataContextType {
  documentaries: Documentary[];
  events: Event[];
  magazines: Magazine[];
  featuredDocumentaries: Documentary[];
  upcomingEvents: Event[];
  userEvents: Event[];
  starDocumentary: (documentaryId: string) => void;
  unstarDocumentary: (documentaryId: string) => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  addComment: (documentaryId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  getDocumentaryById: (id: string) => Documentary | undefined;
  getEventById: (id: string) => Event | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [documentaries, setDocumentaries] = useState<Documentary[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [magazines, setMagazines] = useState<Magazine[]>([]);

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock documentaries data
    const mockDocumentaries: Documentary[] = [
      {
        id: '1',
        title: 'The Rise of Nollywood: A Creative Revolution',
        description: 'Explore the journey of Nigeria\'s booming film industry and the creative minds behind its success.',
        artist: {
          name: 'Kemi Adetiba',
          profession: 'Film Director & Producer',
          country: 'Nigeria',
          bio: 'Award-winning director known for groundbreaking Nigerian films',
          image: 'https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=KA',
        },
        type: 'video',
        duration: '45:30',
        thumbnail: 'https://via.placeholder.com/400x225/FF6B35/FFFFFF?text=Nollywood',
        videoUrl: 'https://example.com/video1.mp4',
        tags: ['Film', 'Nigeria', 'Cinema', 'Directing'],
        views: 15420,
        stars: 892,
        comments: [],
        createdAt: new Date('2024-01-15'),
        featured: true,
      },
      {
        id: '2',
        title: 'Designing Africa: The Future of Digital Art',
        description: 'Meet the designers reshaping Africa\'s digital landscape through innovative design thinking.',
        artist: {
          name: 'Sarah Owusu',
          profession: 'Digital Designer & Creative Director',
          country: 'Ghana',
          bio: 'Pioneering digital artist creating stunning visual experiences',
          image: 'https://via.placeholder.com/200x200/2C3E50/FFFFFF?text=SO',
        },
        type: 'article',
        thumbnail: 'https://via.placeholder.com/400x225/2C3E50/FFFFFF?text=Design',
        articleContent: 'Full article content here...',
        tags: ['Design', 'Digital Art', 'Ghana', 'Innovation'],
        views: 8920,
        stars: 456,
        comments: [],
        createdAt: new Date('2024-01-10'),
        featured: true,
      },
      {
        id: '3',
        title: 'Sound of the Continent: African Music Production',
        description: 'Discover the producers and sound engineers behind Africa\'s biggest hits.',
        artist: {
          name: 'DJ Maphorisa',
          profession: 'Music Producer & DJ',
          country: 'South Africa',
          bio: 'Grammy-nominated producer revolutionizing African music',
          image: 'https://via.placeholder.com/200x200/E74C3C/FFFFFF?text=DM',
        },
        type: 'video',
        duration: '38:15',
        thumbnail: 'https://via.placeholder.com/400x225/E74C3C/FFFFFF?text=Music',
        videoUrl: 'https://example.com/video3.mp4',
        tags: ['Music', 'Production', 'South Africa', 'DJ'],
        views: 12350,
        stars: 678,
        comments: [],
        createdAt: new Date('2024-01-05'),
        featured: false,
      },
    ];

    // Mock events data
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'African Creative Summit 2024',
        description: 'Join the biggest gathering of African creatives in Lagos',
        location: 'Lagos, Nigeria',
        date: new Date('2024-03-15'),
        time: '09:00 AM',
        organizer: 'African Creative Network',
        image: 'https://via.placeholder.com/400x225/FF6B35/FFFFFF?text=Summit',
        category: 'Conference',
        price: 150,
        capacity: 500,
        registeredUsers: [],
        status: 'upcoming',
        tags: ['Conference', 'Networking', 'Lagos'],
      },
      {
        id: '2',
        title: 'Nollywood Film Festival',
        description: 'Celebrating the best of Nigerian cinema',
        location: 'Abuja, Nigeria',
        date: new Date('2024-04-20'),
        time: '06:00 PM',
        organizer: 'Nollywood Foundation',
        image: 'https://via.placeholder.com/400x225/2C3E50/FFFFFF?text=Festival',
        category: 'Film Festival',
        price: 75,
        capacity: 300,
        registeredUsers: [],
        status: 'upcoming',
        tags: ['Film', 'Festival', 'Cinema'],
      },
    ];

    // Mock magazines data
    const mockMagazines: Magazine[] = [
      {
        id: '1',
        title: 'Cinnarios Magazine - Issue 1',
        coverImage: 'https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=Magazine',
        issue: 'January 2024',
        publishDate: new Date('2024-01-01'),
        articles: [
          {
            id: '1',
            title: 'The Future of African Storytelling',
            excerpt: 'How digital platforms are revolutionizing African narratives',
            author: 'Aisha Bello',
            readTime: '5 min read',
            image: 'https://via.placeholder.com/200x150/FF6B35/FFFFFF?text=Story',
          },
          {
            id: '2',
            title: 'Design Trends in African Tech',
            excerpt: 'Exploring the unique design language of African tech startups',
            author: 'Kwame Asante',
            readTime: '7 min read',
            image: 'https://via.placeholder.com/200x150/2C3E50/FFFFFF?text=Design',
          },
        ],
      },
    ];

    setDocumentaries(mockDocumentaries);
    setEvents(mockEvents);
    setMagazines(mockMagazines);
  };

  const featuredDocumentaries = documentaries.filter(doc => doc.featured);
  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const userEvents = events.filter(event => event.registeredUsers.length > 0);

  const starDocumentary = (documentaryId: string) => {
    setDocumentaries(prev => 
      prev.map(doc => 
        doc.id === documentaryId 
          ? { ...doc, stars: doc.stars + 1 }
          : doc
      )
    );
  };

  const unstarDocumentary = (documentaryId: string) => {
    setDocumentaries(prev => 
      prev.map(doc => 
        doc.id === documentaryId 
          ? { ...doc, stars: Math.max(0, doc.stars - 1) }
          : doc
      )
    );
  };

  const registerForEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, registeredUsers: [...event.registeredUsers, 'current-user-id'] }
          : event
      )
    );
  };

  const unregisterFromEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, registeredUsers: event.registeredUsers.filter(id => id !== 'current-user-id') }
          : event
      )
    );
  };

  const addComment = (documentaryId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setDocumentaries(prev => 
      prev.map(doc => 
        doc.id === documentaryId 
          ? { ...doc, comments: [...doc.comments, newComment] }
          : doc
      )
    );
  };

  const getDocumentaryById = (id: string) => {
    return documentaries.find(doc => doc.id === id);
  };

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const value: DataContextType = {
    documentaries,
    events,
    magazines,
    featuredDocumentaries,
    upcomingEvents,
    userEvents,
    starDocumentary,
    unstarDocumentary,
    registerForEvent,
    unregisterFromEvent,
    addComment,
    getDocumentaryById,
    getEventById,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 