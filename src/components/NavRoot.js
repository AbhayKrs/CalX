import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Pressable, Text, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { CheckBox } from "@rneui/themed";
import { useColorScheme } from "nativewind";

import Home from "../screens/Home";
import appIcon from "../../assets/images/appicon.png";
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import ThemeToggle from "./ThemeToggle";
import Tracker from "../screens/Tracker";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Ledger from "../screens/Ledger";
import Routine from "../screens/Routine";

const Workout = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Routine" component={Routine} />
        </Stack.Navigator>
    );
}

const NavRoot = ({ navigationRef }) => {
    const [curRoute, setCurRoute] = useState("Home");
    const { colorScheme, setColorScheme } = useColorScheme();

    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    return (
        <Tab.Navigator
            className="dark"
            initialRouteName="Home"
            screenListeners={() => ({
                state: () => {
                    navigation && navigation.getCurrentRoute() && setCurRoute(navigation.getCurrentRoute().name);
                },
            })}
            screenOptions={{
                header: () => (
                    <View className="flex-row items-center justify-between py-2 px-4 bg-slate-100 dark:bg-neutral-900">
                        <StatusBar backgroundColor={colorScheme === "light" ? "#f1f5f9" : "#171717"} barStyle={colorScheme === "light" ? "dark-content" : "light-content"} />
                        <Pressable className="flex flex-row items-center space-x-2" onPress={() => navigation.navigate('Home')}>
                            <Image source={appIcon} className="h-9 w-9" />
                            <Text className="font-caviarbold text-2xl text-gray-800 dark:text-gray-200">CalZ</Text>
                        </Pressable>
                        <View className="flex-row gap-2">
                            <Pressable onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
                                <Text>Tog</Text>
                            </Pressable>
                            <CheckBox
                                size={28}
                                checked={false}
                                checkedColor="#059669"
                                uncheckedColor="#059669"
                                containerStyle={{ padding: 0, backgroundColor: 'transparent' }}
                                onPress={() => { }}
                            />
                        </View>
                    </View>
                ),
                tabBarStyle: {
                    borderTopWidth: 0,
                    paddingHorizontal: 10,
                    height: 60,
                    backgroundColor: "#171717",
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
                component={Workout}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MCIcon name="dumbbell" size={28} color={focused ? "#059669" : colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Tracker"
                component={Tracker}
                options={{
                    tabBarLabel: 'Tracker',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MCIcon name="silverware-fork-knife" size={28} color={focused ? "#059669" : colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Ledger"
                component={Ledger}
                options={{
                    tabBarLabel: 'Ledger',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MCIcon name="notebook" size={28} color={focused ? "#059669" : colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MCIcon name="account" size={28} color={focused ? "#059669" : colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color, size }) => (
                        <MCIcon name="cog" size={28} color={focused ? "#059669" : colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />

        </Tab.Navigator >
    )
}

export default NavRoot;