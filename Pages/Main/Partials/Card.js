import {
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  StatusBar
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-navigation";
export default class Card extends React.Component {
  render() {
    return (
      <View style={{ padding: 8 }}>
        <TouchableOpacity
          style={{
            padding: 16,
            shadowColor: "#000",
            backgroundColor: "#fff",
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6
          }}
          onPress={this.props.onPress}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {this.props.title}
          </Text>
          <Text>{this.props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
