import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useQuery, useMutation } from 'convex/react';
import { api } from 'convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';

export default function AssetListScreen() {
  const assets = useQuery(api.assets.listAssets);
  const removeAsset = useMutation(api.assets.removeAsset);

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#dfe9f3', '#ffffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.left}>
          <Text style={styles.ticker}>{item.ticker}</Text>
          <Text style={styles.detail}>Buy: ${item.buyPrice.toFixed(2)}</Text>
          <Text style={styles.detail}>Qty: {item.quantity}</Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.price}>
            ${(item.buyPrice * item.quantity).toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={() => removeAsset({ id: item._id })}
            style={styles.deleteBtn}
          >
            <MaterialIcons name="delete" size={24} color="#d63031" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  if (!assets) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0984e3" />
        <Text style={styles.loadingText}>Loading your assets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📈 Your Portfolio</Text>
      <FlatList
        data={assets}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#f1f2f6',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#2d3436',
    textAlign: 'center',
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
  },
  left: {
    flex: 1,
  },
  ticker: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#2c3e50',
  },
  detail: {
    fontSize: 14,
    color: '#636e72',
  },
  right: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
  },
  deleteBtn: {
    marginTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#636e72',
  },
});
