import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable } from "react-native";
import { useState, useRef } from 'react';
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import Chart from "../components/Chart";
import LineChart from "../components/LineChart";

const Weight = ({ navigation }) => {
    const { colorScheme } = useColorScheme();

    const [startWeight, setStartWeight] = useState(99.99);
    const [currWeight, setCurrWeight] = useState(0);
    const [tarWeight, setTarWeight] = useState(72);

    const [isTracked, setIsTracked] = useState(false);

    const [w1, setW1] = useState(0);
    const [w2, setW2] = useState(0);

    const [activePoint, setActivePoint] = useState(null); // To track the active (hovered/pressed) point

    const w1Ref = useRef(null);
    const w2Ref = useRef(null);

    const onW1in = (text) => {
        if (text.length === 0) {
            setW1(0);
        } else {
            setW1(text);
        }
        setCurrWeight(text);
        if (text.length === 2) {
            w2Ref.current.focus();
        }

    }
    const onW2in = (text) => {
        setW2(text);
        setCurrWeight(Number(w1) + Number(text) / 100);
        if (text.length === 0) {
            w1Ref.current.focus();
        }
    }

    const historyData = [87.5, 87, 86, 86, 84, 82, 81, 79, 78, 76, 75, 74, 70, 70, 68];

    return (
        <SafeAreaView className="flex-1 p-2 bg-slate-100 dark:bg-neutral-900">
            <ScrollView className="flex-col space-y-4">
                <View className="flex-row space-x-2 py-1 px-2">
                    <View className="flex-1 flex-col items-start">
                        <Text className="font-nunito text-sm text-neutral-600 dark:text-gray-400">Current</Text>
                        <View className="flex-row space-x-0.5 items-end">
                            <Text adjustsFontSizeToFit className="font-nunitobold pt-2 text-4xl text-neutral-800 dark:text-gray-200">{startWeight}</Text>
                            <Text adjustsFontSizeToFit className="font-nunito text-xs pb-2.5 text-neutral-600 dark:text-gray-300">Kgs</Text>
                        </View>
                        <View className="flex flex-row space-x-1">
                            <Ionicons name="pulse" size={16} color={colorScheme === "light" ? "#059669" : "#10b981"} />
                            <Text adjustsFontSizeToFit className="font-nunitobold tracking-wide text-xs pt-0.5 text-emerald-600 dark:text-emerald-500 rounded-md">-3.75Kgs</Text>
                        </View>
                    </View>
                    <View className="flex-1 flex-col items-start">
                        <Text className="font-nunito text-sm text-neutral-600 dark:text-gray-400">Target</Text>
                        <View className="flex-row space-x-0.5 items-end">
                            <Text adjustsFontSizeToFit className="font-nunitobold pt-2 text-4xl text-neutral-800 dark:text-gray-200">{tarWeight}</Text>
                            <Text adjustsFontSizeToFit className="font-nunitobold text-xs pb-2.5 text-neutral-600 dark:text-gray-300">Kgs</Text>
                        </View>
                        <View className="flex flex-row space-x-1">
                            <Text adjustsFontSizeToFit className="font-nunitobold tracking-wide text-xs pt-0.5 text-neutral-600 dark:text-gray-400 rounded-md">at current rate ~86 days</Text>
                        </View>
                    </View>
                </View>
                <View className="h-0.5 w-full bg-gray-300/10 rounded-lg"></View>
                <View className="flex-col items-center">
                    <Text className="font-nunito text-lg text-neutral-800 dark:text-gray-300">Today's Entry</Text>
                    {isTracked === true ?
                        <View className="flex-row space-x-1">
                            {/* <Ionicons name="flash" size={18} color={colorScheme === "light" ? "#fbbf24" : "#fbbf24"} /> */}
                            <Text className="font-nunito text-sm text-neutral-600 dark:text-gray-400">Great job! You've tracked today</Text>
                            {/* <Ionicons name="flash" size={20} color={colorScheme === "light" ? "#fbbf24" : "#fbbf24"} /> */}
                        </View>
                        :
                        <View className="flex-row space-x-2 mt-2 self-center items-center">
                            <View className="flex-row items-center space-x-1 px-4 rounded-md border-2 border-slate-900/10 dark:border-slate-50/[0.06]">
                                <TextInput
                                    ref={w1Ref}
                                    value={w1}
                                    keyboardType="numeric"
                                    placeholder="00"
                                    maxLength={2}
                                    placeholderTextColor={colorScheme === "light" ? "#262626" : "#737373"}
                                    onChangeText={onW1in}
                                    className="justify-center text-lg p-0 h-8 text-neutral-900 dark:text-neutral-300"
                                />
                                <Text className="text-lg text-neutral-800 dark:text-neutral-500">.</Text>
                                <TextInput
                                    ref={w2Ref}
                                    value={w2}
                                    keyboardType="numeric"
                                    placeholder="00"
                                    maxLength={2}
                                    placeholderTextColor={colorScheme === "light" ? "#262626" : "#737373"}
                                    onChangeText={onW2in}
                                    className="justify-center text-lg p-0 h-8 text-neutral-900 dark:text-neutral-300"
                                />
                                <Text className="font-nunito text-normal text-neutral-800 dark:text-neutral-500">Kgs</Text>
                            </View>
                            <Pressable className="flex-row items-center h-full px-2 bg-red-600 dark:bg-rose-700 rounded-md">
                                <Ionicons name="add" size={26} color={"#f1f5f9"} />
                            </Pressable>
                        </View>
                    }
                </View>
                <View className="flex-1">
                    {/* <Chart /> */}
                    <LineChart
                        activePoint={activePoint}
                        setActivePoint={setActivePoint}
                        data={historyData}
                        target={tarWeight}
                        label="views"
                        stat="120k"
                    />
                </View>
                <View className="flex-col items-center">
                    <View className="flex-row space-x-1 items-center">
                        <Ionicons name="ellipse" size={14} color={"#1d4ed8"} />
                        <Text adjustsFontSizeToFit className="font-nunito text-neutral-800 pb-1 dark:text-gray-200">November 15, 2021</Text>
                    </View>
                    <View className="flex-row space-x-1 items-center">
                        <Text className="font-nunito text-lg pb-0.5 text-neutral-800 dark:text-gray-200">{historyData[activePoint]} Kgs</Text>
                        <Feather name="edit-3" size={18} color={colorScheme === "light" ? "#e11d48" : "#be123c"} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Weight;