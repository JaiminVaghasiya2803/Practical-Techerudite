import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {images} from '../../assets/img';
import {fonts} from '../../assets/fonts';
import Loader from '../../common/Loader';
import {base_url} from '../../common/constants';
import axios from 'axios';

export default function SignIn({navigation}) {
  const [Loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });
  const handleSignInApiCall = values => {
    setLoading(true);
    const FormData = require('form-data');
    let data = new FormData();
    data.append('email', values.email);
    data.append('password', values.password);
    try {
      let config = {
        method: 'post',
        url: `${base_url}login`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios
        .request(config)
        .then(response => {
          setLoading(false);
          if (response.data.success) {
            alert(response.data.message);
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
      setLoading(false);
    }
  };
  const handleSignIn = values => {
    console.log('Sign-In Details:', values);
    handleSignInApiCall(values);
    // Perform login API call here
    alert('Login Successful!');
  };

  return (
    <View style={styles.container}>
      <Loader loading={Loading} />
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
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderBottomColor:
                      touched.email && errors.email ? 'red' : 'grey',
                  },
                ]}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  {
                    borderBottomColor:
                      touched.password && errors.password ? 'red' : 'grey',
                  },
                ]}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}
                style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.signupLink}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  formContainer: {
    width: '100%',
    flex: 2,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: fonts.PoppinsSemiBold,
    color: 'black',
  },
  input: {
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderBottomWidth: 2,
    fontFamily: fonts.PoppinsMedium,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#314FA4',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: fonts.PoppinsSemiBold,
  },
  loginButton: {
    backgroundColor: '#314FA4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    fontFamily: fonts.PoppinsMedium,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    color: '#333',
  },
  signupLink: {
    fontSize: 14,
    color: '#314FA4',
    fontFamily: fonts.PoppinsSemiBold,
  },
});
