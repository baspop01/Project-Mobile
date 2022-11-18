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
import { CATEGORIES } from "../../data/data";
import { FontAwesome5 } from '@expo/vector-icons';


const ServiceDetail = ({route}) => {
    const { category, image } = route.params;
    const number = category.c_number
    return (
        <ScrollView style={styles.container}>
            {/* <FontAwesome name="heartbeat" size={60} color="#E95060" /> */}
            <Image
                    style={styles.tinyLogo}
                    source={{ uri: image }}
                // source={itemData.item.image}
                />
            <Text style={styles.text}>{category.c_name}</Text>
        
            <Text style={{textAlign: "left", fontSize: 16 }}>    {category.c_detail}</Text>
            <TouchableOpacity style={styles.phone} onPress={() => { Linking.openURL('tel:'+number); }}>
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
    },
    tinyLogo: {
        width: 160,
        height: 160,
        alignSelf: "center",
    },
});

export default ServiceDetail;
