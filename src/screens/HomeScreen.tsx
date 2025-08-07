import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORY_API = 'http://techxpress.runasp.net/api/categories';
const PRODUCT_API = 'http://techxpress.runasp.net/api/products';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PRODUCT_CARD_WIDTH = (SCREEN_WIDTH - 60) / 2; // Account for padding and gap

// Hero carousel data (mock data - replace with your actual banner API)
const heroSlides = [
  {
    id: 1,
    image: 'https://eg-rv.homzmart.net/mageplaza/bannerslider/banner/image/m/a/main_banner-en-dt_17.jpg',
    title: 'Latest Tech Arrivals',
    subtitle: 'Up to 40% off on smartphones',
    cta: 'Shop Now'
  },
  {
    id: 2,
    image: 'https://eg-rv.homzmart.net/mageplaza/bannerslider/banner/image/m/a/main_banner-en-dt_16.jpg',
    title: 'Premium Audio',
    subtitle: 'Wireless headphones & speakers',
    cta: 'Discover'
  },
  {
    id: 3,
    image: 'https://eg-rv.homzmart.net/mageplaza/bannerslider/banner/image/m/a/main_banner-en-dt_15_.jpg',
    title: '',
    subtitle: '',
    cta: 'Explore'
  }
];

// Modern ProductCard Component with fixed image handling
const ProductCard = ({ product, navigation }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic here
    Alert.alert(
      'Added to Cart', 
      `${product.name} has been added to your cart!`,
      [{ text: 'OK' }]
    );
    console.log('Added to cart:', product.name);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // Wishlist logic here
    console.log('Wishlist toggled for:', product.name);
  };

  const navigateToProduct = () => {
    // Navigate to product details - Fixed navigation
    if (navigation && navigation.navigate) {
      navigation.navigate('ProductDetails', { product });
    } else {
      // If navigation is not available, show alert with product info
      Alert.alert(
        'Product Details',
        `${product.name}\nPrice: $${product.price?.toFixed(2) || '0.00'}\nStock: ${product.stock || 0} items`,
        [{ text: 'OK' }]
      );
    }
  };

  // Handle image loading error
  const getImageSource = () => {
    if (imageError || !product.icon) {
      return {
        uri: `https://via.placeholder.com/${SCREEN_WIDTH}x300/f0f0f0/999999?text=${encodeURIComponent(product.name || 'Product')}`
      };
    }
    return { uri: product.icon };
  };

  return (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={navigateToProduct}
      activeOpacity={0.9}
    >
      {/* Product Image */}
      <View style={styles.productImageContainer}>
        {!imageError && getImageSource ? (
          <Image
            source={getImageSource()}
            style={styles.productImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback when image fails to load
          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="image" size={40} color="#cccccc" />
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        
        {/* Wishlist Button */}
        <TouchableOpacity 
          style={styles.wishlistButton}
          onPress={toggleWishlist}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name={isWishlisted ? "favorite" : "favorite-border"} 
            size={20} 
            color={isWishlisted ? "#EE5858" : "#666"} 
          />
        </TouchableOpacity>
        
        {/* Stock Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <View style={styles.lowStockBadge}>
            <Text style={styles.lowStockText}>Only {product.stock} left</Text>
          </View>
        )}
        
        {product.stock === 0 && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name || 'Unknown Product'}
        </Text>
        
        <Text style={styles.productCategory} numberOfLines={1}>
          {product.category || product.brand || 'Electronics'}
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>
            ${product.price?.toFixed(2) || '0.00'}
          </Text>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>
              ${product.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            product.stock === 0 && styles.disabledButton
          ]}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
          activeOpacity={0.8}
        >
          <MaterialIcons 
            name="add-shopping-cart" 
            size={16} 
            color={product.stock === 0 ? "#999" : "#ffffff"} 
          />
          <Text style={[
            styles.addToCartText,
            product.stock === 0 && styles.disabledButtonText
          ]}>
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroCarouselRef = useRef(null);

  const fetchData = async () => {
    try {
      setLoadingCategories(true);
      setLoadingProducts(true);
      
      const [catRes, prodRes] = await Promise.all([
        fetch(CATEGORY_API),
        fetch(PRODUCT_API),
      ]);
      
      if (!catRes.ok || !prodRes.ok) {
        throw new Error('Failed to fetch data from server');
      }
      
      const [catData, prodData] = await Promise.all([
        catRes.json(),
        prodRes.json(),
      ]);
      
      setCategories(Array.isArray(catData) ? catData : []);
      setProducts(Array.isArray(prodData) ? prodData : []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert(
        'Connection Error',
        'Failed to load data. Please check your internet connection and try again.',
        [{ text: 'OK' }]
      );
      setCategories([]);
      setProducts([]);
    } finally {
      setLoadingCategories(false);
      setLoadingProducts(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-scroll hero carousel with proper reference
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      setCurrentSlide(nextSlide);
      
      if (heroCarouselRef.current) {
        heroCarouselRef.current.scrollToIndex({
          index: nextSlide,
          animated: true,
        });
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const renderHeroSlide = ({ item }) => (
    <View style={styles.heroSlide}>
      <Image source={{ uri: item.image }} style={styles.heroImage} />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroTitle}>{item.title}</Text>
        <Text style={styles.heroSubtitle}>{item.subtitle}</Text>
        <TouchableOpacity style={styles.heroButton}>
          <Text style={styles.heroButtonText}>{item.cta}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => {
        // Navigate to category products or filter products
        console.log('Category selected:', item.name);
      }}
    >
      <View style={styles.categoryIconContainer}>
        {item.icon ? (
          <Image 
            source={{ uri: item.icon }} 
            style={styles.categoryIcon}
            resizeMode="center"
            onError={() => console.log('Category icon failed to load')}
          />
        ) : (
          <MaterialIcons 
            name="category" 
            size={24} 
            color="#1B6392" 
          />
        )}
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search logic here
      Alert.alert('Search', `Searching for "${searchQuery}"`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.appName}>TechXpress</Text>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => {
              // Navigate to profile or show profile menu
              Alert.alert('Profile', 'Profile functionality will be implemented here.');
            }}
          >
            <MaterialIcons name="favorite-border" size={28} color="#1B6392" />
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for products..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => {
              Alert.alert('Filters', 'Filter functionality will be implemented here.');
            }}
          >
            <MaterialIcons name="tune" size={20} color="#1B6392" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content - Single ScrollView */}
      <ScrollView
        style={styles.mainContent}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#1B6392']}
            tintColor="#124261"
          />
        }
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
      >
        {/* Hero Carousel */}
        <View style={styles.heroContainer}>
          <FlatList
            ref={heroCarouselRef}
            data={heroSlides}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderHeroSlide}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.round(
                event.nativeEvent.contentOffset.x / SCREEN_WIDTH
              );
              setCurrentSlide(slideIndex);
            }}
            getItemLayout={(data, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            scrollEnabled={true}
            nestedScrollEnabled={false}
          />
          <View style={styles.paginationContainer}>
            {heroSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentSlide === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => {
              Alert.alert('Categories', 'View all categories functionality will be implemented here.');
            }}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {loadingCategories ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#1B6392" />
            </View>
          ) : categories.length > 0 ? (
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              renderItem={renderCategory}
              contentContainerStyle={styles.categoriesList}
              nestedScrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No categories available</Text>
            </View>
          )}
        </View>

        {/* Featured Products Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => {
              Alert.alert('Products', 'View all products functionality will be implemented here.');
            }}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {loadingProducts && !refreshing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#1B6392" />
              <Text style={styles.loadingText}>Loading products...</Text>
            </View>
          ) : products.length > 0 ? (
            <View style={styles.productsGrid}>
              {products.map((item, index) => (
                <ProductCard 
                  key={item.id?.toString() || index.toString()}
                  product={item} 
                  navigation={navigation} 
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products available</Text>
              <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 1000,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B6392',
    letterSpacing: -0.5,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    fontWeight: '400',
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  mainContent: {
    flex: 1,
  },
  heroContainer: {
    height: 200,
    marginBottom: 24,
  },
  heroSlide: {
    width: SCREEN_WIDTH,
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.9,
  },
  heroButton: {
    backgroundColor: '#FA8232',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#ffffff',
    width: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#1B6392',
    fontWeight: '600',
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1B6392',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
  },
  categoryIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  // Product Card Styles
  productCard: {
    width: PRODUCT_CARD_WIDTH,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: PRODUCT_CARD_WIDTH * 0.75,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 8,
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  lowStockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#F3DE6D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lowStockText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  outOfStockText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 18,
  },
  productCategory: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '400',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B6392',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
    fontWeight: '400',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FA8232',
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 36,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 6,
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  disabledButtonText: {
    color: '#999999',
  },
});

export default HomeScreen;