import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';  // Asegúrate de importar correctamente
//Componentes
import Button from '../components/Button';
import TextInputs from '../components/TextInput';
import { useNavigation } from '@react-navigation/native';

export default function Registro() {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');

    const navigation = useNavigation();

    const Registrar = async () => {
        try {
            if (!correo || !clave || !nombre || !telefono) {
                Alert.alert('Campos Incompletos', 'Por favor completa todos los campos.');
                return;
            }
                // Crear el usuario con email y contraseña en Firebase Auth
                const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
                const userId = userCredential.user.uid;

                // Guardar los datos adicionales del cliente
                await setDoc(doc(collection(database, 'users'), userId), {
                    nombre,
                    telefono,
                    correo,
                });
           
            Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente.');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al registrar:', error);
            Alert.alert('Error', 'Hubo un problema al registrar. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const Volver = () => {
        navigation.navigate('Login');
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Bienvenido!</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    <TextInputs
                        placeHolder={"Ingresa tu nombre"}
                        valor={nombre}
                        setTextChange={setNombre} />
                    <TextInputs
                        placeHolder={"Telefono"}
                        contra={false}
                        valor={telefono}
                        setTextChange={setTelefono} />

                </View>
                <View style={styles.column}>
                    <TextInputs
                        placeHolder={"Ingresa tu correo electrónico"}
                        valor={correo}
                        setTextChange={setCorreo} />
                    <TextInputs
                        placeHolder={"Ingresa una clave"}
                        contra={true}
                        valor={clave}
                        setTextChange={setClave} />
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Button color={"Rosa"}
                        textoBoton={"Registrarse"}
                        accionBoton={Registrar}
                    />
                </View>
                <View style={styles.column}>
                    <Button color={"Rosa"}
                        textoBoton={"Iniciar sesión"}
                        accionBoton={Volver}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#000',
        fontWeight: '800',
        fontSize: 30,
        marginBottom: 30,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    column: {
        flex: 1,
        marginHorizontal: 10,
    },
    button: {
        marginTop: 30,
    },
});
