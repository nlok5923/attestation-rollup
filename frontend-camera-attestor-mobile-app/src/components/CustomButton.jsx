import { Button, Text } from "@rneui/base";
import { Image, View } from "react-native";

const CustomButton = ({ onPress, imageSource, title }) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Button
        title="Dark"
        buttonStyle={{ backgroundColor: "white" }}
        containerStyle={{ backgroundColor: "white" }}
        onPress={onPress}
      >
        <Image
          style={{
            height: 50,
            width: 55,
            backgroundColor: "rgba(1, 1, 1)",
            borderRadius: 10,
          }}
          source={imageSource}
        />
      </Button>

      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          fontFamily: "Poppins-Regular",
          width: "54%",
          minHeight: 48,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default CustomButton;
