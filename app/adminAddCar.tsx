import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import { API_URL } from "./constants/api";

export default function AdminAddCar() {

  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("");
  const [prix, setPrix] = useState("");
  const [carburant, setCarburant] = useState("");
  const [transmission, setTransmission] = useState("");
  const [places, setPlaces] = useState("");

  const [image, setImage] = useState<any>(null);

  // PICK IMAGE

  const pickImage = async () => {

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        quality: 0.8,

      });

    if (!result.canceled) {

      setImage(result.assets[0]);
    }
  };

  // UPLOAD IMAGE

  const uploadImage = async () => {

    if (!image) return "";

    const formData = new FormData();

    formData.append("image", {

      uri: image.uri,
      name: "car.jpg",
      type: "image/jpeg",

    } as any);

    const response = await fetch(
      `${API_URL}/cars/upload.php`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {

      return data.image;

    } else {

      return "";
    }
  };

  // ADD CAR

  const handleAddCar = async () => {

    if (!marque || !modele || !prix) {

      Alert.alert(
        "Erreur",
        "Remplissez les champs obligatoires"
      );

      return;
    }

    try {

      // upload image first

      const imageName = await uploadImage();

      // save car

      const response = await fetch(
        `${API_URL}/cars/add.php`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body:
            `marque=${encodeURIComponent(marque)}` +
            `&modele=${encodeURIComponent(modele)}` +
            `&annee=${encodeURIComponent(annee)}` +
            `&prix_par_jour=${encodeURIComponent(prix)}` +
            `&carburant=${encodeURIComponent(carburant)}` +
            `&transmission=${encodeURIComponent(transmission)}` +
            `&places=${encodeURIComponent(places)}` +
            `&image=${encodeURIComponent(imageName)}`,
        }
      );

      const data = await response.json();

      if (data.success) {

        Alert.alert(
          "Succès",
          "Voiture ajoutée"
        );

        router.replace("/adminCars");

      } else {

        Alert.alert(
          "Erreur",
          data.message
        );
      }

    } catch (error) {

      console.log("ADD ERROR:", error);

      Alert.alert(
        "Erreur",
        "Impossible d'ajouter"
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Ajouter voiture
      </Text>

      {/* IMAGE */}

      <TouchableOpacity
        style={styles.imagePicker}
        onPress={pickImage}
      >

        {image ? (

          <Image
            source={{ uri: image.uri }}
            style={styles.preview}
          />

        ) : (

          <Text style={styles.imageText}>
            Choisir une image
          </Text>
        )}

      </TouchableOpacity>

      {/* INPUTS */}

      <TextInput
        style={styles.input}
        placeholder="Marque"
        placeholderTextColor="#999"
        value={marque}
        onChangeText={setMarque}
      />

      <TextInput
        style={styles.input}
        placeholder="Modèle"
        placeholderTextColor="#999"
        value={modele}
        onChangeText={setModele}
      />

      <TextInput
        style={styles.input}
        placeholder="Année"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={annee}
        onChangeText={setAnnee}
      />

      <TextInput
        style={styles.input}
        placeholder="Prix par jour"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={prix}
        onChangeText={setPrix}
      />

      <TextInput
        style={styles.input}
        placeholder="Carburant"
        placeholderTextColor="#999"
        value={carburant}
        onChangeText={setCarburant}
      />

      <TextInput
        style={styles.input}
        placeholder="Transmission"
        placeholderTextColor="#999"
        value={transmission}
        onChangeText={setTransmission}
      />

      <TextInput
        style={styles.input}
        placeholder="Places"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={places}
        onChangeText={setPlaces}
      />

      {/* BUTTON */}

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddCar}
      >
        <Text style={styles.buttonText}>
          Ajouter
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 55,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },

  imagePicker: {
    height: 190,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    overflow: "hidden",
  },

  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  imageText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    color: "#fff",
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 40,
  },

  buttonText: {
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

});