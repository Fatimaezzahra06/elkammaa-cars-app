import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { router } from "expo-router";
import { API_URL } from "./constants/api";

export default function RegisterScreen() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nom || !prenom || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/register.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          `nom=${encodeURIComponent(nom)}` +
          `&prenom=${encodeURIComponent(prenom)}` +
          `&email=${encodeURIComponent(email)}` +
          `&password=${encodeURIComponent(password)}`,
      });

      const text = await response.text();
      console.log("REGISTER RESPONSE:", text);

      const data = JSON.parse(text);

      if (data.success) {
        Alert.alert("Succès", "Compte créé avec succès");
        router.replace("/login");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      Alert.alert("Erreur", "Register API ou JSON invalide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <Text style={styles.subtitle}>
        Inscription sur Elkammaa Cars
      </Text>

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre nom"
        placeholderTextColor="#999"
        value={nom}
        onChangeText={setNom}
      />

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre prénom"
        placeholderTextColor="#999"
        value={prenom}
        onChangeText={setPrenom}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: test@gmail.com"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer votre mot de passe"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Inscription..." : "S'inscrire"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>J'ai déjà un compte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000",
    paddingHorizontal: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#BDBDBD",
    marginBottom: 30,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#fff",
    fontWeight: "600",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    padding: 15,
    marginBottom: 16,
    color: "#fff",
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});