import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { router } from "expo-router";

export default function AdminDashboard() {

  return (

    <ScrollView style={styles.container}>

      {/* TITLE */}

      <Text style={styles.title}>
        Admin Dashboard
      </Text>

      <Text style={styles.subtitle}>
        Elkammaa Cars Management
      </Text>

      {/* STATS */}

      <View style={styles.statsContainer}>

        <View style={styles.card}>

          <Text style={styles.cardNumber}>
            12
          </Text>

          <Text style={styles.cardText}>
            Voitures
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.cardNumber}>
            8
          </Text>

          <Text style={styles.cardText}>
            Réservations
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.cardNumber}>
            5
          </Text>

          <Text style={styles.cardText}>
            Clients
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.cardNumber}>
            12000 DH
          </Text>

          <Text style={styles.cardText}>
            Revenus
          </Text>

        </View>

      </View>

      {/* BUTTONS */}

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/adminCars")
        }
      >

        <Text style={styles.buttonText}>
          Gestion des voitures
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/adminReservations")
        }
      >

        <Text style={styles.buttonText}>
          Gestion des réservations
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/adminClients")
        }
      >

        <Text style={styles.buttonText}>
          Gestion des clients
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/adminChat")
        }
      >

        <Text style={styles.buttonText}>
          Support Messages
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push("/adminAddCar")
        }
      >

        <Text style={styles.buttonText}>
          Ajouter une voiture
        </Text>

      </TouchableOpacity>

      {/* LOGOUT */}

      <TouchableOpacity
        style={styles.logout}
        onPress={() =>
          router.replace("/login")
        }
      >

        <Text style={styles.logoutText}>
          Déconnexion
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 35,
    fontSize: 16,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  card: {
    width: "48%",
    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.15)",

    borderRadius: 24,

    paddingVertical: 28,

    marginBottom: 16,

    alignItems: "center",
  },

  cardNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  cardText: {
    color: "#CFCFCF",
    fontSize: 14,
  },

  button: {
    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.15)",

    borderRadius: 22,

    paddingVertical: 18,

    marginBottom: 16,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  logout: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 18,
    marginTop: 20,
    marginBottom: 40,
  },

  logoutText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

});