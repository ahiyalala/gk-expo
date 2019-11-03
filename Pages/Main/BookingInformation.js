import React from "react";
import { View, Text, Linking } from "react-native";
import moment from "moment";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../theme/theme";
export class BookingInformation extends React.Component {
  static navigationOptions = {
    title: "Booking information",
    headerStyle: {
      backgroundColor: colors.brandYellow
    },
    headerTintColor: "#fff"
  };
  render() {
    const { navigation } = this.props;
    const bookingDetails = navigation.getParam("bookingDetails", {});

    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View
          style={{
            padding: 16,
            paddingVertical: 32,
            borderBottomWidth: 1,
            borderBottomColor: "#aaa"
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            {bookingDetails.service.service_type_key}
          </Text>
          <Text style={{ fontSize: 16 }}>
            {moment(bookingDetails.date).format("LL")} at{" "}
            {bookingDetails.start_time} to {bookingDetails.end_time}
          </Text>
          <Text style={{ fontSize: 16 }}>Php {bookingDetails.total_price}</Text>
          <Text style={{ fontSize: 16 }}>
            {bookingDetails.housekeepers.length}{" "}
            {bookingDetails.housekeepers.length > 1
              ? "housekeepers"
              : "housekeeper"}
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {bookingDetails.housekeepers.map((housekeeper, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  Linking.openURL(`tel:${housekeeper.contact_number}`)
                }
              >
                <View
                  style={{
                    padding: 16,
                    paddingVertical: 24,
                    backgroundColor: "#eee"
                  }}
                >
                  <Text style={{ fontSize: 18 }}>
                    {housekeeper.first_name} {housekeeper.last_name}
                  </Text>
                  <Text>
                    Call at (+63) 9*****
                    {housekeeper.contact_number.substr(
                      housekeeper.contact_number.length - 4
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View>
          <TouchableOpacity>
            <View
              style={{
                paddingTop: 16,
                paddingBottom: 32,
                backgroundColor: "red"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: colors.white
                }}
              >
                Cancel this booking
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
