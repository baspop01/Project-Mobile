import React, { useRef } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Animated,
    Image,
    TextInput,
    ScrollView
} from "react-native";
import { CATEGORIES } from "../../data/data";
import { Ionicons } from '@expo/vector-icons';


const EmergencyScreen = ({ navigation }) => {
    const renderCategories = (itemData) => {
        return (
            <View >
                <TouchableOpacity style={styles.category} onPress={() => {

                    navigation.navigate("EmergencyDetail", { prev: "Emergency", categoryId: itemData.item.id, title: itemData.item.title })
                }}>
                    <View style={styles.box}>
                        <Image
                            style={styles.tinyLogo}
                            source={{uri: itemData.item.image}}
                            // source={itemData.item.image}
                        />
                    </View>
                    <Text style={styles.text}>
                        {itemData.item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView style={{alignSelf: "center"}}>
            <View style={styles.searchbar}>
                <TextInput placeholder="Search" style={{ backgroundColor: "white", borderRadius: 50, padding: 10, margin: 10 }} />
                <TouchableOpacity style={{ borderRadius: 50, backgroundColor: "white", padding: 10, margin: 10 }}>
                    <Ionicons name="search" color={"black"} size={20} />
                </TouchableOpacity>
            </View>
            <FlatList data={CATEGORIES} renderItem={renderCategories} numColumns={3}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 110,
        height: 110,
        alignSelf: "center",
    },
    category: {
        margin: 5,
        marginTop: 30,
        width: "100%",
    },
    text: {
        marginTop: 10,
        fontWeight: "bold",
        textAlign: "center",
        color: "#AF4242",
        fontSize: 18

    },
    tinyLogo: {
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    searchbar: {
        backgroundColor: "#61D8CF",
        alignSelf: "center",
        marginTop: 30,
        borderWidth: 2,
        borderRadius:  50,
        flexDirection: "row"
    }
});

export default EmergencyScreen;
