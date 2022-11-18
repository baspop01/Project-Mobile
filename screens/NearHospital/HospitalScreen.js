import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet, TextInput, ScrollView, Linking } from 'react-native';
import Axios from "axios";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
//replace a LongdoMap.js file


const HospitalScreen = ({ navigation, route }) => {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [add, setAdd] = useState("loading location...");
    const [hospital, setHospital] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
            Axios.get(`https://api.longdo.com/map/services/address?lon=` + position.coords.longitude + `&lat=` + position.coords.latitude + `&noelevation=1&key=6f8f9684d64437812015368c00f313c4`).then((res) => {
                if (res.data.road == undefined){
                    var address = res.data.subdistrict + " " + res.data.district + " " + res.data.province + " " + res.data.postcode
                }else{
                    var address = res.data.road + " " + res.data.subdistrict + " " + res.data.district + " " + res.data.province + " " + res.data.postcode
                }
                setAdd(address)
                getHospital(position.coords.longitude, position.coords.latitude)
            })
        })
    }, [])
    const getHospital = (longtitude, latitude) => {
        Axios.get("http://localhost:3000/hospital").then((res) => {
            res.data.map((val) => {
                return val.distance = findDistance(val.hlon, val.hlat, longtitude, latitude, val)
            })

            res.data.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance) ? 1 : -1)
            setHospital(res.data)
        })
    }
    const getHospitalSerach = () => {
        setHospital([])
        if (search == ""){
            getHospital(lon, lat)
        }else{
            Axios.get("http://localhost:3000/searchHospital", {
                params: {
                    search: search,
                }
            }).then((res) => {
                res.data.map((val) => {
                    return val.distance = findDistance(val.hlon, val.hlat, lon, lat, val)
                })
    
                res.data.sort((a, b) => parseFloat(a.distance) > parseFloat(b.distance) ? 1 : -1)
                setHospital(res.data)
            })
        }
    }
    const findDistance = (lon1, lat1, lon2, lat2, data) => {
        var SURFACE_DISTANCE_PER_ONE_DEGREE = [
            { latitude: 110.574, longitude: 111.320 }, //0  degree
            { latitude: 110.649, longitude: 107.551 }, //15 degree
            { latitude: 110.852, longitude: 96.486 },  //30 degree
            { latitude: 111.132, longitude: 78.847 },  //45 degree
            { latitude: 111.412, longitude: 55.800 },  //60 degree  
            { latitude: 111.618, longitude: 28.902 },  //75 degree
            { latitude: 111.694, longitude: 0.000 }    //90 degree
        ];
        var latitudeDistance1 = SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(lat1 / 15)].latitude * 1000; //a1
        var latitudeDistance2 = SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(lat2 / 15)].latitude * 1000 //a2

        var longitudeDistance1 = SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(lon1 / 15)].latitude * 1000; //b1
        var longitudeDistance2 = SURFACE_DISTANCE_PER_ONE_DEGREE[parseInt(lon2 / 15)].latitude * 1000; //b2
        var power1 = Math.pow((lat2 * latitudeDistance2) - (lat1 * latitudeDistance1), 2);
        var power2 = Math.pow((lon2 * longitudeDistance2) - (lon1 * longitudeDistance1), 2);
        return (Math.sqrt(power1 + power2) / 1000).toFixed(2);
    }
    const renderHospital = (itemData) => {
        const TypeH = () => {
            if (itemData.item.htype == "private") {
                return (
                    <View>
                        <FontAwesome5 name="hospital" size={60} color="blue" />
                        <Text style={[styles.textLogo, { color: "blue" }]}>เอกชน</Text>
                    </View>
                )
            }
            else {
                return (
                    <View>
                        <FontAwesome5 name="hospital" size={60} color="red" />
                        <Text style={[styles.textLogo, { color: "red" }]}>รัฐบาล</Text>
                    </View>
                )
            }
        }
        return (
            <View>
                <TouchableOpacity style={styles.category} onPress={() => {
                    navigation.navigate("HospitalDetail", { prev: "HospitalScreen", hospital: itemData.item, lon: lon, lat: lat })
                }}>
                    <View style={styles.box}>
                        <TypeH />
                        <View style={styles.name}>
                            <Text style={styles.text}>
                                {itemData.item.hname}
                            </Text>
                            <Text style={styles.distance}>{itemData.item.distance} กม.</Text>
                            <Text style={[styles.text, { color: "#414370", fontSize: 22 }]}>
                                {itemData.item.hphone}
                                <TouchableOpacity
                                    style={styles.icon}
                                    onPress={() => onFavorite(itemData.item.id)}
                                >
                                   
                                </TouchableOpacity>
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.phone} onPress={() => {
                            Linking.openURL('tel:' + "081");
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
        <ScrollView style={{ height: "100%" }}>
            <View style={styles.searchbar}>
                <TextInput onChangeText={(val) => {
                    setSearch(val)
                }} placeholder="ค้นหาโรงพยาบาล" style={{ backgroundColor: "white", borderRadius: 50, padding: 10, margin: 10, width: "60%" }}
                // onChangeText={(text) => searchFilterFunction(text)} value={search}
                />
                <TouchableOpacity onPress={() => {
                    getHospitalSerach()
                }} style={{ borderRadius: 50, backgroundColor: "white", padding: 10, margin: 10 }}>
                    <FontAwesome name="search" color={"black"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", padding: 20, borderBottomWidth: 2 }}>
                <FontAwesome name="map" size={38} color="green" />
                <Text style={{ fontSize: 18, margin: 10 }}>{add}</Text>
            </View>
            <FlatList data={hospital} renderItem={renderHospital} numColumns={1} />
        </ScrollView>
    );
}
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
    textLogo: {
        fontWeight: "bold",
        color: "#414370",
        fontSize: 18,
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
    searchbar: {
        backgroundColor: "#61D8CF",
        alignSelf: "center",
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 50,
        flexDirection: "row",
    },
    distance: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: 5,
        color: "green"
    }
});
export default HospitalScreen;
