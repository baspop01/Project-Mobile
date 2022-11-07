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

const SettingScreen = ({ navigation }) => {


    const sizeVal = useRef(new Animated.Value(0.3)).current;
    const positionAni = useRef(new Animated.Value(0)).current;


    const position = positionAni.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75,  1],
        outputRange: ["0px", "-50px", "0px", "50px", "0px"],
    });




    const SettingScreen = () => {
        Animated.parallel([
            Animated.spring(sizeVal, {
                toValue: 1,
                friction: 1,
            }),
            Animated.timing(positionAni, {
                toValue: 1,
                duration: 5000,
                easing: Easing.bounce
            })
        ]).start();

    };
    return (
        <View style={{ flexDirection: "column", height: "100%" }}>
            <Animated.Image style={{ width: 180, height: 150, alignSelf: "center", margin: 100, transform: [{ scale: sizeVal }] }} source={require("../../assets/it_logo.png")} />
            <Animated.View style={{alignSelf: "center", margin: 20, transform: [{ translateX: position }] }}>
                <Text style={{ color: "orange", fontSize: 20}}>Welcome to Faculty of IT!!</Text>
            </Animated.View>

            <View style={{ flexDirection: "column", flex: 1, }}>
                <Button title="SettingScreen" onPress={SettingScreen} />
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
});

export default SettingScreen;
