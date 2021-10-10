import React from "react";
import {
    StyleSheet, 
    View, 
    Text, 
    } from 'react-native'
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import {SvgFromUri} from 'react-native-svg'
import Animated from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

interface PlantProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
    handleRemove: () => void;
}

export const PlantCardSecondary = ({data, handleRemove, ...rest} : PlantProps) => {
    return (

        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>

                    <View>
                        <RectButton
                            style={estilo.btnRemove}
                            onPress={handleRemove}
                        >
                            <Feather name="trash" size={32} color={colors.white} />   
                        </RectButton>
                    </View>

                </Animated.View>
            )}
        >

            <RectButton
                style={estilo.container}
                {...rest}
            >
                <SvgFromUri 
                    uri={data.photo}
                    width={50}
                    height={50}
                />

                <Text style={estilo.title}>
                    {data.name}
                </Text>

                <View style={estilo.details}>
                    <Text style={estilo.timelabel}>
                        Regar às 
                    </Text>
                    <Text style={estilo.time}>
                        {data.hour}
                    </Text>
                </View>

            </RectButton>

        </Swipeable>
        
    )
}

const estilo = StyleSheet.create({
    container: {
        //width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    title: {
       flex: 1,
       marginLeft: 10,
       fontFamily: fonts.heading,
       fontSize: 17,
       color: colors.heading
    },
    details: {
        alignItems: 'flex-end',
    },
    timelabel: {
        marginTop: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    },
    btnRemove: {
        width: 110,
        height: 110,
        backgroundColor: colors.red,
        marginTop: 5,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15

    }
})