import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {SafeAreaView, StyleSheet, View, TextInput, Text} from 'react-native'

import { Buttom } from "../components/Buttom";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
    title: string,
    subTitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreen: string
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}

export function Confirmation(){

    const navegar = useNavigation();

    const routes = useRoute();

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen
    } = routes.params as Params
    
    function handleMoveOn(){
        navegar.navigate(nextScreen)
    }

    return(
        <SafeAreaView style={estilo.container}>
            <View style={estilo.content}>
                <Text style={estilo.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={estilo.title}>
                    {title}
                </Text>

                <Text style={estilo.subTitle}>
                    {subTitle}
                </Text>

                <View style={estilo.footer}>
                    <Buttom 
                        onPress={handleMoveOn} 
                        title={buttonTitle} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const estilo = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       width: '100%',
       padding: 30
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subTitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 10
    }

})