import React from "react";
import { Image, View, ActivityIndicator } from "react-native";
import { Button, Text } from "@rneui/base";
import axios from "axios";

import { ImageContext } from "../context/imageContext";
import PAGE_VALUES from "../constants/pagevalues";
import CustomButton from "./CustomButton";

const IMAGE_OPEARTIONS = {
  INVERT_COLOR: "invert",
  INCREASE_BRIGHTNESS: "increase_brightness",
  DECREASE_BRIGHTNESS: "decrease_brightness",
  FLIP: "flip",
};

const BUTTON_DATA = [
  {
    title: "Invert",
    operation: IMAGE_OPEARTIONS.INVERT_COLOR,
    imageSource: require("../assets/invert.jpg"),
  },
  {
    title: "Increase Brightness",
    operation: IMAGE_OPEARTIONS.INCREASE_BRIGHTNESS,
    imageSource: require("../assets/inc-brightness.jpg"),
  },
  {
    title: "Decrease Brightness",
    operation: IMAGE_OPEARTIONS.DECREASE_BRIGHTNESS,
    imageSource: require("../assets/dec-brightness.jpg"),
  },
  {
    title: "Flip",
    operation: IMAGE_OPEARTIONS.FLIP,
    imageSource: require("../assets/vert-flip.jpg"),
  },
];

const ImageEditor = ({ setPage }) => {
  const { uri, uuid, base64, rollupUrl, setBase64 } =
    React.useContext(ImageContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleImageOperation = async (operation) => {
    setIsLoading(true);
    try {
      console.log("OPERATION", operation);
      console.log("UUID", uuid);

      if (!base64 || !uuid) return;

      const response = await axios.post(rollupUrl, {
        uuid,
        previousContent: base64,
        updatedContent: base64,
        proof: "",
        operation,
      });

      console.log("RESPONSE", response);

      if (response.data.updatedContent) {
        console.log("UPDATED IMAGE", response.data.updatedContent);
        setBase64(response.data.updatedContent);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Button
          buttonStyle={{ backgroundColor: "rgb(255, 255, 255)" }}
          containerStyle={{
            width: 40,
          }}
          onPress={() => {
            setPage(PAGE_VALUES.camera);
          }}
        >
          <Image
            style={{
              height: 35,
              width: 35,
              backgroundColor: "rgba(1, 1, 1)",
              borderRadius: 10,
            }}
            source={require("../assets/back-arrow.jpg")}
          />
        </Button>

        <Button
          buttonStyle={{ fontSize: 24 }}
          containerStyle={{
            borderRadius: 10,
            marginLeft: 280,
          }}
          onPress={() => {
            // TODO: Add share logic here
            setPage(PAGE_VALUES.camera);
          }}
        >
          Share
        </Button>
      </View>

      {base64 && (
        <Image
          style={{
            height: 320,
            width: 375,
            borderRadius: 10,
            marginVertical: 70,
          }}
          source={{ uri: `data:image/jpeg;base64,${base64}` }}
        />
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {BUTTON_DATA.map((buttonData) => (
          <CustomButton
            key={buttonData.title} // Added key prop for list rendering
            imageSource={buttonData.imageSource}
            onPress={() => handleImageOperation(buttonData.operation)}
            title={buttonData.title}
          />
        ))}
      </View>

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontFamily: "Poppins-Regular",
          marginTop: 20,
          marginBottom: 25,
        }}
      >
        Tap a button to edit the image
      </Text>

      <ActivityIndicator animating={isLoading} size="large" color="#000000" />
    </View>
  );
};

export default ImageEditor;
