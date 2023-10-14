import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useColorScheme } from "nativewind";
import CalendarStrip from 'react-native-calendar-strip';
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "../components/List";

const Home = (props) => {
    const { colorScheme } = useColorScheme();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date().getDay());

    useState(() => {
        AsyncStorage.setItem('tracker_date', "");
        AsyncStorage.setItem('tracker_day', "");
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
        <SafeAreaView className="flex-1 bg-slate-200 dark:bg-neutral-800">
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
            <List selectedDay={selectedDay} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </SafeAreaView>
    )
}

export default Home;