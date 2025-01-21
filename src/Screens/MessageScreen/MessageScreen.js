import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {images} from '../../assets/img';
import {fonts} from '../../assets/fonts';

export default function MessageScreen({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.background}
        style={{width: '100%', paddingVertical: 25, alignItems: 'center'}}
        resizeMode="stretch">
        <Image
          source={images.Sucess}
          style={{width: '50%', height: 250}}
          resizeMode="contain"
        />
      </ImageBackground>
      <View style={{padding: 20}}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>OTP is verified...</Text>
          <Text style={styles.subtitle}>
            Happy to say everything went smoothly. Start with Tradesmen for
            great experience...
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn');
          }}
          style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue to App</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 28,
    color: 'black',
    marginBottom: 10,
    width: '90%',
    fontFamily: fonts.PoppinsSemiBold,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.PoppinsMedium,
    color: '#343434',
    fontWeight: '400',
    width: '90%',
  },
  continueButton: {
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#314FA4',
    fontFamily: fonts.PoppinsSemiBold,
    textDecorationLine: 'underline',
  },
});
