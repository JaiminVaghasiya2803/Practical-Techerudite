import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {base_url} from '../../common/constants';
import Loader from '../../common/Loader';
import {images} from '../../assets/img';
import {fonts} from '../../assets/fonts';

export default function OtpScreen(props) {
  const navigation = props.navigation;
  const {email, isReset} = props.route.params;

  const [Loading, setLoading] = useState(false);
  function maskEmail(email) {
    const [localPart, domainPart] = email.split('@');
    const maskedLocal =
      localPart.slice(0, 2) + '*'.repeat(localPart.length - 4);
    const domain = domainPart.slice(-2);
    return `${maskedLocal}**************${domain}`;
  }

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(150);

  useEffect(() => {
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      navigation.navigate('ErrorMessageScreen');
    }
  }, [secondsLeft]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputs[index - 1].focus();
    }
  };
  const VerifyApiCall = () => {
    setLoading(true);
    const qs = require('qs');
    let data = qs.stringify({
      email: email,
      code: code.join(''),
    });

    let config = {
      method: 'post',
      url: `${base_url}${isReset ? 'verify-password-token' : 'verify-email'}`,
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
          if (isReset) {
            navigation.navigate('ResetPassword', {email, code: code.join('')});
          } else {
            navigation.navigate('MessageScreen');
          }
        } else {
          navigation.navigate('ErrorMessageScreen1');
        }
        console.log(
          JSON.stringify(response.data),
          code.join(''),
          JSON.stringify(config),
        );
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  const ResendApiCall = () => {
    setLoading(true);
    const qs = require('qs');
    let data = qs.stringify({
      email: email,
    });

    let config = {
      method: 'post',
      url: `${base_url}resend-email-code`,
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
          //   navigation.navigate('MessageScreen');
        } else {
          alert(response.data.message);
        }
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };
  const inputs = [];

  return (
    <View style={styles.container}>
      <Loader loading={Loading} />
      <ImageBackground
        source={images.background}
        style={{width: '100%', paddingVertical: 25, alignItems: 'center'}}
        resizeMode="stretch">
        <Image
          source={images.Verify}
          style={{width: '50%', height: 250}}
          resizeMode="contain"
        />
      </ImageBackground>
      <View style={{padding: 20}}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Verify Code</Text>
          <Text style={styles.subtitle}>
            Check your Email Inbox we have sent you the code at{' '}
            {maskEmail(email)}
          </Text>
        </View>

        <View style={styles.codeContainer}>
          {code.map((value, index) => (
            <TextInput
              key={index}
              ref={input => (inputs[index] = input)}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="numeric"
              value={value}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <Text style={styles.timer}>({formatTime()})</Text>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Did not receive the code? </Text>
          <TouchableOpacity>
            <Text
              onPress={() => {
                ResendApiCall();
              }}
              style={[
                styles.resendLink,
                secondsLeft > 0 && {color: '#314FA4'},
              ]}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            VerifyApiCall();
          }}
          style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.PoppinsSemiBold,
    color: 'black',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.PoppinsMedium,
    paddingHorizontal: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
  },
  codeInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#E2E9FF',
  },
  timer: {
    fontSize: 14,
    color: '#666',
    fontFamily: fonts.PoppinsMedium,
    marginBottom: 20,
  },
  resendContainer: {
    // flexDirection: 'row',
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#333',
  },
  resendLink: {
    fontSize: 14,
    color: '#314FA4',
    fontFamily: fonts.PoppinsMedium,
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#314FA4',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    fontFamily: fonts.PoppinsSemiBold,
    width: '100%',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
