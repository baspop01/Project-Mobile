import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
    View,
    Text,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Animated
} from "react-native";
import Axios from "axios";


const PoliceStationScreen = () => {
    const [gps, setGps] = useState("")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            Axios.get(`https://api.longdo.com/map/services/address?lon=` + position.coords.longitude + `&lat=` + position.coords.latitude + `&noelevation=1&key=6f8f9684d64437812015368c00f313c4`).then((res) => {
                var address = res.data.road + " " + res.data.subdistrict + " " + res.data.district + " " + res.data.province + " " + res.data.postcode
            })
            setGps(`https://www.google.com/maps/d/u/0/embed?mid=1doapjk1Xt5XpsSEKrb9uqttAwRQ&hl=en_US&ehbc=2E312F&ll=`+position.coords.latitude+`%2C`+position.coords.longitude+`&z=15`)
        })
    }, [gps])

    return (
        <View style={{height: "100%", width: "100%" }}>
            <iframe src={gps} width="100%" height="100%"></iframe>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default PoliceStationScreen;
