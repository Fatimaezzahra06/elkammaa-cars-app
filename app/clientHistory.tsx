import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import { API_URL } from "./constants/api";

type Reservation = {
  id: number;
  marque: string;
  modele: string;
  date_debut: string;
  date_fin: string;
  montant_total: string;
  statut: string;
};

export default function ClientHistory() {

  const {
    user_id,
    nom,
    prenom,
  } = useLocalSearchParams();

  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchHistory = async () => {

    try {

      const response = await fetch(
        `${API_URL}/reservations/client_history.php?user_id=${user_id}`
      );

      const data = await response.json();

      if (data.success) {

        setReservations(
          data.reservations
        );
      }

    } catch (error) {

      console.log(
        "HISTORY ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {

    return (

      <View style={styles.center}>

        <ActivityIndicator
          size="large"
          color="#fff"
        />

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Historique Client
      </Text>

      <Text style={styles.subtitle}>
        {nom} {prenom}
      </Text>

      <FlatList
        data={reservations}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.car}>
              {item.marque} {item.modele}
            </Text>

            <Text style={styles.text}>
              Début :
              {" "}
              {item.date_debut}
            </Text>

            <Text style={styles.text}>
              Fin :
              {" "}
              {item.date_fin}
            </Text>

            <Text style={styles.price}>
              {item.montant_total} DH
            </Text>

            <Text style={styles.status}>
              {item.statut}
            </Text>

          </View>
        )}

        ListEmptyComponent={

          <Text style={styles.empty}>
            Aucune réservation
          </Text>

        }
      />

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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
  },

  card: {
    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.15)",

    borderRadius: 22,

    padding: 18,

    marginBottom: 16,
  },

  car: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    color: "#CFCFCF",
    marginBottom: 6,
  },

  price: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },

  status: {
    color: "#000",
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 12,
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