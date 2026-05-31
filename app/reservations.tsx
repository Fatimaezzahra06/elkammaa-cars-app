import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./constants/api";

export default function ReservationsScreen() {
  const { id, marque, modele, prix, image } = useLocalSearchParams();

  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");

  const handleBooking = async () => {
    if (!nom || !telephone || !dateDebut || !dateFin) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      const userId = await AsyncStorage.getItem("userId");

      if (!userId || !id) {
        Alert.alert("Erreur", "Utilisateur ou voiture introuvable");
        return;
      }

      const response = await fetch(`${API_URL}/reservations/create.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          `user_id=${encodeURIComponent(userId)}` +
          `&car_id=${encodeURIComponent(String(id))}` +
          `&date_debut=${encodeURIComponent(dateDebut)}` +
          `&date_fin=${encodeURIComponent(dateFin)}`,
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Succès", "Votre réservation a été confirmée");
        router.push("/cars");
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.log("BOOKING ERROR:", error);
      Alert.alert("Erreur", "Impossible de créer la réservation");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.brand}>ELKAMMAA CARS</Text>
          <Text style={styles.title}>Booking</Text>
          <Text style={styles.subtitle}>Confirm your luxury reservation</Text>

          <View style={styles.card}>
            {image && (
              <Image
                source={{
                  uri: `http://192.168.1.24/uandi/uploads/cars/${image}`,
                }}
                style={styles.carImage}
              />
            )}

            <Text style={styles.carName}>
              {marque} {modele}
            </Text>

            <Text style={styles.price}>{prix} DH / jour</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nom complet"
            placeholderTextColor="#999"
            value={nom}
            onChangeText={setNom}
          />

          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />

          <TextInput
            style={styles.input}
            placeholder="Date début ex: 2026-05-20"
            placeholderTextColor="#999"
            value={dateDebut}
            onChangeText={setDateDebut}
          />

          <TextInput
            style={styles.input}
            placeholder="Date fin ex: 2026-05-25"
            placeholderTextColor="#999"
            value={dateFin}
            onChangeText={setDateFin}
          />

          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Confirmer réservation</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/cars")}>
            <Text style={styles.back}>Retour aux voitures</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  keyboard: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.78)",
  },

  container: {
    flexGrow: 1,
    padding: 22,
    justifyContent: "center",
    paddingBottom: 50,
  },

  brand: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#CFCFCF",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 28,
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 28,
    padding: 14,
    marginBottom: 24,
  },

  carImage: {
    width: "100%",
    height: 200,
    borderRadius: 22,
    resizeMode: "cover",
    marginBottom: 15,
  },

  carName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  price: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 16,
    color: "#fff",
    marginBottom: 16,
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 17,
    borderRadius: 20,
    marginTop: 8,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  back: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
    fontSize: 15,
  },
});