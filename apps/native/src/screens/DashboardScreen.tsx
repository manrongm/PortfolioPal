import React from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useQuery } from 'convex/react';
import { api } from 'convex/_generated/api';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = () => {
  const assets = useQuery(api.assets.listAssets); // 获取实时数据

  if (!assets) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading portfolio...</Text>
      </View>
    );
  }

  const totalValue = assets.reduce((sum, asset) => {
    return sum + asset.buyPrice * asset.quantity;
  }, 0);

  const colors = ['#600080', '#9900cc', '#c61aff', '#ff99cc', '#00cec9', '#fab1a0', '#ffeaa7'];

  const data = assets.map((asset, index) => ({
    name: asset.ticker,
    population: asset.buyPrice * asset.quantity,
    color: colors[index % colors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 14,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Value</Text>
      <Text style={styles.amount}>${totalValue.toFixed(2)}</Text>
      {data.length > 0 ? (
        <PieChart
          data={data}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={{ marginTop: 20 }}>No assets to display</Text>
      )}
    </View>
  );
};

export default DashboardScreen;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#00b894',
  },
});
