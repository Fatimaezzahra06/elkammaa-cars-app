import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Reservation = {
  id: number;
  car: string;
  date: string;
  prix: string;
  status: string;
};

export default function ProfileScreen() {

  const [email, setEmail] =
    useState("");

  const [reservations, setReservations] =
    useState<Reservation[]>([]);

  useEffect(() => {

    const loadUser = async () => {

      const savedEmail =
        await AsyncStorage.getItem(
          "userEmail"
        );

      if (savedEmail) {
        setEmail(savedEmail);
      }
    };

    loadUser();

  }, []);

  const totalReservations =
    reservations.length;

  const bonusUnlocked =
    totalReservations >= 10;

  const rest =
    10 - totalReservations;

  return (

    <ImageBackground
      source={{
        uri:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
      }}

      style={styles.background}

      resizeMode="cover"
    >

      <View style={styles.container}>

        {/* TITLE */}

        <Text style={styles.title}>
          Profile
        </Text>

        <Text style={styles.subtitle}>
          Bienvenue sur Elkammaa Cars
        </Text>

        {/* PROFILE */}

        <View style={styles.profileCard}>

          <Text style={styles.name}>
            Client Elkammaa
          </Text>

          <Text style={styles.email}>
            {email ||
              "Email non trouvé"}
          </Text>

          <View style={styles.statsRow}>

            <View style={styles.statBox}>

              <Text
                style={styles.statNumber}
              >
                {totalReservations}
              </Text>

              <Text style={styles.statText}>
                Réservations
              </Text>

            </View>

            <View style={styles.statBox}>

              <Text
                style={styles.statNumber}
              >
                {bonusUnlocked
                  ? "Oui"
                  : "Non"}
              </Text>

              <Text style={styles.statText}>
                Bonus
              </Text>

            </View>

          </View>

        </View>

        {/* BONUS */}

        <View style={styles.bonusCard}>

          <Text style={styles.bonusTitle}>
            Programme fidélité
          </Text>

          <Text style={styles.bonusText}>

            {bonusUnlocked

              ? "Félicitations! Vous avez débloqué un bonus spécial."

              : `Encore ${rest} réservation(s) pour débloquer votre bonus.`}

          </Text>

          <View style={styles.progressBar}>

            <View
              style={[
                styles.progress,
                {
                  width:
                    `${Math.min(
                      totalReservations * 10,
                      100
                    )}%`,
                },
              ]}
            />

          </View>

          <Text style={styles.progressText}>
            {totalReservations}/10 réservations
          </Text>

        </View>

        {/* HISTORY */}

        <Text style={styles.sectionTitle}>
          Historique des réservations
        </Text>

        <FlatList
          data={reservations}

          keyExtractor={(item) =>
            item.id.toString()
          }

          contentContainerStyle={
            styles.list
          }

          renderItem={({ item }) => (

            <View
              style={styles.reservationCard}
            >

              <View>

                <Text
                  style={styles.carName}
                >
                  {item.car}
                </Text>

                <Text style={styles.date}>
                  {item.date}
                </Text>

              </View>

              <View style={styles.right}>

                <Text style={styles.prix}>
                  {item.prix}
                </Text>

                <Text style={styles.status}>
                  {item.status}
                </Text>

              </View>

            </View>
          )}

          ListEmptyComponent={

            <Text style={styles.empty}>
              Aucune réservation
              pour le moment
            </Text>

          }
        />

        {/* CHAT */}

        <TouchableOpacity
          style={styles.chatButton}

          onPress={() =>
            router.push("/chat")
          }
        >

          <Text style={styles.chatText}>
            Support Chat
          </Text>

        </TouchableOpacity>

        {/* MENU */}

        <View style={styles.menu}>

          <TouchableOpacity
            onPress={() =>
              router.push("/")
            }
          >

            <Text style={styles.menuText}>
              Home
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push("/cars")
            }
          >

            <Text style={styles.menuText}>
              Cars
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              router.push(
                "/reservations"
              )
            }
          >

            <Text style={styles.menuText}>
              Booking
            </Text>

          </TouchableOpacity>

          <TouchableOpacity>

            <Text
              style={
                styles.menuTextActive
              }
            >
              Profile
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.78)",

    paddingTop: 55,

    paddingHorizontal: 18,
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
    marginTop: 6,
    marginBottom: 24,
  },

  profileCard: {
    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.16)",

    borderRadius: 26,

    padding: 20,

    marginBottom: 18,
  },

  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  email: {
    color: "#BDBDBD",
    marginTop: 6,
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
  },

  statBox: {
    flex: 1,

    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderRadius: 20,

    padding: 16,

    alignItems: "center",
  },

  statNumber: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  statText: {
    color: "#BDBDBD",
    marginTop: 4,
  },

  bonusCard: {
    backgroundColor: "#fff",
    borderRadius: 26,
    padding: 18,
    marginBottom: 22,
  },

  bonusTitle: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  bonusText: {
    color: "#333",
    marginBottom: 14,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#DDD",
    borderRadius: 20,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 20,
  },

  progressText: {
    color: "#000",
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "right",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },

  list: {
    paddingBottom: 220,
  },

  reservationCard: {
    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.14)",

    borderRadius: 22,

    padding: 16,

    marginBottom: 14,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  carName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  date: {
    color: "#BDBDBD",
    marginTop: 5,
  },

  right: {
    alignItems: "flex-end",
  },

  prix: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  status: {
    color: "#000",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "bold",
  },

  empty: {
    color: "#BDBDBD",
    textAlign: "center",
    marginTop: 25,
  },

  chatButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 120,
  },

  chatText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  menu: {
    position: "absolute",
    bottom: 18,
    left: 18,
    right: 18,

    backgroundColor:
      "rgba(255,255,255,0.08)",

    flexDirection: "row",

    justifyContent: "space-around",

    paddingVertical: 16,

    borderRadius: 30,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.15)",
  },

  menuText: {
    color: "#BDBDBD",
    fontWeight: "bold",
    fontSize: 14,
  },

  menuTextActive: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

});