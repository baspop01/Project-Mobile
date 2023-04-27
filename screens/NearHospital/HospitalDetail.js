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
    Linking,
} from "react-native";
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { longdo, map, LongdoMap } from '../../LongdoMap.js';
import Axios from "axios";


const HospitalDetail = ({ route }) => {
    const { hospital, lat, lon } = route.params;
    const [add, setAdd] = useState("loading location...");
    const initMap = () => {
        var marker2 = new longdo.Marker({ lon: hospital.hlon, lat: hospital.hlat }, {
            icon: {
                html: hospital.hname,
                offset: { x: 18, y: 21 }
              },
        });
        var marker1 = new longdo.Marker({ lon: lon, lat: lat });
        map.Route.add(marker1);
        map.Route.add(marker2);
        map.Route.search();
    }
    useEffect(() => {
        Axios.get(`https://api.longdo.com/map/services/address?lon=` + hospital.hlon + `&lat=` + hospital.hlat + `&noelevation=1&key=6f8f9684d64437812015368c00f313c4`).then((res) => {
            if(res.data.road == undefined ){
                res.data.road = ""
            }
            var address = res.data.road + " " + res.data.subdistrict + " " + res.data.district + " " + res.data.province + " " + res.data.postcode
            setAdd(address)
        })
    }, [])

    const mapKey = '6f8f9684d64437812015368c00f313c4'
    const number = hospital.hphone
    return (
        <ScrollView style={styles.container}>
            <View style={{height: "80%", width: "100%"}}>
                <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
            </View>
            <Text style={[styles.text, {fontSize: 25}]}>{hospital.hname}</Text>
            <Text style={styles.text}>{add}</Text>
            <Text style={styles.text}>ห่างประมาณ<Text style={styles.innerText}> {hospital.distance}</Text> กิโลเมตร</Text>
            <TouchableOpacity style={styles.phone} onPress={() => { Linking.openURL('tel:'+number); }}>
                <FontAwesome name="phone" size={40} color="white" />
            </TouchableOpacity>
            <Text style={[styles.text, { color: "#414370", fontSize: 20 }]}>
                {hospital.hphone}
            
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        textAlign: "center",
        marginBottom: 20,
    },
    text: {
        marginTop: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#414370",
        fontSize: 16
    },
    phone: {
        marginTop: 30,
        padding: 13,
        height: 60,
        width: 60,
        backgroundColor: "#008037",
        borderRadius: "100%",
        alignSelf: "center"
    },
    innerText: {
        color: 'red'
    }
});

export default HospitalDetail;
