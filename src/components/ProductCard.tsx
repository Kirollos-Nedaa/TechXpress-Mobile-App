import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  const getStockColor = (stock) => {
    if (stock > 4) return '#27ae60';
    if (stock > 0) return '#e67e22';
    return '#c0392b';
  };

  const getStockText = (stock) => {
    if (stock > 4) return 'In stock';
    if (stock > 0) return `${stock} left`;
    return 'Out of stock';
  };

  const handlePress = () => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: product.icon }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {product.name}
      </Text>
      <Text style={styles.brand}>
        {product.brand} - {product.category}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={[styles.stock, { color: getStockColor(product.stock) }]}>
        {getStockText(product.stock)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (screenWidth - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#1e90ff',
    fontWeight: '600',
  },
  stock: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default ProductCard;