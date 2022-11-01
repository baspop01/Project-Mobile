import React, { useRef } from "react";
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


const FavoriteScreen = ({ navigation }) => {
    const opacityVal = useRef(new Animated.Value(1)).current;
    const positionAni = useRef(new Animated.Value(0)).current;

    const position = positionAni.interpolate({
        inputRange: [0,1],
        outputRange: ["0deg", "360deg"],
    });

    const FavoriteScreen = () => {
        Animated.sequence([
            Animated.timing(opacityVal, {
                toValue: 0,
                duration: 1000,
            }),
            Animated.timing(opacityVal, {
                toValue: 1,
                duration: 1000,
            }),
            Animated.timing(positionAni, {
                toValue: 1,
                duration: 1000,
            }),
            Animated.timing(positionAni, {
                toValue: 0,
                duration: 1000,
            }),
        ]).start();
    };

    return (
        <View style={{ flexDirection: "column", height: "100%" }}>
            <Animated.Image style={{ width: 180, height: 150, alignSelf: "center", margin: 100, opacity: opacityVal, transform: [{ rotate: position}]  }} source={require("../../assets/it_logo.png")} />
            <View style={{ flexDirection: "column", flex: 1, }}>
                <Button title="FavoriteScreen" onPress={FavoriteScreen} />
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

export default FavoriteScreen;
