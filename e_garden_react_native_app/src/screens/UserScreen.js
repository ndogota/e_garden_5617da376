import React from "react";
import { SafeAreaView, Button, StyleSheet, TextInput, Alert } from "react-native";

export default function UserScreen({navigation}) {
    const [username, onChangeUsername] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);

    return(
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={username}
                placeholder="Username"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
            />
            <Button
                title="Connect"
                onPress={() => Alert.alert('Connection')}
                color="#90DC55"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});