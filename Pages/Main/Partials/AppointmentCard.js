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
export default class AppointmentCard extends React.Component {
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
            {this.props.title} for Php {this.props.price}
          </Text>
          <Text>
            {this.props.schedule_date} at {this.props.schedule_time}
          </Text>
          <Text>
            {this.props.number_of_housekeepers}
            {this.props.number_of_housekeepers > 1
              ? " housekeepers"
              : " housekeeper"}
          </Text>
          {this.renderInstruction()}
        </TouchableOpacity>
      </View>
    );
  }

  renderInstruction() {
    if (this.props.index > 0) return;

    return (
      <Text style={{ fontStyle: "italic", color: "#aaa", marginTop: 8 }}>
        Tap to view details
      </Text>
    );
  }
}
