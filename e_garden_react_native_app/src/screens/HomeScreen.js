import * as React from "react";
import { View, Text } from "react-native";

import HandleQRCode from "../components/HandleQRCode";

export default function HomeScreen({navigation}) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <HandleQRCode />
        </View>
    );
}