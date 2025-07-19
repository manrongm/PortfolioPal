import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import { getAIInvestmentAdvice } from "../utils/openrouter";

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
    <View style={styles.container}>
      <Text style={styles.header}>🤖 AI Investment Advice</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0984e3" />
      ) : (
        <Text style={styles.advice}>{advice}</Text>
      )}
      <Button title="🔄 Refresh Advice" onPress={fetchAdvice} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  advice: {
    fontSize: 16,
    marginBottom: 30,
  },
});
