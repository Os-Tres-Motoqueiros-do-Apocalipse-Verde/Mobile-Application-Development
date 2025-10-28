import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { Patio } from "../../src/types/patio";
import { useTranslation } from 'react-i18next';

import { useTheme } from "../../src/context/ThemeContext";
import { createGlobalStyles } from "../../src/styles/globalStyles";

export default function Patios() {
    const [patios, setPatios] = useState<Patio[]>([]);
    const [filtroCampo, setFiltroCampo] = useState<keyof Patio | "todos">("todos");
    const [filtroValor, setFiltroValor] = useState("");
    const [openOptions, setOpenOptions] = useState(false);

    const { colors } = useTheme();
    const styles = createGlobalStyles(colors);

    const { t } = useTranslation();

    useEffect(() => {
        loadPatios();
    }, []);

    const loadPatios = async () => {
        try {
        const data = await AsyncStorage.getItem("patios");
        const list: Patio[] = data ? JSON.parse(data) : [];
        setPatios(list);
        } catch (error) {
        Alert.alert(t('titleError'), t('alertContextErroLoadingPatios'));
        }
    };

    const getCampoValor = (patio: Patio, campo: keyof Patio) => {
        const valor = campo === "filial" ? patio.filial.nome : patio[campo];
        return valor ? valor.toString() : "";
    };

    const filteredPatios = patios.filter((p) => {
        const valorFiltro = filtroValor.toLowerCase();
        if (filtroCampo === "todos") {
        return (
            p.localizacao.toLowerCase().includes(valorFiltro) ||
            p.capacidadeMoto.toString().includes(valorFiltro) ||
            p.totalMotos.toString().includes(valorFiltro) ||
            p.filial.nome.toLowerCase().includes(valorFiltro)
        );
        } else {
        return getCampoValor(p, filtroCampo).toLowerCase().includes(valorFiltro);
        }
    });

    const handleItemPress = (patio: Patio) => {
        router.push({ pathname: "/patio", params: { id: patio.id } });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.motoPerfil}>
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold", textAlign: "center", paddingBottom: 30 }}>
            {t('titleListPatios')}
            </Text>

            <View style={{ marginBottom: 20 }}>
            <Picker
                selectedValue={filtroCampo}
                onValueChange={(itemValue) => setFiltroCampo(itemValue)}
                style={{ color: "#fff", backgroundColor: "#099302", borderRadius: 10 }}
            >
                <Picker.Item label={t('titleAll')} value="todos" />
                <Picker.Item label={t('titleLocation')} value="localizacao" />
                <Picker.Item label={t('titleCapacity')} value="capacidadeMoto" />
                <Picker.Item label={t('titleTotalMotos')} value="totalMotos" />
                <Picker.Item label={t('titleFilial')} value="filial" />
            </Picker>

            <TextInput
                placeholder={t('titleSearchPatios')}
                placeholderTextColor="#ccc"
                value={filtroValor}
                onChangeText={setFiltroValor}
                style={{
                borderWidth: 1,
                borderColor: "#09BC00",
                borderRadius: 10,
                width: "90%",
                color: "#fff",
                padding: 10,
                marginTop: 10
                }}
            />
            </View>
        </View>

        <FlatList
            data={filteredPatios}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={{
                backgroundColor: "#099302",
                gap: 10,
                width: "90%",
                borderRadius: 20,
                padding: 20,
                alignSelf: "center",
                marginTop: 10,
                }}
                onPress={() => handleItemPress(item)}
            >
                <Text style={{ color: "#fff", fontSize: 22, textAlign: "center" }}>{item.localizacao}</Text>
                <Text style={{ color: "#fff", fontSize: 18 }}>{t('titleCapacity')}: {item.capacidadeMoto}</Text>
                <Text style={{ color: "#fff", fontSize: 18 }}>{t('titleTotalMotos')}: {item.totalMotos}</Text>
                <Text style={{ color: "#fff", fontSize: 18 }}>{t('titleFilial')}: {item.filial.nome}</Text>
            </TouchableOpacity>
            )}
            ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20 }}>{t('alertContextErroFindAnyPatios')}</Text>
            }
        />

        <TouchableOpacity
            style={{
            backgroundColor: "#099302",
            width: 100,
            marginLeft: 40,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            marginTop: 10
            }}
            onPress={() => setOpenOptions(!openOptions)}
        >
            <Image style={{ alignSelf: "center", width: 50, height: 50 }} source={require("../../assets/profile/white-logo.png")} />
        </TouchableOpacity>

        {openOptions && (
            <View style={styles.config}>
            <TouchableOpacity style={styles.botoesConf} onPress={() => router.push('/cadastro-patio')}>
                <Ionicons name="create-outline" size={30} color="#fff" style={{ alignSelf: "center" }} />
                <View>
                <Text style={{ color: "#fff" }}>{t('titleRegister')}</Text>
                <Text style={{ color: "#fff", width: "80%" }}>{t('contextRegisterPatios')}</Text>
                </View>
            </TouchableOpacity>
            </View>
        )}
        </SafeAreaView>
    );
}
