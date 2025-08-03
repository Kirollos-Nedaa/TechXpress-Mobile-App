import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const API_URL = 'http://techxpress.runasp.net/api/categories'; // ✅ Update this

const groupIntoColumns = (data, itemsPerColumn = 2) => {
  const result = [];
  for (let i = 0; i < data.length; i += itemsPerColumn) {
    result.push(data.slice(i, i + itemsPerColumn));
  }
  return result;
};

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
        setLoading(false);
      });
  }, []);

  const categoryColumns = groupIntoColumns(categories, 2);

  const renderCategoryColumn = ({ item: columnItems }) => (
    <View style={styles.categoryColumn}>
      {columnItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.categoryBubble}>
          <Image
            source={{ uri: item.icon }}
            style={styles.categoryIcon}
            resizeMode="center"
          />
          <Text style={styles.categoryLabel}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.appName}>TechXpress</Text>

        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search products"
            placeholderTextColor="#c0c0c0ff"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity style={styles.heartIcon}>
          <MaterialIcons name="favorite-border" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Category bubbles (2 rows) */}
      <View style={styles.categorySection}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <FlatList
            data={categoryColumns}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderCategoryColumn}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  searchContainer: {
    flex: 2,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#c0c0c0ff",
    alignItems: 'center',
    paddingHorizontal: 8,
    marginHorizontal: 10,
    height: 30,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  heartIcon: {
    padding: 4,
  },
  categorySection: {
    marginTop: 10,
  },
  categoryColumn: {
    marginRight: 20,
    justifyContent: 'space-between',
    height: 240, // enough to fit two items
  },
  categoryBubble: {
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;