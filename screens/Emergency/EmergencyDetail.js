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
    const [img, setImg] = useState("");
    const [recommended, setRecommended] = useState();

    const getCategoryBySearch = (data) => {
        let array = []
        for (let i = 1; i < data.length; i++) {
            array.push(data[i])
        }
        Axios.get("http://localhost:3000/category").then((res) => {
            let dataRec = res.data.filter(val => {
                return data[0] == val.id.toString();
            })
            console.log(dataRec)
            setRecommended(dataRec)
            let val = res.data.filter(val => {
                return array.includes(val.id.toString())
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
            if (categoryId == "none") {
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
        if (check) {
            Axios.get("http://localhost:3000/search", {
                params: {
                    search: search,
                }
            }).then((res) => {
                if (res.data.length == 0) {
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
    const renderRecommand = (itemData) => {
        const number = itemData.item.c_number
        return (
            <View>
                <TouchableOpacity style={[styles.category, { backgroundColor: "#ABFF7B" }]} onPress={() => {
                    navigation.navigate("ServiceDetail", { prev: "EmergencyDetail", category: itemData.item, image: getImage })
                }}>
                    <Text style={{ fontSize: 32, marginLeft: 20, marginTop: 5, fontWeight: "bold" }}>Recommended</Text>
                    <View style={styles.box}>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: "https://media.discordapp.net/attachments/821411238772080660/1036651136058400788/e51247c78df1852f.png" }}
                        // source={itemData.item.image}
                        />
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
    const renderCategories = (itemData) => {
        var getImage = ""
        const Img = () => {
            var img1 = image;
            CATEGORIES.forEach((val) => {
                if (itemData.item.c_type == parseInt(val.id)) {
                    img1 = val.image
                }
            })
            getImage = img1

            return (
                <Image
                    style={styles.tinyLogo}
                    source={{ uri: img1 }}
                // source={itemData.item.image}
                />
            )
        }
        const number = itemData.item.c_number
        return (
            <View>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate("ServiceDetail", { prev: "EmergencyDetail", category: itemData.item, image: getImage })
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
    if (recommended) {
        return (
            <ScrollView>
                <FlatList data={recommended} renderItem={renderRecommand} numColumns={1} />
                <FlatList data={category} renderItem={renderCategories} numColumns={1} />
                <Text style={{ textAlign: "center", fontSize: 25, margin: "25%" }}>{msg}</Text>
            </ScrollView>

        );
    } else {
        return (
            <ScrollView>
                <FlatList data={category} renderItem={renderCategories} numColumns={1} />
                <Text style={{ textAlign: "center", fontSize: 25, margin: "25%" }}>{msg}</Text>
            </ScrollView>

        );
    }
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
