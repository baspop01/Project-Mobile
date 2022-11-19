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
    ScrollView,
    Dimensions
} from "react-native";
import Axios from "axios";
import { useState, useEffect } from "react";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { FontAwesome } from '@expo/vector-icons';
import { Fade } from "native-base";

const StatisticsScreen = ({ navigation }) => {
    const [statis, setStatis] = useState([]);
    const [totalList, setTotalList] = useState([]);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };
    const state = ["กรุงเทพและปริมณฑล", "ภาคเหนือ", "ภาคใต้", "ภาคกลาง", "ภาคตะวันตก", "ภาคตะวันออก", "ภาคอีสาน"]

    const getstat = () => {
        Axios.get("http://localhost:3000/statistics").then((res) => {
            setStatis(res.data)
            getTotal(res.data)

        })
    }
    const getTotal = (data) => {
        var dataList = []
        for (let index = 1; index <= 7; index++) {
            var itemAll = data.filter((item) => {
                return item.type == index
            })
            var dataAll = 0
            itemAll.map((item) => {
                dataAll += item.total
            })
            dataList.push({
                name: state[index - 1],
                total: parseFloat((dataAll / 1000).toFixed(2)),
                color: "#" + Math.floor(Math.random() * 16777215).toString(16)
            })
        }
        setTotalList(dataList)
    }
    useEffect(() => {
        getstat()
    }, [])

    const renderStatisTotal = (itemData) => {
        return (
            <View style={{ flexDirection: "row", margin: 10 }}>
                <FontAwesome name="bookmark" size={15} color={itemData.item.color} />
                <Text style={{fontSize: 11}}> {itemData.item.name} : {itemData.item.total}K คน</Text>
            </View>
        )
    }


    const renderStatisBankok = (itemData) => {
        const Bankok = () => {
            // console.log(itemData.item)
            if (itemData.item.type == 1) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <Bankok />
        )
    }
    const renderStatisNorth = (itemData) => {
        const North = () => {
            if (itemData.item.type == 2) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <North />
        )
    }
    const renderStatisSouth = (itemData) => {
        const South = () => {
            if (itemData.item.type == 3) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <South />
        )
    }
    const renderStatisKlang = (itemData) => {
        const Klang = () => {

            if (itemData.item.type == 4) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <Klang />
        )
    }
    const renderStatisWest = (itemData) => {
        const West = () => {
            if (itemData.item.type == 5) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <West />
        )
    }
    const renderStatisEast = (itemData) => {
        const East = () => {
            if (itemData.item.type == 6) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <East />
        )
    }
    const renderStatisEsan = (itemData) => {
        const Esan = () => {
            if (itemData.item.type == 7) {
                return (
                    <View style={{ textAlign: "left", marginBottom: 10 }}>
                        <Text><Text style={{ fontWeight: "bold", fontSize: 16 }}>{itemData.item.province}</Text> มียอดทั้งหมด {itemData.item.total} คน</Text>
                        <Text>เสียชีวิต {itemData.item.die} คน บาดเจ็บ {itemData.item.injured} คน และพิการ {itemData.item.disability} คน</Text>
                    </View>
                )
            }
        }
        return (
            <Esan />
        )
    }
    if (totalList.length > 0) {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.text}>
                    สถิติข้อมูลผู้เสียชีวิต บาดเจ็บ และพิการจากอุบัติเหตุในแต่ละภูมิภาคของประเทศไทย ปี 2565
                </Text>
                <Text style={{fontSize: 11, textAlign: "left"}}>ขอบคุณข้อมูลจาก ศูนย์ข้อมูลอุบัติเหตุ ThaiRSC</Text>
                <View style={{ alignSelf: "center" }}>
                    <PieChart
                        data={totalList}
                        width={windowWidth}
                        height={windowHeight / 2}
                        chartConfig={chartConfig}
                        accessor={"total"}
                        backgroundColor={"transparent"}
                        paddingLeft={windowWidth / 4}
                        center={[0, 0]}
                        absolute
                        hasLegend={false}
                    />
                </View>
                <FlatList data={totalList} initialNumToRender={totalList.length} renderItem={renderStatisTotal} numColumns={2} />
                <View style={{ flexDirection: "row", marginTop: 20}}>
                    <FontAwesome name="bookmark" size={25} color={totalList[0].color} />
                    <Text style={styles.text2}>
                        กรุงเทพและปริมณฑล
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisBankok} numColumns={1} />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FontAwesome name="bookmark" size={25} color={totalList[1].color} />
                    <Text style={styles.text2}>
                        ภาคกลาง
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisKlang} numColumns={1} />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FontAwesome name="bookmark" size={25} color={totalList[2].color} />
                    <Text style={styles.text2}>
                        ภาคเหนือ
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisNorth} numColumns={1} />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FontAwesome name="bookmark" size={25} color={totalList[3].color} />
                    <Text style={styles.text2}>
                        ภาคใต้
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisSouth} numColumns={1} />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FontAwesome name="bookmark" size={25} color={totalList[4].color} />
                    <Text style={styles.text2}>
                        ภาคอีสาน
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisEsan} numColumns={1} />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FontAwesome name="bookmark" size={25} color={totalList[5].color} />
                    <Text style={styles.text2}>
                        ภาคตะวันตก
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisWest} numColumns={1} />
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <FontAwesome name="bookmark" size={25} color={totalList[6].color} />
                    <Text style={styles.text2}>
                        ภาคตะวันออก
                    </Text>
                </View>
                <FlatList data={statis} initialNumToRender={statis.length} renderItem={renderStatisEast} numColumns={1} />
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        textAlign: "center",
        marginBottom: 20,
        padding: 20,
        height: "100%"
    },
    text: {
        fontSize: 23,
        fontWeight: "bold",
        color: "black",
        textAlign: "left",
        marginBottom: 20,
    },
    text2: {
        fontSize: 24,
        textAlign: "left",
        fontWeight: "bold",
        marginLeft: 10
    }
});

export default StatisticsScreen;
