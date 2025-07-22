import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = ({ navigation }) => {
  const { isSignedIn } = useAuth();
  const { startOAuthFlow: startGoogleAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleAuthFlow } = useOAuth({ strategy: "oauth_apple" });

  useEffect(() => {
    if (isSignedIn) {
      navigation.replace("Main");
    }
  }, [isSignedIn]);

  const handleOAuth = async (provider: "google" | "apple") => {
    try {
      const result = provider === "google"
        ? await startGoogleAuthFlow()
        : await startAppleAuthFlow();

      if (result?.createdSessionId) {
        await result.setActive({ session: result.createdSessionId });
        navigation.navigate("Main");
      } else {
        Alert.alert("Authentication", "No session created. Try again.");
      }
    } catch (err) {
      Alert.alert("Login Failed", err?.message || "Unknown error.");
    }
  };

  return (
    <LinearGradient colors={['#f5f7fa', '#c3cfe2']} style={styles.container}>
      <View style={styles.card}>
        <Image source={require("../assets/icons/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TouchableOpacity style={styles.buttonGoogle} onPress={() => handleOAuth("google")}>
          <Image source={require("../assets/icons/google.png")} style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonApple} onPress={() => handleOAuth("apple")}>
          <AntDesign name="apple1" size={24} color="black" />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 32,
    borderRadius: 24,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: 72,
    height: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2d3436",
  },
  subtitle: {
    fontSize: 14,
    color: "#636e72",
    marginBottom: 24,
  },
  buttonGoogle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dfe6e9",
    width: "100%",
    marginBottom: 16,
    justifyContent: "center",
  },
  buttonApple: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dfe6e9",
    width: "100%",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#2d3436",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
