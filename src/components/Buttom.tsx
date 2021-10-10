import React from "react";
import { TouchableOpacityProps, TouchableOpacity,Text, StyleSheet } from 'react-native';

import colors from "../styles/colors";
import fonts from "../styles/fonts";


interface ButtomProps extends TouchableOpacityProps {
    title: string,
}

export function Buttom({ title, ...rest } : ButtomProps){
    return(
        <TouchableOpacity 
        style={estilo.container}
        {... rest}
        >
            <Text style={estilo.text}>
                { title }
            </Text>
        </TouchableOpacity>
    )
}

const estilo = StyleSheet.create({
    
    container: {
        backgroundColor: colors.green,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.heading
    }

})
