/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Image, PermissionsAndroid } from "react-native";

import "react-native-get-random-values";
import "@ethersproject/shims";

import { launchCamera } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import { View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import axios from "axios";
import { ImageContext } from "../context/imageContext";
import PAGE_VALUES from "../constants/pagevalues";

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

const AttestationCamera = ({ deviceWallet, setPage }) => {
  const { setUri, setUuid, setBase64, rollupUrl } =
    React.useContext(ImageContext);

  const handleOpenCamera = async () => {
    await requestLocationPermission();

    const response = await launchCamera({
      mediaType: "photo",
      saveToPhotos: false,
      includeBase64: true,
      includeExtra: true,
      quality: 0.4,
      maxHeight: 250,
      maxWidth: 250,
    });

    if (response.assets) {
      const { base64, uri } = response.assets[0];

      setUri(uri);
      setBase64(base64);

      console.log("BASE64", base64);

      console.log("DEVICE WALLET", deviceWallet);

      deviceWallet.signMessage(JSON.stringify({ base64 })).then((signature) => {
        console.log("SIGNATURE", signature);

        Geolocation.getCurrentPosition(
          (position) => {
            console.log("POSITION", position);

            console.log("ROLLUP URL", rollupUrl);

            axios
              .post(rollupUrl, {
                uuid: "",
                previousContent: base64,
                updatedContent: base64,
                proof: "",
                operation: "capture",
              })
              .then((response) => {
                console.log("RESPONSE -> UUID", response.data.uuid);
                console.log(
                  "RESPONSE -> UPDATED CONTENT",
                  response.data.updatedContent
                );

                setBase64(response.data.updatedContent);
                setUuid(response.data.uuid);
                setPage(PAGE_VALUES.editor);
              })
              .catch((error) => {
                console.log("ERROR", error);
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
        backgroundColor: "#fff",
      }}
    >
      <Text h1 style={{ fontSize: 45, fontFamily: "Poppins-Regular" }}>
        PixelPolice
      </Text>

      <Image
        style={{ height: "42%", width: "85%", marginVertical: 20 }}
        source={require("../assets/logo.jpg")}
      />

      <Text
        h4
        h4Style={{
          textAlign: "center",
          fontSize: 24,
          width: "60%",
          fontWeight: 400,
          fontFamily: "Poppins-Regular",
        }}
      >
        ZK-powered content authentication
      </Text>

      <Button
        title="Open Camera"
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
        containerStyle={{
          marginHorizontal: 50,
          marginTop: 60,
          marginBottom: 15,
          borderRadius: 10,
        }}
        titleStyle={{ color: "white", marginHorizontal: 20 }}
        onPress={handleOpenCamera}
      >
        <Image
          style={{ height: 55, width: 55 }}
          source={require("../assets/camera.jpg")}
        />
      </Button>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontFamily: "Poppins-Regular",
        }}
      >
        Open Camera to get started
      </Text>
    </View>
  );
};

export default AttestationCamera;
