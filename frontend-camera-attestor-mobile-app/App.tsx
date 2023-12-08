/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import {MMKVLoader} from 'react-native-mmkv-storage';
import {ethers} from 'ethers';

import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AttestationCamera from './src/components/AttestationCamera';

const MMKV = new MMKVLoader().withEncryption().initialize();

function App(): React.JSX.Element {
  const [deviceWallet, setDeviceWallet] = useState<ethers.HDNodeWallet | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      let phrase = await MMKV.getStringAsync('devicePhrase');

      if (!phrase) {
        const wallet = ethers.HDNodeWallet.createRandom();
        await MMKV.setStringAsync('devicePhrase', wallet.mnemonic?.phrase!);
        setDeviceWallet(wallet);
      } else {
        const wallet = ethers.HDNodeWallet.fromMnemonic(
          ethers.Mnemonic.fromPhrase(phrase),
        );
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
