import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@clerk/clerk-expo';

const screenWidth = Dimensions.get('window').width;

export default function DashboardScreen({ navigation }) {
  const { signOut } = useAuth();
  const assets = useQuery(api.assets.listAssets);

  const handleLogout = async () => {
    try {
      await signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (err) {
      Alert.alert('Logout Failed', err?.message || 'Something went wrong.');
    }
  };

  if (!assets) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0984e3" />
        <Text style={styles.loadingText}>Loading portfolio...</Text>
      </View>
    );
  }

  const totalValue = assets.reduce(
    (sum, asset) => sum + asset.buyPrice * asset.quantity,
    0
  );

  const colors = ['#6c5ce7', '#00cec9', '#fdcb6e', '#fab1a0', '#ff7675'];

  const data = assets.map((asset, index) => ({
    name: asset.ticker,
    population: asset.buyPrice * asset.quantity,
    color: colors[index % colors.length],
    legendFontColor: '#2d3436',
    legendFontSize: 14,
  }));

  return (
    <LinearGradient colors={['#fdfcfb', '#e2d1c3']} style={styles.container}>
      <Text style={styles.title}>Total Portfolio Value</Text>
      <Text style={styles.amount}>${totalValue.toFixed(2)}</Text>

      {data.length > 0 ? (
        <PieChart
          data={data}
          width={screenWidth - 40}
          height={240}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noAssetText}>No assets to display</Text>
      )}

      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>🚪 Log Out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(44, 62, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#0984e3',
  },
  chart: {
    marginTop: 10,
    borderRadius: 10,
  },
  noAssetText: {
    marginTop: 20,
    fontSize: 16,
    color: '#636e72',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#636e72',
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#d63031',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
