import {View, Text, Image, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '../../assets/img';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignIn');
    }, 2500);
    return clearTimeout();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Image
        source={images.splash}
        resizeMode="contain"
        style={{width: '100%'}}
      />
    </SafeAreaView>
  );
}
