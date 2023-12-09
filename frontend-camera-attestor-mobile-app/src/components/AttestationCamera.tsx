/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { PermissionsAndroid } from "react-native";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import { launchCamera } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import { View } from "react-native";
import { Button, Image, Text } from "@rneui/base";

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

const AttestationCamera = ({
  deviceWallet,
}: {
  deviceWallet: ethers.Wallet;
}) => {
  const [imageUri, setImageUri] = React.useState<string | null>(null);

  const handleOpenCamera = async () => {
    await requestLocationPermission();
    const response = await launchCamera({
      mediaType: "photo",
      saveToPhotos: false,
      includeBase64: true,
      includeExtra: true,
      quality: 0.1,
      maxHeight: 200,
      maxWidth: 200,
    });

    if (response.assets) {
      const { base64, uri } = response.assets[0];

      setImageUri(uri!);

      console.log("BASE64", base64);

      console.log("DEVICE WALLET", deviceWallet);

      deviceWallet.signMessage(JSON.stringify({ base64 })).then((signature) => {
        console.log("SIGNATURE", signature);
        // Geolocation.getCurrentPosition(
        //   (position) => {
        //     console.log("POSITION", position);
        //     // call the API
        //   },
        //   (error) => {
        //     // See error code charts below.
        //     console.log(error.code, error.message);
        //   },
        //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        // );
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
      <Text>Attestation Camera</Text>
      <Button onPress={handleOpenCamera}>Open Camera</Button>
      {imageUri && <Image source={{ uri: imageUri! }} />}
    </View>
  );
};

export default AttestationCamera;
