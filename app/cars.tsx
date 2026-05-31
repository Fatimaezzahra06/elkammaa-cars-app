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
    <View style={styles.background}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />

        <Text style={styles.brand}>ELKAMMAA CARS</Text>

        <Text style={styles.title}>Luxury Cars</Text>

        <Text style={styles.subtitle}>
          Choose your perfect car for a premium driving experience.
        </Text>

        <TextInput
          style={styles.search}
          placeholder="Chercher par marque..."
          placeholderTextColor="#CFCFCF"
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredCars}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{
                  uri: `http://192.168.1.24/uandi/uploads/cars/${item.image}`,
                }}
                style={styles.image}
              />

              <Text style={styles.name}>
                {item.marque} {item.modele}
              </Text>

              <View style={styles.infoRow}>
                <Text style={styles.info}>Année : {item.annee}</Text>
                <Text style={styles.info}>Places : {item.places}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.info}>{item.carburant}</Text>
                <Text style={styles.info}>{item.transmission}</Text>
              </View>

              <Text style={styles.price}>
                {item.prix_par_jour} DH / jour
              </Text>

              <TouchableOpacity
                style={styles.reserveButton}
                onPress={() =>
                  router.push({
                    pathname: "/reservations",
                    params: {
                      id: item.id.toString(),
                      marque: item.marque,
                      modele: item.modele,
                      prix: item.prix_par_jour,
                      image: item.image,
                    },
                  })
                }
              >
                <Text style={styles.reserveText}>Réserver maintenant</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucune voiture trouvée</Text>
          }
        />

        <View style={styles.menu}>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.menuText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.menuTextActive}>Cars</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/reservations")}>
            <Text style={styles.menuText}>Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#050505",
  },

  container: {
    flex: 1,
    paddingTop: 45,
    paddingHorizontal: 18,
  },

  logo: {
    width: 170,
    height: 75,
    alignSelf: "center",
    marginBottom: 10,
    resizeMode: "cover",
    borderRadius: 22,
  },

  brand: {
    color: "#fff",
    fontSize: 14,
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 8,
  },

  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#d1d1d1",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },

  search: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    borderRadius: 20,
    padding: 15,
    color: "#fff",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 125,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 28,
    padding: 14,
    marginBottom: 22,
  },

  image: {
    width: "100%",
    height: 195,
    borderRadius: 24,
    marginBottom: 15,
    resizeMode: "cover",
  },

  name: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },

  info: {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 14,
    fontSize: 13,
  },

  price: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 8,
  },

  reserveButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 18,
    marginTop: 15,
  },

  reserveText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
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
    left: 18,
    right: 18,
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },

  menuText: {
    color: "#CFCFCF",
    fontWeight: "bold",
    fontSize: 14,
  },

  menuTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#050505",
  },
});