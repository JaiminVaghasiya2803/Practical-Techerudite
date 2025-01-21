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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {base_url} from '../../common/constants';
import {images} from '../../assets/img';
import axios from 'axios';
import Loader from '../../common/Loader';
import {fonts} from '../../assets/fonts';
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgotPassword({navigation}) {
  const [Loading, setLoading] = useState(false);

  const handleSubmit = async values => {
    setLoading(true);
    const qs = require('qs');
    let data = qs.stringify({
      email: values.email,
    });

    let config = {
      method: 'post',
      url: `${base_url}forgot-password`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        setLoading(false);
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          navigation.navigate('OtpScreen', {
            email: values.email,
            isReset: true,
          });
        }
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{email: ''}}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <View style={styles.container}>
          <Loader loading={Loading} />

          <ImageBackground
            source={images.background}
            style={{width: '100%', paddingVertical: 25, alignItems: 'center'}}
            resizeMode="stretch">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backButton}>
              <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            <Image
              source={images.Verify}
              style={{width: '50%', height: 250}}
              resizeMode="contain"
            />
          </ImageBackground>

          <View style={{padding: 20, flex: 2}}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your registered email id, we will share the verification
                code.
              </Text>
            </View>
            <View style={{marginBottom: 20}}>
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
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Remember Password? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <Text style={styles.footerLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: 'black',
    fontFamily: fonts.PoppinsSemiBold,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    color: '#343434',
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    borderBottomWidth: 2,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#314FA4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.PoppinsSemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsMedium,
    color: '#333',
  },
  footerLink: {
    fontSize: 14,
    color: '#314FA4',
    fontFamily: fonts.PoppinsSemiBold,
  },
});
