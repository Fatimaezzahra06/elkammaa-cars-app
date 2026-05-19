import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
 Image,
} from "react-native";

import { router } from "expo-router";
import logo from "../assets/logo.png";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Elkammaa Cars</Text>

      <Text style={styles.subtitle}>
        Louez votre voiture facilement et rapidement
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.outlineButton}
        onPress={() => router.push("/register")}
      >
        <Text style={styles.outlineText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.push("/cars")}
      >
        <Text style={styles.menuText}>Voir les voitures</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/cars")}>
          <Text style={styles.bottomText}>Cars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/reservations")}
        >
          <Text style={styles.bottomText}>Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.bottomText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 90,
  },

  logo: {
    width: 200,
    height: 90,
    alignSelf: "center",
    marginBottom: 25,
    borderRadius: 20,
    resizeMode: "cover",
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 8,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 18,
    marginBottom: 14,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 15,
    borderRadius: 18,
    marginBottom: 25,
  },

  outlineText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  menuButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 15,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  menuText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  bottomMenu: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderRadius: 30,
  },

  bottomText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});