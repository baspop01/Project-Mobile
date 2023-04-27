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
import { useState, useEffect } from "react";
import Axios from "axios";
import DropDownSearch from "../../component/DropDownSearch";

const EmergencyScreen = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [listDropDown, setListDropDown] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    var keyword = [];
    const getKeyword = () => {
        Axios.get("http://localhost:3000/keyword").then((res) => {
            keyword = res.data
        }).catch((error) => {
            console.log("Api call error");
            alert(error.message);
        });
    };
    const dropDown = (val) => {
        var listData = keyword.filter((data) => {
            if (data.keyword.match(val)) {
                return data
            }
        })
        if (listData.length == 0) {
            listData = [{
                'id': 101,
                'keyword': 'ไม่มีคำค้นหาในลิสต์'
            }]
        }
        setListDropDown(listData)
        setIsSearch(true)
    };
    useEffect(() => {
        if (keyword.length <= 0) {
            getKeyword()
        }
    }, [search])

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
    const pullsearch = (data) => {
        setSearch(data)
    }

    return (
        //TabBar
        <ScrollView style={{ alignSelf: "center" }}>

            {
                isSearch
                &&
                <DropDownSearch listData={listDropDown} func={pullsearch}/>
            }
            <View style={styles.searchbar}>
                <TextInput onChangeText={(val) => {
                    setSearch(val);
                    if (val) {
                        dropDown(val);
                    }
                    else
                        setIsSearch(false)
                }} placeholder="ค้นหาบริการฉุกเฉิน" value={search} style={{ backgroundColor: "white", borderRadius: 50, padding: 10, margin: 10, width: "60%" }}
                />
                <TouchableOpacity style={{ borderRadius: 50, backgroundColor: "white", padding: 10, margin: 10 }} onPress={() => {
                    navigation.navigate("EmergencyDetail", { prev: "Emergency", search: search, title: search, image: "", categoryId: "none" })
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
    },
    searchList: {
        position: "absolute"
    }
});

export default EmergencyScreen;