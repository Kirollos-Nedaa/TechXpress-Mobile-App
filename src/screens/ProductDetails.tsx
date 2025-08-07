import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Get product image with fallback
  const getImageSource = () => {
    if (imageError || !product.icon) {
      return {
        uri: `https://via.placeholder.com/${SCREEN_WIDTH}x300/f0f0f0/999999?text=${encodeURIComponent(product.name || 'Product')}`
      };
    }
    return { uri: product.icon };
  };

  // Format price
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return parseFloat(price || 0).toFixed(2);
  };

  // Handle quantity changes
  const updateQuantity = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (product.stock === 0) {
      Alert.alert('Out of Stock', 'This product is currently out of stock.');
      return;
    }
    
    // Add your cart logic here
    Alert.alert(
      'Added to Cart',
      `${quantity} x ${product.name} has been added to your cart.`,
      [{ text: 'OK' }]
    );
    console.log(`Added ${quantity} x ${product.name} to cart`);
  };

  // Handle buy now
  const handleBuyNow = () => {
    if (product.stock === 0) {
      Alert.alert('Out of Stock', 'This product is currently out of stock.');
      return;
    }
    
    // Navigate to checkout or handle buy now logic
    Alert.alert(
      'Buy Now',
      `Proceed to checkout with ${quantity} x ${product.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', onPress: () => console.log('Proceeding to checkout') }
      ]
    );
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const message = !isWishlisted ? 'Added to wishlist' : 'Removed from wishlist';
    Alert.alert('Wishlist', message);
  };

  // Go back
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Calculate discount if original price exists
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={toggleWishlist} style={styles.wishlistHeaderButton}>
          <MaterialIcons 
            name={isWishlisted ? "favorite" : "favorite-border"} 
            size={24} 
            color={isWishlisted ? "#ff5722" : "#333"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={getImageSource()}
            style={styles.productImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
          {hasDiscount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPercentage}% OFF</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          {/* Name and Brand */}
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>{product.brand}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
          </View>

          {/* Rating (placeholder - add if you have rating data) */}
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <MaterialIcons
                  key={star}
                  name="star"
                  size={16}
                  color={star <= 4 ? "#ffc107" : "#e0e0e0"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>4.0 (128 reviews)</Text>
          </View>

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>${formatPrice(product.price)}</Text>
              {hasDiscount && (
                <Text style={styles.originalPrice}>${formatPrice(product.originalPrice)}</Text>
              )}
            </View>
            {hasDiscount && (
              <Text style={styles.savingsText}>You save ${formatPrice(product.originalPrice - product.price)}</Text>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockSection}>
            <MaterialIcons 
              name={product.stock > 0 ? "check-circle" : "cancel"} 
              size={20} 
              color={product.stock > 0 ? "#4caf50" : "#f44336"} 
            />
            <Text style={[
              styles.stockText,
              { color: product.stock > 0 ? "#4caf50" : "#f44336" }
            ]}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {product.description && product.description !== 'n/a' 
                ? product.description 
                : 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              }
            </Text>
          </View>

          {/* Features (placeholder) */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <MaterialIcons name="verified" size={16} color="#4caf50" />
                <Text style={styles.featureText}>Premium Quality Materials</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="local-shipping" size={16} color="#4caf50" />
                <Text style={styles.featureText}>Free Shipping Available</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="support-agent" size={16} color="#4caf50" />
                <Text style={styles.featureText}>24/7 Customer Support</Text>
              </View>
              <View style={styles.featureItem}>
                <MaterialIcons name="security" size={16} color="#4caf50" />
                <Text style={styles.featureText}>1 Year Warranty</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        {/* Quantity Selector */}
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Qty:</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]}
              onPress={() => updateQuantity(-1)}
              disabled={quantity <= 1}
            >
              <MaterialIcons name="remove" size={18} color={quantity <= 1 ? "#ccc" : "#333"} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, quantity >= product.stock && styles.disabledButton]}
              onPress={() => updateQuantity(1)}
              disabled={quantity >= product.stock}
            >
              <MaterialIcons name="add" size={18} color={quantity >= product.stock ? "#ccc" : "#333"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.addToCartButton, product.stock === 0 && styles.disabledActionButton]}
            onPress={handleAddToCart}
            disabled={product.stock === 0}
          >
            <MaterialIcons 
              name="add-shopping-cart" 
              size={20} 
              color={product.stock === 0 ? "#999" : "#1a237e"} 
            />
            <Text style={[
              styles.addToCartText,
              product.stock === 0 && styles.disabledActionText
            ]}>
              Add to Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buyNowButton, product.stock === 0 && styles.disabledActionButton]}
            onPress={handleBuyNow}
            disabled={product.stock === 0}
          >
            <Text style={[
              styles.buyNowText,
              product.stock === 0 && styles.disabledActionText
            ]}>
              {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  wishlistHeaderButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: '#f8f9fa',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#ff5722',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 32,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  brandText: {
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#1a237e',
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  priceSection: {
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a237e',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999999',
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  savingsText: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
  },
  stockSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stockText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    fontWeight: '400',
  },
  featuresSection: {
    marginBottom: 20,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontWeight: '500',
  },
  bottomBar: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    paddingHorizontal: 20,
    minWidth: 60,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#1a237e',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a237e',
    marginLeft: 8,
  },
  buyNowButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a237e',
    paddingVertical: 16,
    borderRadius: 12,
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  disabledActionButton: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
  disabledActionText: {
    color: '#999999',
  },
});

export default ProductDetails;