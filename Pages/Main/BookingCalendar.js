import React from "react";
import { View, Text, AsyncStorage, Picker } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { colors, inputs } from "../../theme/theme";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

export class BookingCalendar extends React.Component {
  static navigationOptions = {
    title: "Select a date and time",
    headerStyle: {
      backgroundColor: colors.brandYellow
    },
    headerTintColor: "#fff"
  };

  scheduleTime = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM"
  ];

  constructor(props) {
    super(props);
    this.state = {
      bookingForm: {
        service_type_key: null,
        customer_id: null,
        location_id: null,
        payment_type: "Cash",
        date: moment(this.addDays(new Date(), 7)).format("YYYY-MM-DD"),
        start_time: "7:00 am",
        number_of_housekeepers: 1
      }
    };
  }

  async componentWillMount() {
    const userRawData = await AsyncStorage.getItem("credentials");
    var userData = JSON.parse(userRawData);

    this.setState(prevState => {
      prevState.bookingForm.customer_id = userData.customer_id;
      return prevState;
    });
  }

  dateSelected = e => {
    this.setState(prevState => {
      prevState.bookingForm.date = e.dateString;
      return prevState;
    });
  };

  addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  };

  render() {
    const currentDate = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(currentDate.getDate() + 7);
    endDate.setMonth(currentDate.getMonth() + 2);

    return (
      <ScrollView>
        <Calendar
          minDate={startDate}
          maxDate={endDate}
          onDayPress={this.dateSelected}
          hideExtraDays={true}
          theme={{ arrowColor: colors.brandYellow }}
          markedDates={{
            [this.state.bookingForm.date]: {
              selected: true,
              selectedColor: colors.brandYellow
            }
          }}
        />
        <Picker
          selectedValue={this.state.bookingForm.start_time}
          onValueChange={(value, index) =>
            this.setState(prevState => {
              prevState.bookingForm.start_time = value;
              return prevState;
            })
          }
          style={{ margin: 16 }}
        >
          {this.scheduleTime.map((value, index) => (
            <Picker.Item label={value} value={value} key={index} />
          ))}
        </Picker>
        <View
          style={{
            padding: 8,
            marginHorizontal: 16,
            borderRadius: 5,
            borderColor: "#ddd",
            borderWidth: 1
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}
          >{`Booking for ${moment(this.state.bookingForm.date).format(
            "LL"
          )} at ${this.state.bookingForm.start_time}`}</Text>
          <TouchableOpacity
            style={inputs.brandBtn}
            onPress={() =>
              this.props.navigation.navigate("BookingType", {
                bookingForm: this.state.bookingForm
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
              Select a type of cleaning
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
