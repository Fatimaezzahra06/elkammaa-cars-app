import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { router } from "expo-router";
import logo from "../assets/logo.png";
import { API_URL } from "./constants/api";

type Car = {
  id: number;
  marque: string;
  modele: string;
  categorie?: string;
  annee: number;
  prix_par_jour: string;
  carburant: string;
  transmission: string;
  places: number;
  image: string;
};

export default function CarsScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars/list.php`);
      const data = await response.json();

      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.log("Erreur chargement voitures:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    `${car.marque} ${car.modele} ${car.categorie || ""}`
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
      <Image source={logo} style={styles.logo} />

      <Text style={styles.title}>Elkammaa Cars</Text>

      <TextInput
        style={styles.search}
        placeholder="Chercher par marque ou catégorie..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
          >
            <Image
              source={{
                uri: `http://192.168.1.24/uandi/uploads/cars/${item.image}`,
              }}
              style={styles.image}
            />

            <Text style={styles.name}>
              {item.marque} {item.modele}
            </Text>

            <Text style={styles.text}>
              Année : {item.annee}
            </Text>

            <Text style={styles.text}>
              Carburant : {item.carburant}
            </Text>

            <Text style={styles.text}>
              Transmission : {item.transmission}
            </Text>

            <Text style={styles.text}>
              Places : {item.places}
            </Text>

            <Text style={styles.price}>
              {item.prix_par_jour} DH / jour
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Aucune voiture trouvée
          </Text>
        }
      />

      <View style={styles.menu}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.menuText}>Cars</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/reservations")}
        >
          <Text style={styles.menuText}>Booking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "bold",
  },

  search: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    padding: 14,
    color: "#fff",
    marginBottom: 18,
  },

  list: {
    paddingBottom: 100,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  image: {
    width: "100%",
    height: 190,
    borderRadius: 18,
    marginBottom: 14,
    resizeMode: "cover",
  },

  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  text: {
    color: "#CFCFCF",
    marginBottom: 5,
    fontSize: 14,
  },

  price: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#fff",
    fontSize: 16,
  },

  menu: {
    position: "absolute",
    bottom: 18,
    left: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },

  menuText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  logo: {
    width: 190,
    height: 85,
    alignSelf: "center",
    marginBottom: 14,
    resizeMode: "cover",
    borderRadius: 24,
  },
});