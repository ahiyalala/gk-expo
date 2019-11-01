import { Text, View } from "react-native";
import React from "react";
import { colors } from "../../theme/theme";
export class PlacesForm extends React.Component {
  static navigationOptions = {
    title: "Add a new place",
    headerStyle: {
      backgroundColor: colors.brandYellow
    },
    headerTintColor: "#fff"
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }
}
