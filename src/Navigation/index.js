import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import SignIn from '../Screens/SignIn/SignIn';
import SignUp from '../Screens/SignUp/SignUp';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from '../Screens/ForgotPassword/ForgotPassword';
import ResetPassword from '../Screens/ResetPassword/ResetPassword';
import OtpScreen from '../Screens/OtpScreen/OtpScreen';
import SplashScreen from '../Screens/SplashScreen/SplashScreen';
import MessageScreen from '../Screens/MessageScreen/MessageScreen';
import ErrorMessageScreen from '../Screens/MessageScreen/ErrorMessageScreen';
import ErrorMessageScreen1 from '../Screens/MessageScreen/ErrorMessageScreen1';

const Stack = createStackNavigator();

const Index = () => {
  const CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
      text: '#000000',
    },
  };

  return (
    <NavigationContainer theme={CustomTheme}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: '#000'},
          headerTintColor: '#000',
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen
          name="ErrorMessageScreen"
          component={ErrorMessageScreen}
        />
        <Stack.Screen
          name="ErrorMessageScreen1"
          component={ErrorMessageScreen1}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
