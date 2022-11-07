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
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Sarabun_100Thin,
  Sarabun_100Thin_Italic,
  Sarabun_200ExtraLight,
  Sarabun_200ExtraLight_Italic,
  Sarabun_300Light,
  Sarabun_300Light_Italic,
  Sarabun_400Regular,
  Sarabun_400Regular_Italic,
  Sarabun_500Medium,
  Sarabun_500Medium_Italic,
  Sarabun_600SemiBold,
  Sarabun_600SemiBold_Italic,
  Sarabun_700Bold,
  Sarabun_700Bold_Italic,
  Sarabun_800ExtraBold,
  Sarabun_800ExtraBold_Italic,
} from '@expo-google-fonts/sarabun';



const EmergencyScreen = ({ navigation }) => {



    const renderCategories = (itemData) => {
        return (
            <View >
                <TouchableOpacity style={styles.category} onPress={() => {

                    navigation.navigate("EmergencyDetail", { prev: "Emergency", categoryId: itemData.item.id, title: itemData.item.title, image: itemData.item.image })
                }}>
                    <View style={styles.box}>
                        <Image
                            style={styles.tinyLogo}
                            source={{uri: itemData.item.image}}
                            // source={itemData.item.image}
                        />
                    </View>
                    <Text style={styles.text}>
                        {itemData.item.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        //TabBar
        <ScrollView style={{alignSelf: "center"}}>
            <View style={styles.searchbar}>
                <TextInput placeholder="Search" style={{ backgroundColor: "white", borderRadius: 50, padding: 10, margin: 10, width: "60%" }} 
                // onChangeText={(text) => searchFilterFunction(text)} value={search}
          />
                <TouchableOpacity style={{ borderRadius: 50, backgroundColor: "white", padding: 10, margin: 10 }}>
                    <Ionicons name="search" color={"black"} size={20} />
                </TouchableOpacity>
            </View>
            <FlatList data={CATEGORIES} renderItem={renderCategories} numColumns={3}/>
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
        borderRadius:  50,
        flexDirection: "row",
    }
});

export default EmergencyScreen;

