import { Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../theme/theme";
export class MainCta extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 3,
          backgroundColor: colors.brandYellow,
          margin: 8,
          borderRadius: 5
        }}
      >
        <TouchableOpacity style={{ height: "100%", justifyContent: "center" }}>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16
            }}
          >
            Book a cleaner
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
