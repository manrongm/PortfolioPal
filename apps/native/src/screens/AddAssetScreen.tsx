import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api"; // ✅ Or relative path: "../../../../packages/backend/convex/_generated/api"

const AddAssetScreen = () => {
  const [ticker, setTicker] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const addAsset = useMutation(api.assets.addAsset); // ✅ Use your mutation

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

      Alert.alert('✅ Success', `Asset ${ticker.toUpperCase()} added successfully!`);
      setTicker('');
      setBuyPrice('');
      setQuantity('');
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Failed', 'There was an error adding the asset.');
    }
  };

  const removeAsset = useMutation(api.assets.removeAsset);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Asset</Text>

      <TextInput
        placeholder="Ticker (e.g. AAPL, BTC)"
        style={styles.input}
        value={ticker}
        onChangeText={setTicker}
        autoCapitalize="characters"
      />

      <TextInput
        placeholder="Buy Price"
        style={styles.input}
        value={buyPrice}
        onChangeText={setBuyPrice}
        keyboardType="decimal-pad"
      />

      <TextInput
        placeholder="Quantity"
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddAsset}>
        <Text style={styles.buttonText}>➕ Add Asset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAssetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
