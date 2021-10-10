import React from "react";
import {View,StyleSheet} from 'react-native'
import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'

export function Load(){
    return(
        <View style={estilo.container}>
            <LottieView 
                source={loadAnimation}
                autoPlay
                loop
                style={estilo.load}
            />
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    load: {
        backgroundColor: 'transparent',
        width: 200,
        height: 200,
    }
})