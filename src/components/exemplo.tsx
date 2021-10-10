import React from "react";
import { TouchableOpacityProps, TouchableOpacity,Text } from 'react-native';

//Aqui eu estou extendento as propriedades do TouchableOpacity para o componente.
interface ButtomProps extends TouchableOpacityProps {
    title: string,
}

//O rest significa que eu estou dispejando as propriedades lá
export function Buttonn({ title, ...rest } : ButtomProps){
    return(
        //Conteudo do componete
        <TouchableOpacity 
        activeOpacity={0.7}
        {... rest}
        >
                <Text>
                    { title }
                </Text>
            </TouchableOpacity>
    )
}