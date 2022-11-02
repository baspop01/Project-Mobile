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
    Linking
} from "react-native"
import { CATEGORIES } from "../../data/data";
import { FontAwesome } from '@expo/vector-icons';
import Axios from "axios";
import { useState, useEffect } from "react";



const EmergencyDetail = ({ navigation, route }) => {
    const { prev, categoryId } = route.params;
    const [category, setCategory] = useState([]);
    const [number, setNumber] = useState('');
    const [check, setCheck] = useState(0);

    const getCategory = () => {
        Axios.get("http://localhost:3000/category").then((res) => {
            let val = res.data.filter((val) => {
                return val.c_type == categoryId
            }) 
            setCategory(val);
            setNumber(val.c_number)
            setCheck(1);
        }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }
    useEffect(() => {
        if(check == 0 ){
            getCategory()
        }
    })
    const renderCategories = (itemData) => {
        return (
            <View>

                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate("ServiceDetail", { prev: "EmergencyDetail", category: itemData.item })
                }}>
                    <View style={styles.box}>
                        <FontAwesome name="heartbeat" size={70} color="#E95060" />
                        <View style={styles.name}>
                            <Text style={styles.text}>
                                {itemData.item.c_name}
                            </Text>
                            <Text style={[styles.text, { color: "#414370", fontSize: 42 }]}>
                                {itemData.item.c_number}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.phone} onPress={() => {
                            Linking.openURL('tel:' + {number});
                            getTest()
                        }}>
                            <FontAwesome name="phone" size={38} color="white" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList data={category} renderItem={renderCategories} numColumns={1} />
    );
};

const styles = StyleSheet.create({
    box: {
        width: "100%",
        borderTopWidth: 2,
        flexDirection: "row",
        // justifyContent: 'space-around',
        padding: 15,
    },
    text: {
        fontWeight: "bold",
        textAlign: "left",
        color: "#AF4242",
        fontSize: 18,
        width: 180,
        marginLeft: 18,
        fontFamily: "Pridi-Regular"
    },
    name: {
        flexDirection: 'column',
        alignSelf: "left",
    },
    phone: {
        margin: 15,
        padding: 13.5,
        height: 60,
        width: 60,
        backgroundColor: "#008037",
        borderRadius: "100%",


    }
});

export default EmergencyDetail;
