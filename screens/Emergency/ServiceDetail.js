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
    Linking
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";


const ServiceDetail = ({route}) => {
    const { category } = route.params;
    return (
        <ScrollView style={styles.container}>
            <FontAwesome name="heartbeat" size={60} color="#E95060" />
            <Text style={styles.text}>{category.c_name}</Text>
            <Image
                style={styles.image}
                source={require("../../assets/it_logo.png")}
            />
            <Text style={{textAlign: "left", fontSize: 16 }}>    {category.c_detail}</Text>
            <TouchableOpacity style={styles.phone} onPress={() => { Linking.openURL('tel:0616645773'); }}>
                <FontAwesome name="phone" size={40} color="white" />
            </TouchableOpacity>
            <Text style={[styles.text, { color: "#414370", fontSize: 30 }]}>
                {category.c_number}
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 40,
        textAlign: "center"
    },
    image: {
        alignSelf: "center",
        width: 200,
        height: 200,
        margin: 50
    },
    text: {
        marginTop: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#414370",
        fontSize: 18
    },
    phone: {
        marginTop: 50,
        padding: 13,
        height: 60,
        width: 60,
        backgroundColor: "#008037",
        borderRadius: "100%",
        alignSelf: "center"
    }
});

export default ServiceDetail;
