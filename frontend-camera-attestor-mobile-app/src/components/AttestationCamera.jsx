/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { PermissionsAndroid } from "react-native";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { v4 as uuid } from "uuid";

import { launchCamera } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import { View } from "react-native";
import { Button, Image, Input, Text } from "@rneui/base";
import axios from "axios";

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Example App",
        message: "Example App access to your location",
        buttonPositive: "Ok",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
    } else {
      console.log("location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

const AttestationCamera = ({ deviceWallet }) => {
  const [inputValue, setInputValue] = React.useState("");
  const [imageUri, setImageUri] = React.useState(null);

  const handleOpenCamera = async () => {
    await requestLocationPermission();
    const response = await launchCamera({
      mediaType: "photo",
      saveToPhotos: false,
      includeBase64: true,
      includeExtra: true,
      quality: 0.5,
      maxHeight: 400,
      maxWidth: 400,
    });

    if (response.assets) {
      const { base64, uri } = response.assets[0];

      setImageUri(uri);

      console.log("BASE64", base64);

      console.log("DEVICE WALLET", deviceWallet);

      deviceWallet.signMessage(JSON.stringify({ base64 })).then((signature) => {
        console.log("SIGNATURE", signature);
        Geolocation.getCurrentPosition(
          (position) => {
            console.log("POSITION", position);

            console.log("INPUT REF", inputValue);

            axios.post(inputValue, {
              uuid: "",
              previousContent: base64,
              updatedContent: base64,
              proof: "",
              operation: "capture",
            });
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Input value={inputValue} onChangeText={setInputValue} />
      <Text>Attestation Camera</Text>
      <Button onPress={handleOpenCamera}>Open Camera</Button>
      {imageUri && <Image source={{ uri: imageUri }} />}
    </View>
  );
};

export default AttestationCamera;
