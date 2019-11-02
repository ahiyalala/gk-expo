import React from "react";
import { View, Text, Picker } from "react-native";
import { colors, layouting, inputs, typography } from "../../theme/theme";
import Data from "../../Helper/Data";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export class BookingType extends React.Component {
  static navigationOptions = {
    title: "Select the type of cleaning",
    headerStyle: {
      backgroundColor: colors.brandYellow
    },
    headerTintColor: "#fff"
  };

  constructor(props) {
    super(props);

    this.state = {
      bookingForm: {},
      services: [],
      placesList: [],
      isSendingData: false,
      errorMessage: null
    };
  }

  componentWillUnmount() {
    const defaultState = {
      bookingForm: {},
      services: [],
      placesList: [],
      isSendingData: false,
      errorMessage: null
    };
    this.setState({ defaultState });
  }

  componentWillMount() {
    Data.getData("/api/services", (result, data) => {
      if (!result) return;
      const services = data;
      this.setState({
        services
      });
    });

    Data.getAuthenticatedData("/api/places", (result, data) => {
      if (!result) return;
      const placesList = data;
      this.setState(prevState => {
        prevState.placesList = placesList;
        prevState.bookingForm.location_id = placesList[0].location_id;
        return prevState;
      });
    });

    const { navigation } = this.props;
    const bookingForm = navigation.getParam("bookingForm", {});

    this.setState({ bookingForm });
  }

  selectService = service_type_key => {
    this.setState(prevState => {
      prevState.bookingForm.service_type_key = service_type_key;

      return prevState;
    });
  };

  changeLocation = value => {
    this.setState(prevState => {
      prevState.bookingForm.location_id = value;

      return prevState;
    });
  };

  renderServiceOptions() {
    const { bookingForm, services } = this.state;
    return (
      <View style={{ flexDirection: "row", padding: 8, marginBottom: 8 }}>
        {services.map((value, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              borderWidth: 2,
              borderRadius: 5,
              borderColor:
                bookingForm.service_type_key == value.service_type_key
                  ? colors.brandYellow
                  : "#000",
              margin: 8
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 16,
                paddingHorizontal: 8,
                backgroundColor:
                  bookingForm.service_type_key == value.service_type_key
                    ? colors.brandYellow
                    : colors.white
              }}
              onPress={() => this.selectService(value.service_type_key)}
            >
              <Text
                numberOfLines={2}
                style={{
                  flexWrap: "wrap",
                  textAlign: "center",
                  fontWeight: "bold",
                  color:
                    bookingForm.service_type_key == value.service_type_key
                      ? colors.white
                      : "#000"
                }}
              >
                {value.service_type_key}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }

  renderBookingDetails() {
    const { bookingForm, services, placesList } = this.state;
    if (!bookingForm.service_type_key) return;

    if (!bookingForm.location_id) return;

    return (
      <View
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor: "#aaa",
          marginBottom: 8
        }}
      >
        <Text>Select a location</Text>
        <Picker
          selectedValue={bookingForm.location_id}
          onValueChange={(value, index) => this.changeLocation(value)}
        >
          {placesList.map((value, index) => {
            const address = `${value.location_street}, ${value.location_barangay} ${value.location_city} `;
            return (
              <Picker.Item
                label={address}
                value={value.location_id}
                key={index}
              />
            );
          })}
        </Picker>
      </View>
    );
  }

  renderHousekeeperCount() {
    const { bookingForm, services, placesList } = this.state;
    if (!bookingForm.service_type_key) return;

    return (
      <View
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 5,
          marginBottom: 8
        }}
      >
        <Text>Number of housekeepers</Text>
        <View style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity
              style={{ padding: 16 }}
              onPress={() =>
                this.setState(prevState => {
                  if (prevState.bookingForm.number_of_housekeepers <= 1) return;
                  prevState.bookingForm.number_of_housekeepers -= 1;
                  return prevState;
                })
              }
            >
              <AntDesign name="minus" size={16} />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16 }}>
            <Text>{this.state.bookingForm.number_of_housekeepers}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{ padding: 16 }}
              onPress={() =>
                this.setState(prevState => {
                  if (prevState.bookingForm.number_of_housekeepers >= 5) return;
                  prevState.bookingForm.number_of_housekeepers += 1;
                  return prevState;
                })
              }
            >
              <AntDesign name="plus" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  renderCleaningDetails() {
    const { bookingForm, services, placesList } = this.state;
    if (!bookingForm.service_type_key) return;

    const serviceData = services.find(service => {
      return service.service_type_key == bookingForm.service_type_key;
    });

    if (!serviceData) return;

    return (
      <View
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 5,
          marginBottom: 8
        }}
      >
        <Text style={[typography.strongHelperText, { marginBottom: 16 }]}>
          {serviceData.service_type_key}
        </Text>
        <Text>{serviceData.service_description}</Text>
      </View>
    );
  }

  renderPrice() {
    const { bookingForm, services, placesList } = this.state;
    if (!bookingForm.service_type_key) return;

    const serviceData = services.find(service => {
      return service.service_type_key == bookingForm.service_type_key;
    });

    const locationData = placesList.find(
      place => place.location_id == bookingForm.location_id
    );

    if (!serviceData) return;

    return (
      <View
        style={{
          padding: 16,
          borderWidth: 1,
          borderColor: "#aaa",
          borderRadius: 5,
          marginBottom: 8
        }}
      >
        <Text style={[typography.strongHelperText, { marginBottom: 8 }]}>
          {`Total: Php ${serviceData.service_price *
            bookingForm.number_of_housekeepers}`}
        </Text>
        <TouchableOpacity
          style={inputs.brandBtn}
          onPress={() =>
            this.props.navigation.navigate("BookingDetails", {
              bookingForm: bookingForm,
              price:
                serviceData.service_price * bookingForm.number_of_housekeepers,
              location: locationData
            })
          }
        >
          <Text
            style={{
              color: colors.white,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16
            }}
          >
            Review my appointment
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ marginHorizontal: 16, marginTop: 16 }}>
        {this.renderServiceOptions()}
        {this.renderCleaningDetails()}
        {this.renderBookingDetails()}
        {this.renderHousekeeperCount()}
        {this.renderPrice()}
      </ScrollView>
    );
  }
}
