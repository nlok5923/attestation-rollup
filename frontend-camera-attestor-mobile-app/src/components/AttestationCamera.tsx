/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {ethers} from 'ethers';
import {Button, Text} from '@rneui/base';

import {launchCamera} from 'react-native-image-picker';
import {View} from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Example App',
        message: 'Example App access to your location',
        buttonPositive: 'Ok',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const AttestationCamera = ({
  deviceWallet,
}: {
  deviceWallet: ethers.HDNodeWallet;
}) => {
  const handleOpenCamera = async () => {
    await requestLocationPermission();
    const response = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: false,
      includeBase64: true,
      includeExtra: true,
    });
    if (response.assets) {
      console.log(Object.keys(response.assets[0]));
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Text>Attestation Camera</Text>
      <Button onPress={handleOpenCamera}>Open Camera</Button>
    </View>
  );
};

export default AttestationCamera;
