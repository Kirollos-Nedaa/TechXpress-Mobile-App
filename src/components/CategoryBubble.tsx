import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CategoryBubble = ({ category }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: category.icon }}
        style={styles.icon}
        resizeMode="center"
      />
      <Text style={styles.label}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f5f5f7',
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c1c1e',
  },
});

export default CategoryBubble;
