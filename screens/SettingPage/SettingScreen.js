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
// import DarkMode from "../../src/DarkMode.css"
const SettingScreen = ({ navigation }) => {



    return (
        <View style={{ flexDirection: "column", height: "100%" }}>
            <Text style={styles.changemode}>
                Change Mode
            </Text>
            <Text style={styles.changetab}>
                Change Color Tab
            </Text>
            
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    changemode: {
        backgroundColor: "red",
        height: "60px",
        fontSize: "24px"
    },
    changetab: {
        backgroundColor: "pink",
        height: "60px",
        fontSize: "24px"
    }
});

export default SettingScreen;
