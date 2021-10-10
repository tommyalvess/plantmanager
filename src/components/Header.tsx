import React from "react";
import {
    SafeAreaView, 
    StyleSheet, 
    Image,
    View, 
    TextInput, 
    Text, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback, 
    Platform, 
    Keyboard} from 'react-native'
    
import colors from "../styles/colors";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import fonts from "../styles/fonts";
import { useState } from "react";
import { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function Header(){

    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
        }

        loadStorageUserName();
    },[])//se o array ficar vazio esse comando será chamado uma vez somente, 
        //passando um state tipo username toda vez que o name mudar o usseEfect vai ser diparado. 

    return(
        <View style={estilo.container}>
            <View>
                <Text style={estilo.greeting}>Olá</Text>
                <Text style={estilo.userName}>{userName}</Text>
            </View>
            <Image style={estilo.img} source={{uri: 'https://avatars.githubusercontent.com/u/25611558?v=4'}} />
        </View>
    )
}

const estilo = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 40, // colcoar sempre a metade do valor
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})
