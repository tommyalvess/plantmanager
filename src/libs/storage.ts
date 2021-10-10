import AsyncStorage from "@react-native-async-storage/async-storage";
import format from "date-fns/format";
import * as Notifications from 'expo-notifications';

export interface PlantsProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    };
    hour: string;
    dateTimeNotification: Date;
}
export interface StoragePlantProps {
    [id: string]: {
        data: PlantsProps;
        notificationId: string
    }
}

export async function savePlant(plant: PlantsProps) : Promise<void> {
    try {

        //preparar para agendar a notificação
        const nextTime = new Date(plant.dateTimeNotification);
        const now =  new Date();
        console.log(format(new Date(), 'HH:mm'));
        

        const {times, repeat_every} = plant.frequency;
        //validando as vezes q irá lembrar na semana
        if(repeat_every == 'week'){
            const interval = Math.trunc(7/times);
            nextTime.setDate(now.getDate() + interval);
        }
        else{
            //nextTime.setDate(nextTime.getDate() + 1)
            console.log('Teste1');            
        }

        //segundos da data de agora para o horario de agendamento
        const seconds = Math.abs(
            Math.ceil(now.getTime() - nextTime.getTime()) / 1000); //abs - valor absoluto, para nçao gerar nuemro negativo

        console.log(seconds);
            
        console.log('Teste2');

        const notificationId = await Notifications.scheduleNotificationAsync({
           content: {
                title: 'Heey, 🌱',
                body: `Está na hora de cuidar da sua ${plant.name}`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    plant
                },
           },
           trigger: {
               //seconds: seconds < 60 ? 60 : seconds,
               seconds: 60,
               repeats: true
           },
           
        })

        console.log(seconds < 60 ? 60 : seconds);        
        console.log('Teste3');        

        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlant = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        //
        await AsyncStorage.setItem('@plantmanager:plants', 
        JSON.stringify({
            ...newPlant,
            ...oldPlant
        }))
        console.log('Teste4');

    } catch (error) {
        throw new Error(error)
    }
}

export async function loadPlant() : Promise<PlantsProps[]> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

        const plantsSorted = Object
        .keys(plants)
        .map((plant) => {
            return {
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
            }
        })
        
        //descobrindo qual item é o menor
        .sort((a,b)=> 
            Math.floor(
                new Date(a.dateTimeNotification).getTime()/100 - 
                Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
            )
        )

        return plantsSorted;
        
    } catch (error) {
        throw new Error(error)
    }
}

export async function removePlant(id: string) : Promise<void> {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);

    delete plants[id];

    await AsyncStorage.setItem(
        '@plantmanager:plants',
        JSON.stringify(plants)
    );
}

