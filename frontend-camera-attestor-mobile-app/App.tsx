/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import { MMKVLoader } from "react-native-mmkv-storage";

import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AttestationCamera from "./src/components/AttestationCamera";

const MMKV = new MMKVLoader().withEncryption().initialize();

function App(): React.JSX.Element {
  const [deviceWallet, setDeviceWallet] = useState<ethers.Wallet | null>(null);

  useEffect(() => {
    (async () => {
      let phrase = await MMKV.getStringAsync("devicePhrase");

      if (!phrase) {
        const wallet = ethers.Wallet.createRandom();
        await MMKV.setStringAsync("devicePhrase", wallet.mnemonic?.phrase!);
        setDeviceWallet(wallet);
      } else {
        const wallet = ethers.Wallet.fromMnemonic(phrase);
        setDeviceWallet(wallet);
      }
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {deviceWallet && <AttestationCamera deviceWallet={deviceWallet} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
