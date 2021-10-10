import React from "react";
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import {SafeAreaView, 
    StyleSheet, View, 
    TextInput, 
    Text, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback,
     Platform, 
     Keyboard} from 'react-native'
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentButtomProps extends RectButtonProps {
    title: string;
    active ?: boolean; //falandoq que é opcional. 
}

export function EnviromentButtom ({
    title,
    active = false,
    ...rest
} : EnviromentButtomProps){
    return (
        <RectButton 
            style={[estilo.container,
            active && estilo.containerAtivo]} 
            {...rest}>
            <Text style={[estilo.text, active && estilo.textAtivo]}>{title}</Text>
        </RectButton>
    )
}

const estilo = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    containerAtivo: {
        backgroundColor: colors.green_light,
    },
    text: {
        fontFamily: fonts.text,
        color: colors.heading
    },
    textAtivo: {
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
})