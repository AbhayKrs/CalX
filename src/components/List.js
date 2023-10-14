import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, SectionList } from 'react-native';
import { CheckBox } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = (props) => {
    const [listData, setListData] = useState([]);

    useEffect(() => {
        (async function () {
            if (props.selectedDay != 2) {
                let data = [];
                const workouts_data = await AsyncStorage.getItem('workouts');
                data.push({
                    title: 'Popular',
                    data: JSON.parse(workouts_data)
                })
                setListData(data);
            }
        })();
    }, []);

    return (
        <View className="flex-1 h-full overflow-y">
            {props.selectedDay === 2 ?
                <View className="flex-col m-auto items-center">
                    <Image className="h-56 w-56" source={{
                        uri: 'https://img.icons8.com/clouds/256/recharge-battery.png'
                    }}
                    />
                    <Text className="font-antipasto text-neutral-900 dark:text-gray-300 text-3xl capitalize">Gym closed! Take a break</Text>
                </View>
                :
                listData.length > 0 && <SectionList
                    className="px-4 my-2"
                    sections={listData}
                    keyExtractor={(item) => item.id}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text className="font-antipasto text-gray-800 dark:text-gray-300 text-2xl capitalize">{title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <View key={item.id} className={`flex-row my-0.5 py-2 px-3 ${false ? 'bg-emerald-600' : 'bg-black'} shadow shadow-neutral-900 rounded-lg items-center`}>
                            <View className="flex-col w-11/12">
                                <Text className="font-caviar text-white">{item.name}</Text>
                                <Text className="font-josefinlight text-xs text-white">
                                    {item.sets && (item.sets + " set" + (item.sets > 1 ? "s" : "")) + " -"}{item.reps && item.reps + " reps"}
                                </Text>
                            </View>
                            <CheckBox
                                center
                                size={24}
                                checked={false}
                                checkedColor="#e5e7eb"
                                uncheckedColor="#e5e7eb"
                                containerStyle={{ marginLeft: 'auto', marginRight: 0, padding: 0, backgroundColor: 'transparent' }}
                            // onPress={async () => {
                            //     if (checkedList.includes(item.id)) {
                            //         setCheckedList(checkedList.filter(val => val !== item.id))
                            //         const targetID = trackData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
                            //         trackData[targetID].checked = checkedList.filter(val => val !== item.id);
                            //         await AsyncStorage.setItem('tracker', JSON.stringify(trackData));
                            //     } else {
                            //         setCheckedList(prev => [...prev, item.id])
                            //         const targetID = trackData.findIndex(item => new Date(item.id).toISOString().split('T')[0] == props.selectedDate.toISOString().split('T')[0]);
                            //         trackData[targetID].checked = [...trackData[targetID].checked, item.id];
                            //         await AsyncStorage.setItem('tracker', JSON.stringify(trackData));
                            //     }
                            // }}
                            />
                        </View>
                    )}
                />
            }
        </View >
    )
}


export default List;