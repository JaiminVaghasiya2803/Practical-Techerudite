import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../assets/img';
import {TextInput} from 'react-native-gesture-handler';
import {Checkbox} from 'react-native-paper';
import {fonts} from '../../assets/fonts';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Direct axios import
import {base_url} from '../../common/constants';
import Loader from '../../common/Loader';

export default function SignUp({navigation}) {
  const [Loading, setLoading] = useState(false);
  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    firstName: Yup.string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    terms: Yup.bool().oneOf(
      [true],
      'You must agree to the terms and conditions',
    ),
  });
  const handleSignUpApiCall = values => {
    setLoading(true);
    const qs = require('qs');
    let data = qs.stringify({
      email: values.email,
      fname: values.firstName,
      lname: values.lastName,
      username: values.username,
      password: values.password,
    });

    try {
      let config = {
        method: 'post',
        url: `${base_url}register`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          setLoading(false);
          if (response.data.success) {
            if (
              response.data.message ==
              'Verification code sent to your email, please check!'
            ) {
              alert(response.data.message);
              navigation.navigate('OtpScreen', {
                email: values.email,
              });
            }
          } else if (response.data.data.email_exists) {
            alert(response.data.message);
            navigation.navigate('OtpScreen', {
              email: values.email,
            });
          } else {
            alert(response.data.message);
          }
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      console.error('Error:', error);
      alert('Sign-up failed. Please try again.');
    }
  };

  const handleSignUp = async values => {
    handleSignUpApiCall(values);
  };

  return (
    <SafeAreaView>
      <Loader loading={Loading} />
      <ScrollView>
        {/* Header with background image */}
        <View>
          <ImageBackground
            source={images.background}
            style={{width: '100%', paddingVertical: 25, alignItems: 'center'}}
            resizeMode="stretch">
            <Image
              source={images.IcSignIn}
              style={{width: '80%', height: 250}}
              resizeMode="contain"
            />
          </ImageBackground>
        </View>

        {/* Form container */}
        <View style={styles.container}>
          <Text style={styles.title}>Sign up</Text>

          <Formik
            initialValues={{
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              terms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                {/* Username */}
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="lightgrey"
                  style={styles.input}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                {/* First Name */}
                <TextInput
                  placeholder="First name"
                  placeholderTextColor="lightgrey"
                  style={styles.input}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                {/* Last Name */}
                <TextInput
                  placeholder="Last name"
                  placeholderTextColor="lightgrey"
                  style={styles.input}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                {/* Email */}
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="lightgrey"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password */}
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="lightgrey"
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Terms and Conditions Checkbox */}
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={values.terms ? 'checked' : 'unchecked'}
                    uncheckedColor="black"
                    color="black"
                    onPress={() => setFieldValue('terms', !values.terms)}
                  />
                  <Text style={styles.checkboxText}>
                    By clicking here you are agreed to our{' '}
                    <Text style={styles.link}>Terms & Condition</Text>
                  </Text>
                </View>
                {touched.terms && errors.terms && (
                  <Text style={styles.errorText}>{errors.terms}</Text>
                )}

                {/* Submit Button */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>

          {/* Footer Note */}
          <Text style={styles.note}>
            We will share OTP to your Email ID for authentication
          </Text>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              onPress={() => {
                navigation.navigate('SignIn');
              }}
              style={styles.link}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#B3B3B3',
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 14,
  },
  link: {
    color: '#314FA4',
    textDecorationLine: 'underline',
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#314FA4',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
