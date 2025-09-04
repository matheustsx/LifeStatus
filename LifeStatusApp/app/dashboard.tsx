import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function DashboardScreen() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [hobbyPhotos, setHobbyPhotos] = useState<string[]>([]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const loadHobbyPhotos = async () => {
    try {
      const photos = await AsyncStorage.getItem('hobbyPhotos');
      console.log('Raw photos from storage:', photos);
      if (photos) {
        const parsedPhotos = JSON.parse(photos);
        console.log('Parsed photos:', parsedPhotos);
        console.log('Photos length:', parsedPhotos.length);
        setHobbyPhotos(parsedPhotos);
      } else {
        console.log('No photos found in storage');
        setHobbyPhotos([]);
      }
    } catch (error) {
      console.log('Erro ao carregar fotos:', error);
    }
  };

  const nextPhoto = () => {
    if (hobbyPhotos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % hobbyPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (hobbyPhotos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev - 1 + hobbyPhotos.length) % hobbyPhotos.length);
    }
  };

  useEffect(() => {
    // Limpa as fotos quando o app é reiniciado
    const clearPhotosOnReload = async () => {
      await AsyncStorage.removeItem('hobbyPhotos');
      setHobbyPhotos([]);
      setCurrentPhotoIndex(0);
    };
    clearPhotosOnReload();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadHobbyPhotos();
    }, [])
  );

  useEffect(() => {
    if (currentPhotoIndex >= hobbyPhotos.length && hobbyPhotos.length > 0) {
      setCurrentPhotoIndex(0);
    }
  }, [hobbyPhotos, currentPhotoIndex]);

  return (
    <LinearGradient
      colors={['#FAEDCB', '#C9E4DE', '#C6DEF1', '#DBCDF0', '#F2C6DE', '#F7D9C4']}
      style={styles.container}
    >
      {/* Botão Hambúrguer */}
      <TouchableOpacity style={styles.hamburgerButton} onPress={toggleSidebar}>
        <Ionicons name="menu" size={25} color="#333" />
      </TouchableOpacity>

      <View style={styles.mainContent}>
        {/* Sidebar Esquerda */}
        {sidebarVisible && (
          <View style={styles.sidebar}>
          <TouchableOpacity style={styles.sidebarItem}>
            <View style={styles.userPhoto}>
              <Ionicons name="person" size={30} color="#666" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarItem} onPress={() => router.push('/camera')}>
            <Ionicons name="camera" size={25} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarItem} onPress={() => router.push('/charts')}>
            <Ionicons name="bar-chart" size={25} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarItem}>
            <Text style={styles.mascotText}>🤖</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sidebarItem} onPress={() => router.push('/settings')}>
            <Ionicons name="settings" size={25} color="#666" />
          </TouchableOpacity>
          </View>
        )}

        {/* Conteúdo Central */}
        <View style={styles.centerContent}>
          {/* Carrossel de Fotos */}
          <View style={styles.photoCarousel}>
            {hobbyPhotos.length > 0 ? (
              <>
                {hobbyPhotos.length > 1 && (
                  <TouchableOpacity onPress={prevPhoto} style={styles.navButton}>
                    <Ionicons name="chevron-back" size={30} color="#8B7BB8" />
                  </TouchableOpacity>
                )}
                
                <Image 
                  source={{ uri: hobbyPhotos[currentPhotoIndex] }} 
                  style={styles.hobbyImage}
                  onError={(error) => console.log('Image load error:', error)}
                  onLoad={() => console.log('Image loaded successfully')}
                />
                
                {hobbyPhotos.length > 1 && (
                  <TouchableOpacity onPress={nextPhoto} style={styles.navButtonRight}>
                    <Ionicons name="chevron-forward" size={30} color="#8B7BB8" />
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View style={styles.photoContainer}>
                <Ionicons name="image" size={60} color="#999" />
                <Text style={styles.photoPlaceholder}>Fotos dos Hobbies</Text>
              </View>
            )}
            <View style={styles.progressDots}>
              {Array.from({ length: 3 }).map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    index < hobbyPhotos.length && index === currentPhotoIndex && styles.activeDot,
                    index < hobbyPhotos.length && styles.filledDot
                  ]} 
                />
              ))}
            </View>
          </View>

          {/* Cards de Status */}
          <View style={styles.statusCards}>
            <View style={[styles.statusCard, styles.angryCard]}>
              <Text style={styles.statusEmoji}>😠</Text>
              <Text style={styles.statusText}>Muito tempo online</Text>
              <Text style={styles.statusTime}>4h 30min</Text>
            </View>
            
            <View style={[styles.statusCard, styles.happyCard]}>
              <Text style={styles.statusEmoji}>😊</Text>
              <Text style={styles.statusText}>Tempo offline</Text>
              <Text style={styles.statusTime}>2h 15min</Text>
            </View>
          </View>

          {/* Gráfico */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Atividade Diária</Text>
            <View style={styles.chartPlaceholder}>
              <View style={styles.chartLine}>
                <Text style={styles.chartLabel}>Online</Text>
                <View style={[styles.line, styles.onlineLine]} />
              </View>
              <View style={styles.chartLine}>
                <Text style={styles.chartLabel}>Offline</Text>
                <View style={[styles.line, styles.offlineLine]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburgerButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1000,
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 60,
    paddingBottom: 20,
  },
  sidebar: {
    width: 80,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 80,
  },
  sidebarItem: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotText: {
    fontSize: 30,
  },
  centerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  photoCarousel: {
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  photoPlaceholder: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  progressDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#8B7BB8',
  },
  statusCards: {
    marginBottom: 20,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  angryCard: {
    backgroundColor: 'rgba(255, 182, 193, 0.8)',
  },
  happyCard: {
    backgroundColor: 'rgba(144, 238, 144, 0.8)',
  },
  statusEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    flex: 1,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
  },
  chartLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartLabel: {
    width: 60,
    fontSize: 14,
    color: '#666',
  },
  line: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginLeft: 10,
  },
  onlineLine: {
    backgroundColor: '#FF6B6B',
  },
  offlineLine: {
    backgroundColor: '#4ECDC4',
  },
  hobbyImage: {
    width: '80%',
    height: 180,
    borderRadius: 15,
    alignSelf: 'center',
  },
  navButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  navButtonRight: {
    position: 'absolute',
    right: 10,
    top: '50%',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  filledDot: {
    backgroundColor: '#8B7BB8',
  },
});