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
            <View>
                <TouchableOpacity style={styles.category} onPress={() => {

                    navigation.navigate("EmergencyDetail", { prev: "Emergency", categoryId: itemData.item.id, title: itemData.item.title })
                }}>
                    <View style={styles.box}>
                        <Image
                            style={styles.tinyLogo}
                            source={itemData.item.image}
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
        <ScrollView>
            <View style={styles.searchbar}>
                <TextInput placeholder="Search" style={{ backgroundColor: "white", borderRadius: "5vw", padding: "2vw", margin: "2vw" }} />
                <TouchableOpacity style={{ borderRadius: "5vw", backgroundColor: "white", padding: "2vw", margin: "2vw" }}>
                    <Ionicons name="search" color={"black"} size={"5vw"} />
                </TouchableOpacity>
            </View>
            <FlatList data={CATEGORIES} renderItem={renderCategories} numColumns={3} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    box: {
        width: "28vw",
        height: "28vw",
        // backgroundColor: "#414370"
    },
    category: {
        margin: "2.5vw",
        marginTop: "5vh",
    },
    text: {
        marginTop: 10,
        fontWeight: "bold",
        textAlign: "center",
        color: "#AF4242",
        fontSize: "2vh"

    },
    tinyLogo: {
        width: "28vw",
        height: "28vw",
    },
    searchbar: {
        backgroundColor: "#61D8CF",
        alignSelf: "center",
        marginTop: "5vw",
        borderWidth: 2,
        borderRadius: "5vw",
        flexDirection: "row"
    }
});

export default EmergencyScreen;
