import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { typography, colors, inputs } from "../../theme/theme";
import moment from "moment";
import { StackActions, NavigationActions } from "react-navigation";
import Data from "../../Helper/Data";

export class BookingDetails extends React.Component {
  static navigationOptions = {
    title: "Confirm your booking",
    headerStyle: {
      backgroundColor: colors.brandYellow
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const bookingForm = navigation.getParam("bookingForm", {});

    this.state = {
      bookingForm: bookingForm,
      isSendingData: false
    };
  }

  setAppointment = () => {
    const isSendingData = true;
    const { bookingForm } = this.state;
    this.setState({ isSendingData });
    Data.sendAuthenticatedData("/api/appointments", bookingForm, data => {
      if (data.message != null) {
        alert(data.message);
        this.setState({
          isSendingData: false
        });
        return;
      }

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })]
      });

      this.props.navigation.dispatch(resetAction);
    });
  };

  render() {
    const { bookingForm } = this.state;
    const { navigation } = this.props;
    const location = navigation.getParam("location", {});
    const price = navigation.getParam("price", null);

    return (
      <View
        style={{
          marginTop: 32,
          marginHorizontal: 8,
          padding: 16,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text>Type of cleaning</Text>
          <Text style={{ fontSize: 24 }}>{bookingForm.service_type_key}</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text>Location</Text>
          <Text
            style={{ fontSize: 24 }}
          >{`${location.location_street}, ${location.location_barangay} ${location.location_city}`}</Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text>Schedule Date</Text>
          <Text style={{ fontSize: 24 }}>
            {moment(bookingForm.date).format("LL")}
          </Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text>Schedule Time</Text>
          <Text style={{ fontSize: 24 }}>{bookingForm.start_time}</Text>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text>Price</Text>
          <Text style={{ fontSize: 24 }}>{`Php ${price}`}</Text>
        </View>
        <TouchableOpacity
          style={inputs.brandBtn}
          disabled={!this.state.isSendingData}
          onPress={() =>
            this.props.navigation.navigate("BookingType", {
              bookingForm: this.state.bookingForm
            })
          }
        >
          {this.renderButtonContents()}
        </TouchableOpacity>
      </View>
    );
  }
  renderButtonContents() {
    if (this.state.isSendingData) return <ActivityIndicator color={"white"} />;

    return (
      <Text
        style={{
          color: colors.white,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 16
        }}
        onPress={() => this.setAppointment()}
      >
        Set me an appointment
      </Text>
    );
  }
}
