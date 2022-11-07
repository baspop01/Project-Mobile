import React, { useState, useEffect } from 'react';
import { longdo, map, LongdoMap } from '../../LongdoMap.js';
import { TouchableOpacity, View, Text } from 'react-native';
import Axios from "axios";
//replace a LongdoMap.js file

const HospitalScreen = ({ navigation, route }) => {
    const [lat, setLat] = useState();
    const [lon, setLon] = useState();
    const [add, setAdd] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude)
            setLon(position.coords.longitude)
        })
    })
    const initMap = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const marker = new longdo.Marker({ lon: position.coords.longitude, lat: position.coords.latitude });
            map.Layers.setBase(longdo.Layers.GRAY);
            map.Overlays.add(marker);
        })
    }
    const getAddress = () => {
        Axios.get(`https://api.longdo.com/map/services/address?lon=` + lon + `&lat=` + lat + `&noelevation=1&key=6f8f9684d64437812015368c00f313c4`).then((res) => {
            setAdd(res.data)
        })
        const marker = new longdo.Marker({ lon: 100.55537544163074, lat: 13.740708813065979 });
        map.Route.add(marker);
        map.Route.add({ lon: 100.52151408640547, lat: 13.719364822311654 });
        map.Route.search();
        // map.Layers.setBase(longdo.Layers.GRAY);
        // map.Overlays.add(marker);
    }
    const mapKey = '6f8f9684d64437812015368c00f313c4'
    return (
        <View style={{ height: "100%" }}>
            <LongdoMap id="longdo-map" mapKey={mapKey} callback={initMap} />
            <TouchableOpacity style={{ width: 100, height: 100, backgroundColor: "blue", alignSelf: "center" }} onPress={getAddress}>
                <Text style={{ padding: 40, color: "white" }}>กดสิๆ</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, margin: 20 }}>{add.road} {add.subdistrict} {add.district} {add.province} {add.postcode}</Text>
        </View>
    );
}

export default HospitalScreen;