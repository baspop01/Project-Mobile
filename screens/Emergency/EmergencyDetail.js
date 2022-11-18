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
    Linking,
    Image
} from "react-native"
import { CATEGORIES } from "../../data/data";
import { FontAwesome } from '@expo/vector-icons';
import Axios from "axios";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";



const EmergencyDetail = ({ navigation, route }) => {
    const { prev, categoryId, image, search } = route.params;
    const [category, setCategory] = useState([]);
    const [msg, setMsg] = useState("");

    const getCategoryBySearch = (data) => {
        Axios.get("http://localhost:3000/category").then((res) => {
            let val = res.data.filter(val => {
                return data.includes(val.id.toString())
            })
            setMsg("")
            setCategory(val);
        }).catch((error) => {
            console.log("Api call error");
            alert(error.message);
        });

    }
    
    const getCategory = () => {
        Axios.get("http://localhost:3000/category").then((res) => {
            if(categoryId == "none"){
                setMsg("ไม่มีคำที่ค้นหา")
            }
            let val = res.data.filter((val) => {
                return val.c_type == categoryId
            })
            setCategory(val);
        }).catch((error) => {
            console.log("Api call error");
            alert(error.message);
        });
    }
    const getSearch = (searchData) => {
        var check = true;
        Axios.get("http://localhost:3000/keyword").then((res) => {
            res.data.map((data) => {
                if (data.keyword == searchData) {
                    var array = data.category.split(',')
                    check = false
                    getCategoryBySearch(array)
                }
            })
        }).catch((error) => {
            console.log("Api call error");
            alert(error.message);
        });
        if(check){
            Axios.get("http://localhost:3000/search", {
                params: {
                    search: search,
                }
            }).then((res) => {
                if (res.data.length == 0){
                    setMsg("ไม่มีคำที่ค้นหา")
                }
                setCategory(res.data)
            }).catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
        }
    }
    useEffect(() => {
        if (search.length > 0) {
            getSearch(search)
        } else {
            getCategory()
        }
    }, [])

    const renderCategories = (itemData) => {
        const Img = () => {
            var img = image;
            CATEGORIES.forEach((val) => {
                if (itemData.item.c_type == parseInt(val.id)) {
                    img = val.image
                }
            })
            return (
                <Image
                    style={styles.tinyLogo}
                    source={{ uri: img }}
                // source={itemData.item.image}
                />
            )
        }
        const number = itemData.item.c_number
        return (
            <View>

                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate("ServiceDetail", { prev: "EmergencyDetail", category: itemData.item, image: image })
                }}>
                    <View style={styles.box}>
                        <Img />
                        <View style={styles.name}>
                            <Text style={styles.text}>
                                {itemData.item.c_name}
                            </Text>
                            <Text style={[styles.text, { color: "#414370", fontSize: 28 }]}>
                                {itemData.item.c_number}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.phone} onPress={() => {
                            Linking.openURL('tel:' + number);
                        }}>
                            <FontAwesome name="phone" size={38} color="white" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView>
            <FlatList data={category} renderItem={renderCategories} numColumns={1} />
            <Text style={{textAlign: "center", fontSize: 25, margin: "25%"}}>{msg}</Text>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    box: {
        width: "100%",
        borderBottomWidth: 2,
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


    },
    icon: {
        // position: 'absolute',
        top: 0,
        left: 20
    },
    tinyLogo: {
        width: 80,
        height: 80,
    },
});

export default EmergencyDetail;
