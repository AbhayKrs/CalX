import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Pressable, Text, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const NavRoot = (props) => {
    const [curRoute, setCurRoute] = useState("Home");
    const [trackAll, setTrackAll] = useState(false);
    const { colorScheme, setColorScheme } = useColorScheme();

    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();

    const threeMonths = (period, date) => {
        const mnth = date.getMonth();
        switch (period) {
            case 'ahead': {
                date.setMonth(mnth + 6);
                return date;
            }
            case 'prior': {
                date.setMonth(mnth - 6);
                return date;
            }
            default: return null;
        }
    }

    const getDaysArray = (start, end) => {
        let dates = [];
        const theDate = new Date(start)
        while (theDate < new Date(end)) {
            dates = [...dates, new Date(theDate)]
            theDate.setDate(theDate.getDate() + 1)
        }
        dates = [...dates, new Date(end)]
        return dates
    };

    useEffect(() => {
        (async function () {
            var trackerData = await AsyncStorage.getItem('tracker');
            if (trackerData) {
                trackerData = JSON.parse(trackerData);
                const today = new Date();
                const curTrack = trackerData.filter(item => new Date(item.id).toISOString().split('T')[0] == today.toISOString().split('T')[0]);
                console.log('curTrack', curTrack)
                if (curTrack.length > 0) {
                    setTrackAll(curTrack[0].trackAll);
                }
            } else {
                const arr = getDaysArray(threeMonths('prior', new Date()), threeMonths('ahead', new Date()));
                const tData = arr.map(item => {
                    return {
                        trackAll: false,
                        id: item,
                        checked: []
                    }
                })
                await AsyncStorage.setItem('tracker', JSON.stringify(tData));
            }
        })();
    }, []);

    const trackAll_Day = async () => {
        let trackerDate = await AsyncStorage.getItem('tracker_date');
        let trackerDay = await AsyncStorage.getItem('tracker_day');
        let trackerData = await AsyncStorage.getItem('tracker');
        trackerData = JSON.parse(trackerData);
        trackerDay = Math.floor(trackerDay);

        if (!trackerDate) {
            trackerDate = new Date();
            trackerDay = new Date().getDay();
        } else {
            trackerDate = new Date(trackerDate);
        }

        let trackAll_Checklist = [];

        if (trackAll) {
            const targetID = trackerData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == new Date(trackerDate).toISOString().split('T')[0]);
            trackerData[targetID].checked = [];
            await AsyncStorage.setItem('tracker', JSON.stringify(trackerData));
        } else {
            console.log('test', trackerDay)
            switch (trackerDay) {
                case 0: {
                    trackAll_Checklist = [`d0w0_${trackerDate.getDate()}`, `d0w1_${trackerDate.getDate()}`, `d0w2_${trackerDate.getDate()}`, `d0w2_${trackerDate.getDate()}`, `d0w4_${trackerDate.getDate()}`, `d0w5_${trackerDate.getDate()}`, `d0w6_${trackerDate.getDate()}`, `d0e0_${trackerDate.getDate()}`, `d0e1_${trackerDate.getDate()}`, `d0e2_${trackerDate.getDate()}`, `d0e3_${trackerDate.getDate()}`, `d0e4_${trackerDate.getDate()}`, `d0e5_${trackerDate.getDate()}`, `d0c0_${trackerDate.getDate()}`, `d0c1_${trackerDate.getDate()}`, `d0c2_${trackerDate.getDate()}`]
                    break;
                };
                case 1: {
                    trackAll_Checklist = [`d1w0_${trackerDate.getDate()}`, `d1w1_${trackerDate.getDate()}`, `d1w2_${trackerDate.getDate()}`, `d1w2_${trackerDate.getDate()}`, `d1w4_${trackerDate.getDate()}`, `d1w5_${trackerDate.getDate()}`, `d1w6_${trackerDate.getDate()}`, `d1e0_${trackerDate.getDate()}`, `d1e1_${trackerDate.getDate()}`, `d1e2_${trackerDate.getDate()}`, `d1e3_${trackerDate.getDate()}`, `d1e4_${trackerDate.getDate()}`, `d1e5_${trackerDate.getDate()}`, `d1c0_${trackerDate.getDate()}`, `d1c1_${trackerDate.getDate()}`, `d1c2_${trackerDate.getDate()}`]
                    break;
                };
                case 3: {
                    trackAll_Checklist = [`d3w0_${trackerDate.getDate()}`, `d3w1_${trackerDate.getDate()}`, `d3w2_${trackerDate.getDate()}`, `d3w2_${trackerDate.getDate()}`, `d3w4_${trackerDate.getDate()}`, `d3w5_${trackerDate.getDate()}`, `d3w6_${trackerDate.getDate()}`, `d3e0_${trackerDate.getDate()}`, `d3e1_${trackerDate.getDate()}`, `d3e2_${trackerDate.getDate()}`, `d3e3_${trackerDate.getDate()}`, `d3e4_${trackerDate.getDate()}`, `d3e5_${trackerDate.getDate()}`, `d3c0_${trackerDate.getDate()}`, `d3c1_${trackerDate.getDate()}`, `d3c2_${trackerDate.getDate()}`]
                    break;
                };
                case 4: {
                    trackAll_Checklist = [`d4w0_${trackerDate.getDate()}`, `d4w1_${trackerDate.getDate()}`, `d4w2_${trackerDate.getDate()}`, `d4w2_${trackerDate.getDate()}`, `d4w4_${trackerDate.getDate()}`, `d4w5_${trackerDate.getDate()}`, `d4w6_${trackerDate.getDate()}`, `d4e0_${trackerDate.getDate()}`, `d4e1_${trackerDate.getDate()}`, `d4e2_${trackerDate.getDate()}`, `d4e3_${trackerDate.getDate()}`, `d4e4_${trackerDate.getDate()}`, `d4e5_${trackerDate.getDate()}`, `d4c0_${trackerDate.getDate()}`, `d4c1_${trackerDate.getDate()}`, `d4c2_${trackerDate.getDate()}`]
                    break;
                };
                case 5: {
                    trackAll_Checklist = [`d5w0_${trackerDate.getDate()}`, `d5w1_${trackerDate.getDate()}`, `d5w2_${trackerDate.getDate()}`, `d5w2_${trackerDate.getDate()}`, `d5w4_${trackerDate.getDate()}`, `d5w5_${trackerDate.getDate()}`, `d5w6_${trackerDate.getDate()}`, `d5e0_${trackerDate.getDate()}`, `d5e1_${trackerDate.getDate()}`, `d5e2_${trackerDate.getDate()}`, `d5e3_${trackerDate.getDate()}`, `d5e4_${trackerDate.getDate()}`, `d5e5_${trackerDate.getDate()}`, `d5c0_${trackerDate.getDate()}`, `d5c1_${trackerDate.getDate()}`, `d5c2_${trackerDate.getDate()}`]
                    break;
                };
                case 6: {
                    trackAll_Checklist = [`d6w0_${trackerDate.getDate()}`, `d6w1_${trackerDate.getDate()}`, `d6w2_${trackerDate.getDate()}`, `d6w2_${trackerDate.getDate()}`, `d6w4_${trackerDate.getDate()}`, `d6w5_${trackerDate.getDate()}`, `d6w6_${trackerDate.getDate()}`, `d6e0_${trackerDate.getDate()}`, `d6e1_${trackerDate.getDate()}`, `d6e2_${trackerDate.getDate()}`, `d6e3_${trackerDate.getDate()}`, `d6e4_${trackerDate.getDate()}`, `d6e5_${trackerDate.getDate()}`, `d6c0_${trackerDate.getDate()}`, `d6c1_${trackerDate.getDate()}`, `d6c2_${trackerDate.getDate()}`]
                    break;
                };
            }
            const targetID = trackerData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == new Date(trackerDate).toISOString().split('T')[0]);
            trackerData[targetID].checked = trackAll_Checklist;
            console.log(trackerData);
            await AsyncStorage.setItem('tracker', JSON.stringify(trackerData));
        }
    }

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
                            {/* <ThemeToggle /> */}
                            <Pressable onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}>
                                <Text>Tog</Text>
                            </Pressable>
                            <CheckBox
                                size={28}
                                checked={trackAll}
                                checkedColor="#059669"
                                uncheckedColor="#059669"
                                containerStyle={{ padding: 0, backgroundColor: 'transparent' }}
                                onPress={async () => {
                                    setTrackAll(!trackAll);
                                    trackAll_Day();
                                }}
                            />
                        </View>
                    </View>
                ),
                tabBarStyle: {
                    // position: 'absolute',
                    borderTopWidth: 0,
                    paddingHorizontal: 10,
                    // borderRadius: 10,
                    // marginHorizontal: 10,
                    // marginBottom: 5,
                    height: 60,
                    backgroundColor: "#52525b",
                },
                tabBarItemStyle: {
                    margin: 5,
                    borderRadius: 5,
                    padding: 5
                },
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#059669',
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
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name="dumbbell" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Tracker"
                component={Tracker}
                options={{
                    tabBarLabel: 'Tracker',
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name="silverware-fork-knife" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Ledger"
                component={Ledger}
                options={{
                    tabBarLabel: 'Ledger',
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name="notebook" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name="account" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <MCIcon name="cog" size={24} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    ),
                }} />

        </Tab.Navigator >
    )
}

export default NavRoot;