import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import SignIn from './Pages/SignIn';
import AuthLoadingScreen from './AuthLoadingScreen';
// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({ SignIn: {
                    screen:SignIn,
                    navigationOptions:{
                      header:null
                    } 
                  }
                });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));