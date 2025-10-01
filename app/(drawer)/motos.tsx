import React, { useState } from 'react';
import { View, Text,Image, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Funcionario } from '../../src/types/funcionario'; 
import { useRouter } from 'expo-router'; 
import{useTranslation} from 'react-i18next'

export default function Motos() {

    const [openOptions, setOpenOptions] = useState(false);

    const router = useRouter();
    
    const { t } = useTranslation();

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
              <Image source={require("../../assets/profile/white-logo.png")}/>
            </TouchableOpacity>
            {openOptions && (
                <View>
                    <TouchableOpacity>
                        <Ionicons name="pencil-outline" size={24} color="black" />
                        <View>
                            <Text>{t('titleUpdate')}</Text>
                            <Text>{t('contextUpdateMoto')}</Text>
                        </View>       
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/cadastro-moto')}>
                        <Ionicons name="create-outline" size={24} color="black" />
                        <View>
                            <Text>{t('titleRegister')}</Text>
                            <Text>{t('contextRegisterBike')}</Text>
                        </View>       
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="trash-outline" size={24} color="black" />
                        <View>
                            <Text>{t('titleDelete')}</Text>
                            <Text>{t('contextDeleteBike')}</Text>
                        </View>       
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>    
    );
}