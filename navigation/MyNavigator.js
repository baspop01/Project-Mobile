import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import EmergencyScreen from "../screens/Emergency/EmergencyScreen";
import HospitalScreen from "../screens/NearHospital/HospitalScreen";
import PoliceStationScreen from "../screens/PoliceArea/PoliceStationScreen";
import StatisticsScreen from "../screens/Statistics/StatisticsScreen";
import SosScreen from "../screens/SosPage/SosScreen";
import EmergencyDetail from "../screens/Emergency/EmergencyDetail";
import ServiceDetail from "../screens/Emergency/ServiceDetail";
import HospitalDetail from "../screens/NearHospital/HospitalDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EmergencyNavigator() {
  return (
    <Stack.Navigator initialRouteName="Emergency">
      <Stack.Screen name="Emergency" component={EmergencyScreen} options={{
        headerStyle: {
          backgroundColor: "#61D8CF"
        }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 30 }, headerTitleAlign: "center", headerTitle: "สายด่วนฉุกเฉิน"
      }} />
      <Stack.Screen name="EmergencyDetail" component={EmergencyDetail} options={
        ({ route }) => ({
          headerStyle: {
            backgroundColor: "#61D8CF"
          }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 30 }, headerTitleAlign: "center", headerTitle: route.params.title
        })
      } />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={
        ({ route }) => ({
          headerStyle: {
            backgroundColor: "#61D8CF"
          }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 20 }, headerTitleAlign: "center", headerTitle: route.params.category.c_name
        })
      } />
    </Stack.Navigator>
  );
};
function HospitalNavigator() {
  return (
    <Stack.Navigator initialRouteName="Near Hospital">
      <Stack.Screen name="Near Hospital" component={HospitalScreen} options={{
        headerStyle: {
          backgroundColor: "#61D8CF"
        }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 30 }, headerTitleAlign: "center", headerTitle: "โรงพยาบาลใกล้ฉัน"
      }} />
      <Stack.Screen name="HospitalDetail" component={HospitalDetail} options={
        ({ route }) => ({
          headerStyle: {
            backgroundColor: "#61D8CF"
          }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 20 }, headerTitleAlign: "center", headerTitle: route.params.title
        })
      } />
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={
        ({ route }) => ({
          headerStyle: {
            backgroundColor: "#61D8CF"
          }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 20 }, headerTitleAlign: "center", headerTitle: route.params.category.c_name
        })
      } />
    </Stack.Navigator>
  )
}
function TabNavigator() {
  return (
    // กำหนดรายละเอียดของ navigator
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: "#8AA2D4",
      tabBarInactiveTintColor: "#414370",
      tabBarStyle: { backgroundColor: "#61D8CF", height: "10%" },
      tabBarLabelStyle: { fontWeight: "bold", marginBottom: 5 },
    }} >

      <Tab.Screen name="Emergency" component={EmergencyNavigator} options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="call" size={35} color={color} />;
        }, headerShown: false
      }} />

      <Tab.Screen name="Near Hospital" component={HospitalNavigator} options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="location" size={35} color={color} />;
        }, headerShown: false
      }} />

      <Tab.Screen name="PS Area" component={PoliceStationScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="shield" size={35} color={color} />;
        }, headerStyle: {
          backgroundColor: "#61D8CF"
        }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 23 }, headerTitleAlign: "center", headerTitle: "ขอบเขตสถานีตำรวจนครบาล"
      }} />

      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="bar-chart" size={35} color={color} />;
        }, headerStyle: {
          backgroundColor: "#61D8CF"
        }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 30 }, headerTitleAlign: "center", headerTitle: "สถิติอุบัติเหตุ"
      }} />

      <Tab.Screen name="SOS" component={SosScreen} options={{
        tabBarIcon: ({ color, size }) => {
          return <Ionicons name="medical" size={35} color={color} />;
        }, headerStyle: {
          backgroundColor: "#61D8CF"
        }, headerTintColor: "#AF4242", headerTitleStyle: { fontWeight: "bold", fontSize: 30 }, headerTitleAlign: "center", headerTitle: "ขอความช่วยเหลือเร่งด่วน"
      }} />
    </Tab.Navigator>
  );
}

// สร้าง Navigator หลัก
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",

  },
});
