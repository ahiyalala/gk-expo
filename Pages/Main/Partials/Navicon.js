import { Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
export class Navicon extends React.Component {
  render() {
    return (
      <View
        style={{
          marginHorizontal: 8,
          marginRight: this.props.margin ? this.props.margin : null,
          borderRadius: 5,
          padding: 8,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white"
          }}
          onPress={this.props.onPress}
        >
          {this.props.children}
          {this.props.title ? (
            <Text style={{ fontSize: 12 }}>{this.props.title}</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}
