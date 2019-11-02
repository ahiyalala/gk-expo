import {
  Text,
  View,
  AsyncStorage,
  Picker,
  TouchableOpacity
} from "react-native";
import React from "react";
import { colors, inputs } from "../../theme/theme";
import { SafeAreaView } from "react-navigation";
import { Form, TextValidator } from "react-native-validator-form";
import Data from "../../Helper/Data";

export class PlacesForm extends React.Component {
  static navigationOptions = {
    title: "Add a new place",
    headerStyle: {
      backgroundColor: colors.brandYellow
    },
    headerTintColor: "#fff"
  };

  formStyle = {
    paddingTop: 4,
    paddingBottom: 16,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16
  };

  constructor(props) {
    super(props);

    this.state = {
      placesData: {
        location_type: "",
        location_barangay: "",
        location_city: "",
        location_street: "",
        customer_id: 0
      },
      placesOptions: [],
      isSendingData: false,
      errorMessage: ""
    };
  }

  async componentWillMount() {
    this._isMounted = false;

    const userRawData = await AsyncStorage.getItem("credentials");
    const userData = JSON.parse(userRawData);

    this.setState(prevState => {
      prevState.placesData.customer_id = userData.customer_id;
    });
  }

  async componentDidMount() {
    this._isMounted = true;

    if (!this._isMounted) return;

    Data.getAuthenticatedData(
      "/api/places/locations-list",
      async (result, data) => {
        if (!result) return;
        this.setState({
          placesOptions: data
        });
      }
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = () => {
    if (this.state.isSendingData) return;

    this.refs.form.submit();
  };

  handleChange = (key, value) => {
    this.setState(prevState => (prevState.placesData[key] = value));
  };

  pickerChange = (value, index) => {
    this.setState(prevState => {
      prevState.placesData.location_city = value;

      return prevState;
    });
  };

  barangayPickerChange = (value, index) => {
    this.setState(prevState => {
      prevState.placesData.location_barangay = value;

      return prevState;
    });
  };

  submit = async () => {
    this.setState({ isSendingData: true });
    const { placesData } = this.state;

    Data.sendAuthenticatedData("/api/places", placesData, data => {
      if (data.message != null) {
        this.setState({
          isSendingData: false,
          errorMessage: data.message
        });
        return;
      }

      alert("Successful!");
      this.props.navigation.goBack();
    });
  };

  renderBarangay = () => {
    var city = this.state.placesData.location_city;
    if (city == null || city == "") return;

    var array = this.state.placesOptions;
    var barangayList = array.filter(value => value.city_name == city);
    return barangayList.map((value, index) => {
      return (
        <Picker.Item
          label={value.city_barangay}
          value={value.city_barangay}
          key={index}
        />
      );
    });
  };

  renderCityList = () => {
    var array = this.state.placesOptions;
    if (!array) return;

    var uniqueCities = array
      .map(item => item.city_name)
      .filter((value, index, self) => self.indexOf(value) === index);

    return uniqueCities.map((value, index) => {
      return <Picker.Item label={value} value={value} key={index} />;
    });
  };

  render() {
    const { placesData } = this.state;
    return (
      <SafeAreaView>
        <View style={{ marginHorizontal: 8, marginTop: 32 }}>
          <Form ref="form" onSubmit={this.submit}>
            <Text>{this.state.errorMessage}</Text>
            <View>
              <Text style={{ paddingLeft: 4 }}>Location name</Text>
              <TextValidator
                name="location_type"
                label="location_type"
                type="text"
                autoComplete="off"
                validators={["required"]}
                errorMessages={["This field is required"]}
                value={placesData.location_type}
                onChangeText={e => this.handleChange("location_type", e)}
                style={this.formStyle}
              />
            </View>
            <View>
              <Text style={{ paddingLeft: 4 }}>Street</Text>
              <TextValidator
                name="location_street"
                label="location_street"
                type="text"
                autoComplete="off"
                validators={["required"]}
                errorMessages={["This field is required"]}
                value={placesData.location_street}
                onChangeText={e => this.handleChange("location_street", e)}
                style={this.formStyle}
              />
            </View>
            <View>
              <Text style={{ paddingLeft: 4 }}>City</Text>
              <Picker
                selectedValue={placesData.location_city}
                style={{ fontSize: 16 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.pickerChange(itemValue, itemIndex)
                }
              >
                {this.renderCityList()}
              </Picker>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ paddingLeft: 4 }}>Barangay</Text>
              <Picker
                selectedValue={placesData.location_barangay}
                style={{ fontSize: 16 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.barangayPickerChange(itemValue, itemIndex)
                }
              >
                {this.renderBarangay()}
              </Picker>
            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={inputs.brandBtn}
              onPress={this.handleSubmit}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.white
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 8, padding: 16 }}
              activeOpacity={1}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: colors.brandYellow
                }}
                onPress={() => this.props.navigation.goBack()}
              >
                Go Back
              </Text>
            </TouchableOpacity>
          </Form>
        </View>
      </SafeAreaView>
    );
  }
}
