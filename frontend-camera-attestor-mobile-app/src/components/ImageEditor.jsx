import React from "react";
import { Image, View } from "react-native";
import { Button, Text } from "@rneui/base";
import axios from "axios";

import { ImageContext } from "../context/imageContext";
import PAGE_VALUES from "../constants/pagevalues";

const IMAGE_OPEARTIONS = {
  INVERT_COLOR: "invert",
  INCREASE_BRIGHTNESS: "increase_brightness",
  DECREASE_BRIGHTNESS: "decrease_brightness",
  FLIP: "flip",
};

const ImageEditor = ({ setPage }) => {
  const { uri, uuid, base64, rollupUrl, setBase64 } =
    React.useContext(ImageContext);

  const handleImageOperation = async (operation) => {
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
      <Text h2 h2style={{ margin: "0 0 40px 0" }}>
        Adjust
      </Text>

      {base64 && (
        <Image
          style={{ height: 200, width: 250, borderRadius: 10 }}
          source={{ uri: `data:image/jpeg;base64,${base64}` }}
        />
      )}

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          onPress={() => handleImageOperation(IMAGE_OPEARTIONS.INVERT_COLOR)}
        >
          Grayscale
        </Button>

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
          onPress={() =>
            handleImageOperation(IMAGE_OPEARTIONS.INCREASE_BRIGHTNESS)
          }
        >
          Increase Brightness
        </Button>

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
          onPress={() =>
            handleImageOperation(IMAGE_OPEARTIONS.DECREASE_BRIGHTNESS)
          }
        >
          Decrease Brightness
        </Button>

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
          onPress={() => handleImageOperation(IMAGE_OPEARTIONS.FLIP)}
        >
          Flip
        </Button>
      </View>

      <View>
        <Button
          style={{ marginTop: 40 }}
          containerStyle={{
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={() => {
            // TODO: Add share logic here
            setPage(PAGE_VALUES.camera);
          }}
        >
          Share
        </Button>
      </View>
    </View>
  );
};

export default ImageEditor;
