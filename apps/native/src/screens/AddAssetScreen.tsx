import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { LinearGradient } from 'expo-linear-gradient';

const AddAssetScreen = () => {
  const [ticker, setTicker] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const addAsset = useMutation(api.assets.addAsset);

  const handleAddAsset = async () => {
    if (!ticker || !buyPrice || !quantity) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      await addAsset({
        ticker: ticker.toUpperCase().trim(),
        buyPrice: parseFloat(buyPrice),
        quantity: parseFloat(quantity),
      });
      Alert.alert('✅ Success', `${ticker.toUpperCase()} added!`);
      setTicker('');
      setBuyPrice('');
      setQuantity('');
    } catch (error) {
      Alert.alert('❌ Failed', 'Error adding asset.');
    }
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>➕ Add New Asset</Text>

          <View style={styles.card}>
            <TextInput
              placeholder="Ticker (e.g. AAPL)"
              value={ticker}
              onChangeText={setTicker}
              style={styles.input}
              autoCapitalize="characters"
            />
            <TextInput
              placeholder="Buy Price"
              value={buyPrice}
              onChangeText={setBuyPrice}
              style={styles.input}
              keyboardType="decimal-pad"
            />
            <TextInput
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              style={styles.input}
              keyboardType="decimal-pad"
            />
            <TouchableOpacity style={styles.button} onPress={handleAddAsset}>
              <Text style={styles.buttonText}>✅ Confirm Add</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AddAssetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingTop: 80,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,
    color: '#2d3436',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 18,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#0984e3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
