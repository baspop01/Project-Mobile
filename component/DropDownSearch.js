import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
} from 'react-native';

export default function DropDownSearch(props, { navigation }) {
    const { listData } = props
    const getSearch = (data) => {
        if(data != "ไม่มีคำค้นหาที่ต้องการ"){
            props.func(data)
        }
    }
    return (
        <ScrollView
            // onPress={props.onPress}
            style={styles.container}>
            <View style={styles.subContainer}>
                {
                    listData.map(item => {
                        return (
                            <TouchableOpacity style={styles.itemView} key={item.id}  onPress={() => {
                                getSearch(item.keyword);
                            }}>
                                <Text style={styles.itemText}>{item.keyword}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '15%',
        left: 0, right: 0, bottom: 0,
        position: "absolute",
        zIndex: 200,
        marginTop: 10

    },
    subContainer: {
        backgroundColor: '#84DCC6',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 3,
        borderRadius: 20
    },
    itemView: {
        // marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
        margin: 5
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

});