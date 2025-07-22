import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getAIInvestmentAdvice } from '../utils/openrouter';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

export default function AIAdviceScreen() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    const result = await getAIInvestmentAdvice();
    setAdvice(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <Text style={styles.header}>🤖 AI Investment Advice</Text>

      <ScrollView contentContainerStyle={styles.inner}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="large" color="#6c5ce7" />
          ) : (
            <Text style={styles.advice}>{advice}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.refreshBtn} onPress={fetchAdvice}>
          <MaterialIcons name="refresh" size={20} color="#fff" />
          <Text style={styles.refreshText}>Refresh Advice</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2d3436',
  },
  inner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    minHeight: 160,
    justifyContent: 'center',
  },
  advice: {
    fontSize: 16,
    color: '#2d3436',
    lineHeight: 24,
  },
  refreshBtn: {
    marginTop: 30,
    backgroundColor: '#6c5ce7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
