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
import { useState } from "react";




const EmergencyScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const renderCategories = (itemData) => {
        return (
            <View >
                <TouchableOpacity style={styles.category} onPress={() => {

                    navigation.navigate("EmergencyDetail", { prev: "Emergency", categoryId: itemData.item.id, title: itemData.item.title, image: itemData.item.image, search: "" })
                }}>
                    <View style={styles.box}>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: itemData.item.image }}
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
        //TabBar
        <ScrollView style={{ alignSelf: "center" }}>
            <View style={styles.searchbar}>
                <TextInput onChangeText={(val) => {
                    setSearch(val)
                }} placeholder="ค้นหาบริการฉุกเฉิน" style={{ backgroundColor: "white", borderRadius: 50, padding: 10, margin: 10, width: "60%" }}
                />
                <TouchableOpacity style={{ borderRadius: 50, backgroundColor: "white", padding: 10, margin: 10 }} onPress={() => {

                    navigation.navigate("EmergencyDetail", { prev: "Emergency", search: search, title: "สายด่วนฉุกเฉิน", image: "", categoryId: "none" })
                }}>
                    <Ionicons name="search" color={"black"} size={20} />
                </TouchableOpacity>
            </View>
            <FlatList data={CATEGORIES} renderItem={renderCategories} numColumns={3} />
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
        fontSize: 18,
        // fontFamily: 'Sarabun_700Bold' //ลองเฉยๆ

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
        borderRadius: 50,
        flexDirection: "row",
    }
});

export default EmergencyScreen;

