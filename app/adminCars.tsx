import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { router } from "expo-router";
import { API_URL } from "./constants/api";

type Car = {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  prix_par_jour: string;
  carburant: string;
  transmission: string;
  places: number;
  image?: string;
};

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars/list.php`);
      const data = await response.json();

      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.log("FETCH CARS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (id: number) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous supprimer cette voiture ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/cars/delete.php`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `id=${id}`,
              });

              const data = await response.json();

              if (data.success) {
                Alert.alert("Succès", "Voiture supprimée");
                fetchCars();
              } else {
                Alert.alert("Erreur", data.message);
              }
            } catch (error) {
              console.log("DELETE ERROR:", error);
              Alert.alert("Erreur", "Impossible de supprimer");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchCars();
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
      <Text style={styles.title}>Gestion des voitures</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/adminAddCar")}
      >
        <Text style={styles.addText}>Ajouter une voiture</Text>
      </TouchableOpacity>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image ? (
              <Image
                source={{
                  uri: `http://192.168.1.24/uandi/uploads/cars/${item.image}`,
                }}
                style={styles.image}
              />
            ) : null}

            <Text style={styles.name}>
              {item.marque} {item.modele}
            </Text>

            <Text style={styles.text}>Année : {item.annee}</Text>
            <Text style={styles.text}>Carburant : {item.carburant}</Text>
            <Text style={styles.text}>Transmission : {item.transmission}</Text>
            <Text style={styles.text}>Places : {item.places}</Text>

            <Text style={styles.price}>
              {item.prix_par_jour} DH / jour
            </Text>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteCar(item.id)}
            >
              <Text style={styles.deleteText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucune voiture trouvée</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },

  addButton: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 18,
    marginBottom: 18,
  },

  addText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  list: {
    paddingBottom: 100,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 24,
    padding: 14,
    marginBottom: 18,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 18,
    resizeMode: "cover",
    marginBottom: 12,
  },

  name: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },

  text: {
    color: "#CFCFCF",
    marginBottom: 4,
  },

  price: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 8,
  },

  deleteButton: {
    backgroundColor: "#fff",
    paddingVertical: 13,
    borderRadius: 16,
    marginTop: 14,
  },

  deleteText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },

  backButton: {
    position: "absolute",
    bottom: 18,
    left: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    paddingVertical: 15,
    borderRadius: 22,
  },

  backText: {
    color: "#fff",
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