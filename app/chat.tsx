import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./constants/api";

type Message = {
  id: number;
  sender: string;
  message: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  const loadUser = async () => {
    const id = await AsyncStorage.getItem("userId");

    if (id) {
      setUserId(id);
      fetchMessages(id);
    }
  };

  const fetchMessages = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/messages/list.php?user_id=${id}`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log("FETCH MESSAGE ERROR:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) {
      Alert.alert("Erreur", "Écrivez un message");
      return;
    }

    if (!userId) {
      Alert.alert("Erreur", "Utilisateur introuvable");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/messages/send.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          `user_id=${encodeURIComponent(userId)}` +
          `&sender=client` +
          `&message=${encodeURIComponent(message)}`,
      });

      const data = await response.json();

      if (data.success) {
        setMessage("");
        fetchMessages(userId);
      } else {
        Alert.alert("Erreur", data.message);
      }
    } catch (error) {
      console.log("SEND MESSAGE ERROR:", error);
      Alert.alert("Erreur", "Message non envoyé");
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/messages/delete.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${encodeURIComponent(id.toString())}`,
      });

      const data = await response.json();

      if (data.success) {
        fetchMessages(userId);
      } else {
        Alert.alert("Erreur", "Message non supprimé");
      }
    } catch (error) {
      console.log("DELETE MESSAGE ERROR:", error);
      Alert.alert("Erreur", "Impossible de supprimer");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

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
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Support Chat</Text>

          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageBox,
                  item.sender === "client"
                    ? styles.clientMessage
                    : styles.adminMessage,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.sender === "client"
                      ? styles.clientText
                      : styles.adminText,
                  ]}
                >
                  {item.message}
                </Text>

                <TouchableOpacity onPress={() => deleteMessage(item.id)}>
                  <Text
                    style={[
                      styles.delete,
                      item.sender === "client"
                        ? styles.deleteClient
                        : styles.deleteAdmin,
                    ]}
                  >
                    Supprimer
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.empty}>Aucun message pour le moment</Text>
            }
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Écrire un message..."
              placeholderTextColor="#999"
              value={message}
              onChangeText={setMessage}
              multiline
            />

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 1,
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

  list: {
    paddingBottom: 120,
  },

  messageBox: {
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    maxWidth: "82%",
  },

  clientMessage: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },

  adminMessage: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
  },

  messageText: {
    fontSize: 15,
    fontWeight: "500",
  },

  clientText: {
    color: "#000",
  },

  adminText: {
    color: "#fff",
  },

  delete: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
  },

  deleteClient: {
    color: "#B00020",
  },

  deleteAdmin: {
    color: "#ff7777",
  },

  empty: {
    color: "#CFCFCF",
    textAlign: "center",
    marginTop: 40,
  },

  inputContainer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  input: {
    flex: 1,
    minHeight: 56,
    maxHeight: 110,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: "#fff",
    fontSize: 15,
  },

  sendButton: {
    backgroundColor: "#fff",
    height: 56,
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 22,
  },

  sendText: {
    color: "#000",
    fontWeight: "bold",
  },
});