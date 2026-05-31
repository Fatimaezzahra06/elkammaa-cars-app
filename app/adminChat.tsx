import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { API_URL } from "./constants/api";

type Client = {
  user_id: number;
  nom: string;
  prenom: string;
  email: string;
};

export default function AdminChat() {

  const [clients, setClients] =
    useState<Client[]>([]);

  const fetchClients = async () => {

    try {

      const response = await fetch(
        `${API_URL}/messages/admin_list.php`
      );

      const data = await response.json();

      if (data.success) {

        setClients(data.clients);
      }

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Support Messages
      </Text>

      <FlatList
        data={clients}

        keyExtractor={(item) =>
          item.user_id.toString()
        }

        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/chat",
                params: {
                  user_id: item.user_id,
                },
              })
            }
          >

            <Text style={styles.name}>
              {item.nom} {item.prenom}
            </Text>

            <Text style={styles.email}>
              {item.email}
            </Text>

          </TouchableOpacity>
        )}
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
    marginBottom: 20,
  },

  card: {
    backgroundColor:
      "rgba(255,255,255,0.08)",

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.15)",

    borderRadius: 22,

    padding: 18,

    marginBottom: 14,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  email: {
    color: "#CFCFCF",
  },

});