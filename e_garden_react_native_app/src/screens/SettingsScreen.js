import React, { useEffect, useState } from 'react';
import {ActivityIndicator, FlatList, View, Text, StyleSheet} from "react-native";

export default function SettingsScreen({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getPlants = async () => {
        try {
            const response = await fetch('https://e-garden-api.herokuapp.com/plants');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPlants();
    }, []);

    return(
        <View style={{ flex: 1, padding: 24 }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold'}}>Settings Screen</Text>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.itemPlants}>
                            <Text key={item._id} >{item._id}, {item.name}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemPlants: {
        borderWidth: 4,
        borderColor: '#90DC55',
        alignItems: 'center',
        overflow: 'hidden',
        margin: 4,
        padding: 4,
        borderRadius: 10
    },
});