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
import { Text } from "@rneui/base";
import ImageEditor from "./src/components/ImageEditor";
import PAGE_VALUES from "./src/constants/pagevalues";
import { ImageProvider } from "./src/context/imageContext";

const MMKV = new MMKVLoader().withEncryption().initialize();

function App(): React.JSX.Element {
  const [page, setPage] = useState<string>(PAGE_VALUES.loading);
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

      setPage(PAGE_VALUES.camera);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ImageProvider>
          {page === PAGE_VALUES.loading && <Text>Loading...</Text>}
          {page === PAGE_VALUES.camera && (
            <AttestationCamera setPage={setPage} deviceWallet={deviceWallet} />
          )}
          {page === PAGE_VALUES.editor && <ImageEditor setPage={setPage} />}
        </ImageProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
