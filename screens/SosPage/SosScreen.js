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
    Easing
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import sos1 from '../../assets/sos1.mp3';
import sos2 from '../../assets/sos2.mp3';
import sos3 from '../../assets/sos3.mp3';
import { useState } from "react";
// import DarkMode from "../../src/DarkMode.css"
const SettingScreen = ({ navigation }) => {
    const [audioCheck, setAudio] = useState(false);
    const [fontColor, setFontColor] = useState("white");
    const [sos, setSos] = useState("1");
    const myRef = useRef();
    const audioPlay = () => {
        let isPlaying = audioCheck
        if (isPlaying) {
            myRef.current.pause();
            myRef.current.currentTime = 0;
            myRef.current.loop = false
        } else {
            myRef.current.play();
            myRef.current.loop = true
        }
        setAudio(!isPlaying)
    }
    let val = sos1;
    if(sos == 1){
        val = sos1;
    }else if (sos == 2){
        val = sos2
    }else if (sos == 3){
        val = sos3
    }
    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: "#EDEDED" }}>
            <audio
                ref={myRef}
                src={val}
            />
            <TouchableOpacity style={[styles.btn, {backgroundColor: audioCheck ? "#940000" : "#D80000"}]} onPress={audioPlay}>
                <Text style={[styles.sos, { color: audioCheck ? "gray" : "white", backgroundColor: audioCheck ? "#940000" : "#D80000" }]}>SOS</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 25, color: "#D80000", alignSelf: "center", marginTop: 40 }}> WARNING! LOUD NOISE</Text>
            <View style={{flexDirection: "row", alignContent: "space-between"}}>
                <TouchableOpacity style={[styles.change, {backgroundColor: sos != 1 ? "#D80000": "#940000"}]} onPress={()=> {
                    setSos(1)
                    setAudio(false)
                }}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Vol 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.change, {backgroundColor: sos != 2 ? "#D80000": "#940000"}]}onPress={()=> {
                    setSos(2)
                    setAudio(false)
                }}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Vol 2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.change, {backgroundColor: sos != 3 ? "#D80000": "#940000"}]}onPress={()=> {
                    setSos(3)
                    setAudio(false)
                }}>
                    <Text style={{color: "white", fontWeight: "bold"}}>Vol 3</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#D80000",
        padding: 40,
        borderRadius: 100
    },
    sos: {
        borderRadius: "100%",
        borderWidth: 5,
        padding: 25,
        fontSize: 80,
        position: 'relative',
        alignSelf: 'center',
    },
    change: {
        marginTop: 50,
        margin: 30,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 20
    }
});

export default SettingScreen;
