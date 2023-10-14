import React, { useState, useEffect } from 'react';
import { View, Text, Image, SectionList } from 'react-native';
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

import workouts from "../../assets/json/workouts.json";

const List = (props) => {
    const [listData, setListData] = useState([]);
    const [checkedList, setCheckedList] = useState([]);
    const [trackData, setTrackData] = useState([]);

    useEffect(() => {
        (async function () {
            var trackerData = await AsyncStorage.getItem('tracker');
            trackerData = JSON.parse(trackerData);
            setTrackData(trackerData);

            const curTrack = trackerData.filter(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
            if (curTrack && curTrack.length > 0) {
                setCheckedList(curTrack[0].checked);
            }
        })();
    }, [])

    useEffect(() => {
        const curTrack = trackData.filter(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
        if (curTrack && curTrack.length > 0) {
            setCheckedList(curTrack[0].checked);
        }

        if (props.selectedDay != 2) {
            const data = [];
            const selected = "d" + props.selectedDay;
            Object.keys(workouts[selected]).forEach((key) => {
                data.push({
                    title: key,
                    data: workouts[selected][key]
                })
            })
            setListData(data);
        }
    }, [props.selectedDay])

    // useEffect(() => {
    //     let tData = trackData;
    //     console.log('trackdData', checkedList, tData);
    //     const targetID = tData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
    //     console.log('target', targetID, tData[targetID])
    //     if (targetID >= 0) {
    //         tData[targetID] = {
    //             ...tData[targetID],
    //             checked: checkedList
    //         };
    //         console.log('tracked succ', tData)
    //         AsyncStorage.setItem('tracker', tData);
    //     }
    //     setTrackData(tData);
    // }, [checkedList])

    return (
        <View className="flex-1 h-full overflow">
            {props.selectedDay === 2 ?
                <View className="flex-col m-auto items-center">
                    <Image className="h-56 w-56" source={{
                        uri: 'https://img.icons8.com/clouds/256/recharge-battery.png'
                    }}
                    />
                    <Text className="font-antipasto text-neutral-900 dark:text-gray-300 text-3xl capitalize">Gym closed! Take a break</Text>
                </View>
                :
                listData.length > 0 &&
                <SectionList
                    className="px-4 my-2"
                    sections={listData}
                    keyExtractor={(item, index) => item + index}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text className="font-antipasto text-gray-800 dark:text-gray-300 text-2xl capitalize">{title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <View key={item.id + "_" + props.selectedDate.getDate()} className={`flex-row space-x-4 my-0.5 py-2 px-4 ${checkedList.includes(item.id + "_" + props.selectedDate.getDate()) ? 'bg-emerald-600' : 'bg-black'} shadow shadow-neutral-900 rounded-lg items-center`}>
                            <View className="flex-col">
                                <Text className="font-caviar text-lg text-white">{item.title}</Text>
                                <Text className="font-josefinlight text-xs text-white">
                                    {item.sets && (item.sets + " set" + (item.sets > 1 ? "s" : "")) + " -"}{item.reps && item.reps + " reps"}{item.duration && item.duration + " mins"}
                                </Text>
                            </View>
                            <CheckBox
                                center
                                size={28}
                                checked={checkedList.includes(item.id + "_" + props.selectedDate.getDate())}
                                checkedColor="#e5e7eb"
                                uncheckedColor="#e5e7eb"
                                containerStyle={{ marginLeft: 'auto', padding: 0, backgroundColor: 'transparent' }}
                                onPress={async () => {
                                    if (checkedList.includes(item.id + "_" + props.selectedDate.getDate())) {
                                        setCheckedList(checkedList.filter(val => val != (item.id + "_" + props.selectedDate.getDate())))
                                        const targetID = trackData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
                                        trackData[targetID].checked = checkedList.filter(val => val != (item.id + "_" + props.selectedDate.getDate()));
                                        await AsyncStorage.setItem('tracker', JSON.stringify(trackData));
                                    } else {
                                        setCheckedList(prev => [...prev, item.id + "_" + props.selectedDate.getDate()])
                                        const targetID = trackData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
                                        trackData[targetID].checked = [...trackData[targetID].checked, item.id + "_" + props.selectedDate.getDate()];
                                        await AsyncStorage.setItem('tracker', JSON.stringify(trackData));
                                    }
                                }}
                            />
                        </View>
                    )}
                />
            }
        </View >
    )
}


export default List;