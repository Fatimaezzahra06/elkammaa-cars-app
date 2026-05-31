import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";

import { router } from "expo-router";
import { API_URL } from "./constants/api";

type Reservation = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  marque: string;
  modele: string;
  date_debut: string;
  date_fin: string;
  statut: string;
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`${API_URL}/reservations/list_admin.php`);
      const data = await response.json();

      if (data.success) {
        setReservations(data.reservations);
      }
    } catch (error) {
      console.log("FETCH RESERVATIONS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, statut: string) => {
    try {
      const response = await fetch(`${API_URL}/reservations/update_status.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${id}&status=${encodeURIComponent(statut)}`,
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert("Succès", "Statut modifié");
        fetchReservations();
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.log("UPDATE STATUS ERROR:", error);
      Alert.alert("Erreur", "Impossible de modifier le statut");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réservations</Text>

      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.nom} {item.prenom}
            </Text>

            <Text style={styles.text}>{item.email}</Text>
            <Text style={styles.text}>
              {item.marque} {item.modele}
            </Text>
            <Text style={styles.text}>Début : {item.date_debut}</Text>
            <Text style={styles.text}>Fin : {item.date_fin}</Text>

            <Text style={styles.status}>Statut : {item.statut}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => updateStatus(item.id, "confirmé")}
              >
                <Text style={styles.buttonText}>Confirmer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => updateStatus(item.id, "annulé")}
              >
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune réservation trouvée</Text>
        }
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/admin")}
      >
        <Text style={styles.backText}>Retour Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 55,
    paddingHorizontal: 16,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 22,
    padding: 16,
    marginBottom: 18,
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  text: {
    color: "#CFCFCF",
    marginBottom: 4,
  },

  status: {
    color: "#fff",
    marginTop: 10,
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  confirmButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 16,
    width: "48%",
  },

  cancelButton: {
    backgroundColor: "#444",
    paddingVertical: 12,
    borderRadius: 16,
    width: "48%",
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },

  cancelText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    paddingVertical: 16,
    borderRadius: 20,
    marginVertical: 20,
  },

  backText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },

  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});