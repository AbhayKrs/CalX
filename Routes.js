import React, { useState, useEffect } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { View, Image, Pressable, Text, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { CheckBox } from "@rneui/themed";
import { useColorScheme } from "nativewind";

import Home from "./src/screens/Home";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Tracker from "./src/screens/Tracker";
import Profile from "./src/screens/Profile";
import Settings from "./src/screens/Settings";
import Ledger from "./src/screens/Ledger";
import Routine from "./src/screens/Routine";
import Search from "./src/screens/Search";
import Weight from "./src/screens/Weight";
import Water from "./src/screens/Water";

const Root = ({ navigationRef }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            // className="dark"
            // initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    paddingHorizontal: 10,
                    height: 60,
                    backgroundColor: colorScheme === "dark" ? "#171717" : "#f1f5f9",
                },
                tabBarItemStyle: {
                    margin: 5,
                    borderRadius: 5,
                    padding: 5
                },
                tabBarShowLabel: false,
                // tabBarActiveBackgroundColor: '#059669',
                tabBarActiveTintColor: '#fcfcfc',
                tabBarInactiveTintColor: 'gray',
                headerMode: 'screen'
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="fitness" size={28} color={"#e11d48"} />
                            :
                            <Ionicons name="fitness-outline" size={28} color={colorScheme === "dark" ? "#fff" : "#000"} />

                    ),
                }} />
            <Tab.Screen
                name="Tracker"
                component={Tracker}
                options={{
                    tabBarLabel: 'Tracker',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="restaurant" size={24} color={"#e11d48"} />
                            :
                            <Ionicons name="restaurant-outline" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="search" size={28} color={"#e11d48"} />
                            :
                            <Ionicons name="search-outline" size={28} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Ledger"
                component={Ledger}
                options={{
                    tabBarLabel: 'Ledger',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="journal" size={24} color={"#e11d48"} />
                            :
                            <Ionicons name="journal-outline" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="person" size={26} color={"#e11d48"} />
                            :
                            <Ionicons name="person-outline" size={26} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <Ionicons name="settings" size={26} color={"#e11d48"} />
                            :
                            <Ionicons name="settings-outline" size={26} color={colorScheme === "dark" ? "#fff" : "#000"} />),
                }} />

        </Tab.Navigator >
    )

}

const Routes = ({ navigationRef }) => {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [curRoute, setCurRoute] = useState("Home");

    const Stack = createStackNavigator();
    const navigation = useNavigation();

    const showBackBtn = () => {
        if (curRoute === "Routine" || curRoute === "Weight" || curRoute === "Water") {
            return true;
        }
        return false;
    }

    return (
        <Stack.Navigator
            className="dark"
            initialRouteName="Root"
            screenListeners={() => ({
                state: () => {
                    navigation && navigation.getCurrentRoute() && setCurRoute(navigation.getCurrentRoute().name);
                },
            })}
            screenOptions={{
                header: () => (
                    <View className="flex flex-row justify-between w-full py-2 px-2 bg-slate-100 dark:bg-neutral-900">
                        <StatusBar backgroundColor={colorScheme === "light" ? "#f1f5f9" : "#171717"} barStyle={colorScheme === "light" ? "dark-content" : "light-content"} />
                        <View className="flex-row space-x-1">
                            {showBackBtn() &&
                                <Pressable className="flex flex-row items-center" onPress={() => navigation.navigate("Root")}>
                                    <Ionicons name="chevron-back" size={28} color={"#e11d48"} />
                                </Pressable>
                            }
                            <Pressable className="flex flex-row items-center space-x-2 px-1" onPress={() => navigation.navigate('Home')}>
                                <Image source={require("./assets/icons/appicon2.png")} className="h-6 w-6" />
                                <Text className="font-caviarbold text-2xl text-gray-800 dark:text-gray-200">fitzey</Text>
                            </Pressable>
                        </View>
                        <View className="flex-row items-center space-x-4">
                            <View className="flex-row items-center space-x-4">
                                <Pressable onPress={() => navigation.navigate("Weight")}>
                                    <Ionicons name="scale" size={24} color={curRoute === "Weight" ? "#e11d48" : colorScheme === "light" ? "#171717" : "#f1f5f9"} />
                                </Pressable>
                                <Pressable onPress={() => navigation.navigate("Water")}>
                                    <MaterialIcons name="water-drop" size={25} color={curRoute === "Water" ? "#e11d48" : colorScheme === "light" ? "#171717" : "#f1f5f9"} />
                                </Pressable>
                            </View>
                            <Pressable onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
                                <MCIcons name="circle-multiple" size={28} color={colorScheme === "light" ? "#171717" : "#f1f5f9"} />
                            </Pressable>
                        </View>
                    </View>
                ),
            }}
        >
            <Stack.Screen name="Root" component={Root} />
            <Stack.Screen name="Routine" component={Routine} />
            <Stack.Screen name="Weight" component={Weight} />
            <Stack.Screen name="Water" component={Water} />
        </Stack.Navigator>
    );
}

export default Routes;