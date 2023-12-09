/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { PermissionsAndroid } from "react-native";

import "react-native-get-random-values";
import "@ethersproject/shims";
import lighthouse from "@lighthouse-web3/sdk";

import { launchCamera } from "react-native-image-picker";
import Geolocation from "react-native-geolocation-service";
import { View } from "react-native";
import { Button, Input, Text } from "@rneui/base";
import axios from "axios";
import { ImageContext } from "../context/imageContext";
import PAGE_VALUES from "../constants/pagevalues";

import { LIGHTHOUSE_API_KEY } from "@env";

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
  const { setUri, setUuid, setBase64, bonsaiUrl, setBonsaiUrl } =
    React.useContext(ImageContext);

  const handleOpenCamera = async () => {
    await requestLocationPermission();

    const response = await launchCamera({
      mediaType: "photo",
      saveToPhotos: false,
      includeBase64: true,
      includeExtra: true,
      quality: 0.2,
      maxHeight: 200,
      maxWidth: 200,
    });

    if (response.assets) {
      const { base64, uri } = response.assets[0];

      setUri(uri);
      setBase64(base64);
      console.log("BASE64", base64);

      // upload to lighthouse
      const {
        data: { Hash: ipfsHash },
      } = await lighthouse.uploadText(
        JSON.stringify({ base64 }),
        LIGHTHOUSE_API_KEY
      );

      console.log("IPFS HASH", ipfsHash);

      console.log("DEVICE WALLET", deviceWallet);

      deviceWallet.signMessage(JSON.stringify({ base64 })).then((signature) => {
        console.log("SIGNATURE", signature);

        Geolocation.getCurrentPosition(
          (position) => {
            console.log("POSITION", position);

            console.log("INPUT REF", bonsaiUrl);

            axios
              .post(bonsaiUrl, {
                uuid: "",
                previousContent: ipfsHash,
                updatedContent: ipfsHash,
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
      <Text h2>Capture Image</Text>

      <Input value={bonsaiUrl} onChangeText={setBonsaiUrl} />

      <Button
        title="Dark"
        buttonStyle={{ backgroundColor: "rgba(39, 39, 39, 1)" }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
          borderRadius: 10,
        }}
        titleStyle={{ color: "white", marginHorizontal: 20 }}
        onPress={handleOpenCamera}
      >
        Open Camera
      </Button>
    </View>
  );
};

export default AttestationCamera;
