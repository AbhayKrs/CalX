import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { useColorScheme } from "nativewind";
import CalendarStrip from 'react-native-calendar-strip';
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "../components/List";

const Home = ({ navigation }) => {
    const { colorScheme } = useColorScheme();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());

    useState(() => {
        AsyncStorage.setItem('tracker_date', "");
        AsyncStorage.setItem('tracker_day', "");
        console.log("navigation", navigation)
    }, [])

    const threeMonths = (period, date) => {
        const mnth = date.getMonth();
        switch (period) {
            case 'ahead': {
                date.setMonth(mnth + 2);
                return date;
            }
            case 'prior': {
                date.setMonth(mnth - 2);
                return date;
            }
            default: return null;
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-100 dark:bg-neutral-900">
            {
                AsyncStorage.getItem("tracked_routine").length > 0 ?
                    (
                        <CalendarStrip
                            scrollable
                            selectedDate={new Date()}
                            minDate={threeMonths('prior', new Date())}
                            maxDate={threeMonths('ahead', new Date())}
                            style={{ height: 70, marginTop: 10, marginHorizontal: 15, paddingVertical: 5, borderRadius: 10 }}
                            calendarColor={colorScheme === "dark" ? "#52525b" : "#cbd5e1"}
                            calendarHeaderStyle={{ color: colorScheme === "dark" ? "white" : 'black' }}
                            dateNumberStyle={{ color: colorScheme === "dark" ? "white" : 'black' }}
                            dateNameStyle={{ color: colorScheme === "dark" ? "white" : 'black' }}
                            highlightDateNameStyle={{ color: '#f43f5e' }}
                            highlightDateNumberStyle={{ color: '#f43f5e' }}
                            iconContainer={{ flex: 0.1 }}
                            onDateSelected={async (date) => {
                                const dt = new Date(date);
                                setSelectedDay(dt.getDay());
                                setSelectedDate(dt);
                                AsyncStorage.setItem('tracker_date', dt + "");
                                AsyncStorage.setItem('tracker_day', dt.getDay() + "");
                            }}
                        />
                    ) :
                    (
                        <View className="mx-5">
                            <Text className="font-robotobold text-lg text-black dark:text-white">Active Routine: ---</Text>
                            <Pressable
                                accessibilityLabel="Learn more about this purple button"
                                onPress={() => navigation.navigate("Routine")}
                                className="items-center justify-center bg-rose-600 rounded-md mt-2 px-4 py-3"
                            >
                                <Text className="font-caviarbold text-white">Create a Routine</Text>
                            </Pressable>
                            <View className="mt-3">
                                <Text className="font-josefinlight text-black dark:text-white">
                                    You have not tracked any workout routine yet.
                                    {"\n"}
                                    Select a workout routine or track individual exercises.
                                </Text>
                            </View>
                        </View>
                    )
            }
            {/* <List selectedDay={selectedDay} selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> */}
        </SafeAreaView>
    )
}

export default Home;