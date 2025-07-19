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
import { api } from 'convex/_generated/api'; // 确保路径正确

const AssetListScreen = () => {
  const assets = useQuery(api.assets.listAssets);
  const removeAsset = useMutation(api.assets.removeAsset);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.ticker}>{item.ticker}</Text>
        <Text style={styles.name}>Buy: ${item.buyPrice.toFixed(2)}</Text>
        <Text style={styles.name}>Qty: {item.quantity}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>
          Total: ${(item.buyPrice * item.quantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => removeAsset({ id: item._id })}
          style={{ marginTop: 8 }}
        >
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (assets === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Loading assets...</Text>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Assets</Text>
      <FlatList
        data={assets}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default AssetListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 2,
  },
  left: {
    flexDirection: 'column',
  },
  ticker: {
    fontSize: 18,
    fontWeight: '700',
  },
  name: {
    fontSize: 14,
    color: '#6c757d',
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
});