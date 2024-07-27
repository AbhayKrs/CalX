import React from 'react';

const ThemeToggle = ({ toggle }) => {
    return (
        <View className='w-6 h-6 m-0 p-0 bg-rose-500 rounded-full transition-all cursor-pointer' onClick={toggle}>
            {/* <View style={{ clipPath: "url(#myDarkCurve)" }} className='absolute top-0 left-0 w-5 h-5 m-0.5 bg-neutral-800 dark:bg-neutral-200 rounded-full transition-all' /> */}
        </View>
    );
};

export default ThemeToggle;
