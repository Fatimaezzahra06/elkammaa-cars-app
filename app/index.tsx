import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {

  return (

    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      }}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        <Text style={styles.logo}>
          ELKAMMAA CARS
        </Text>

        <Text style={styles.title}>
          Luxury Car Rental
        </Text>

        <Text style={styles.subtitle}>
          Experience premium driving
          with the best luxury cars.
        </Text>

        {/* BUTTON CARS */}

        <TouchableOpacity
          onPress={() => router.push("/cars")}
        >

          <LinearGradient
            colors={["#ffffff", "#d9d9d9"]}
            style={styles.button}
          >

            <Text style={styles.buttonText}>
              Explorer les voitures
            </Text>

          </LinearGradient>

        </TouchableOpacity>

        {/* BUTTON LOGIN */}

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/login")}
        >

          <Text style={styles.secondaryText}>
            Se connecter
          </Text>

        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.70)",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  logo: {
    color: "#fff",
    fontSize: 18,
    letterSpacing: 4,
    marginBottom: 20,
    textAlign: "center",
  },

  title: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },

  subtitle: {
    color: "#d1d1d1",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 50,
  },

  button: {
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 18,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
  },

  secondaryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});