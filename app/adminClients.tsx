import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";
import { API_URL } from "./constants/api";

type Client = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  total_reservations: number;
};

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchClients = async () => {
    try {
      const response = await fetch(`${API_URL}/users/list.php`);
      const data = await response.json();

      if (data.success) {
        setClients(data.clients);
      }
    } catch (error) {
      console.log("CLIENTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) =>
    `${client.nom} ${client.prenom} ${client.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des clients</Text>

      <TextInput
        style={styles.search}
        placeholder="Rechercher par nom ou email..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.nom} {item.prenom}
            </Text>

            <Text style={styles.email}>{item.email}</Text>

            <Text style={styles.reservations}>
              Réservations : {item.total_reservations}
            </Text>

            {item.total_reservations >= 10 && (
              <Text style={styles.vip}>⭐ Client VIP</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push({
                  pathname: "/clientHistory",
                  params: {
                    user_id: item.id.toString(),
                    nom: item.nom,
                    prenom: item.prenom,
                  },
                })
              }
            >
              <Text style={styles.buttonText}>Voir historique</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun client trouvé</Text>
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
    marginBottom: 18,
  },

  search: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 15,
    color: "#fff",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  email: {
    color: "#CFCFCF",
    marginBottom: 8,
  },

  reservations: {
    color: "#fff",
    fontWeight: "bold",
  },

  vip: {
    color: "#FFD700",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 13,
    borderRadius: 16,
    marginTop: 14,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },

  empty: {
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
  },

  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});