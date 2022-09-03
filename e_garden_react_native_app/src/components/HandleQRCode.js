import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
//import Animated from "react-native-reanimated";
//import set from "module:react-native-reanimated.Animated.set";

import { PermissionsAndroid } from 'react-native';
import WifiManager from "react-native-wifi-reborn";

import * as Location from 'expo-location'

export default function HandleQRCode({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [ssid, setSsid] = useState(null);
    const [password, setPassword] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [json, setJSON] = useState({});

    const askForCameraPermission = () => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        })()
    }

    const askForLocation = () => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            console.log('Location permission granted', location);
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
        askForLocation();
    }, []);

    function isValidJSONString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({data}) => {
        if(isValidJSONString(data)){
            setJSON(JSON.parse(data));

            if(json.hasOwnProperty('ssid') && json.hasOwnProperty('password')) {
                setScanned(true);

                if(json.hasOwnProperty('ssid')) {
                    setSsid(json.ssid);
                }
                if(json.hasOwnProperty('password')) {
                    setPassword(json.password);
                }
            } else {
                setSsid(null);
                setPassword(null);
            }
        }
    };

    // Check for the permissions and return the screens
    if(hasPermission === null) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 26, fontWeight: 'bold'}}>Requesting for camera permission</Text>
            </View>
        )
    }

    if(hasPermission === false) {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 26, fontWeight: 'bold'}}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    const wifi = async () => {
        try {
            const data = await WifiManager.connectToProtectedSSID(
                String(ssid),
                String(password),
                true,
            );
            console.log('Connected successfully!', {data}, " using SSID : ", {ssid});
        } catch (error) {
            console.log('Connection failed!', {error}, " using SSID : ", {ssid});
        }

        try {
            const ssid = await WifiManager.getCurrentWifiSSID();
            setSsid(ssid);
            console.log('Your current connected wifi SSID is ' + ssid);
        } catch (error) {
            setSsid('Cannot get current SSID!' + error.message);
            console.log('Cannot get current SSID!', {error});
        }
    };

    if(ssid !== null && password !== null) {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Connecting to the product...</Text>
                <Text style={{ fontWeight: 'bold'}}>ssid : {ssid}</Text>
                <Text style={{ fontWeight: 'bold'}}>password: {password}</Text>
                <Button title={'Retry to scan QR Code'} onPress={() => setScanned(false) || setJSON({}) || setSsid(null) || setPassword(null)} color='green'/>
                <Button
                    onPress={wifi}
                    title='Connect to Wifi'
                    color='#841584'
                />
            </View>
        )
    }

    // Return The view
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.barcodebox} >
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400}}
                />
            </View>
            <Text style={styles.maintext}>Scan the QR on your product</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    barcodebox: {
        borderWidth: 4,
        borderColor: '#90DC55',
        alignItems: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30
    },
    maintext: {
        fontSize: 16,
        margin: 20
    }
});