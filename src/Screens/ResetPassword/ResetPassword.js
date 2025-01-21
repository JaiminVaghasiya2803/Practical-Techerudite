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
import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure to install expo/vector-icons or react-native-vector-icons
import {images} from '../../assets/img';
import {base_url} from '../../common/constants';
import axios from 'axios';
import Loader from '../../common/Loader';

export default function ResetPassword(props) {
  const navigation = props.navigation;
  const {email, code} = props.route.params;
  const [Loading, setLoading] = useState(false);

  const [newPasswordFocus, setNewPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleConfirm = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Please make sure your passwords match');
    } else {
      setErrorMessage('');
      setLoading(true);
      const qs = require('qs');
      let data = qs.stringify({
        email: email,
        code: code,
        password: newPassword,
      });

      let config = {
        method: 'post',
        url: `${base_url}reset-password`,
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
            alert(response.data.message);
            navigation.navigate('SignIn');
          }
          console.log(JSON.stringify(response.data));
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
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

      <View style={{padding: 20}}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Reset Password?</Text>
          <Text style={styles.subtitle}>
            Your new password must be different from the previously used
            password and must contain at least 8 characters.
          </Text>
        </View>

        <TextInput
          style={[
            styles.input,
            {borderBottomColor: newPasswordFocus ? 'blue' : 'grey'},
          ]}
          placeholder="Password"
          placeholderTextColor="#999"
          onFocus={() => setNewPasswordFocus(true)}
          onBlur={() => setNewPasswordFocus(false)}
          secureTextEntry
          onChangeText={text => setNewPassword(text)}
          value={newPassword}
        />

        {/* Confirm Password Input */}
        <TextInput
          style={[
            styles.input,
            {
              borderBottomColor:
                errorMessage && confirmPasswordFocus
                  ? 'red'
                  : confirmPasswordFocus
                  ? 'blue'
                  : 'grey',
            },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}
          secureTextEntry
          onChangeText={text => {
            setConfirmPassword(text);
            if (errorMessage) setErrorMessage(''); // Clear error as the user types
          }}
          value={confirmPassword}
        />

        {/* Error Message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleConfirm}>
          <Text style={styles.submitButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
  },
  input: {
    marginBottom: 15,
    fontSize: 16,
    borderBottomWidth: 2,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
