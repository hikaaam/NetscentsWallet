import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

class db extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TopScreen: '',
        };
    }
    renderHeaderNav(nav, screen, title, optionalDesc, size) {
        var size_ = 0;
        let marginB = 5;
        if (size == 0) {
            size_ = RFPercentage(3);
        }
        else {
            size_ = RFPercentage(size);
        }
        if (optionalDesc == 'seed') {
            marginB = -3;
            optionalDesc = ''
        }
        return (
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                height: RFPercentage(20),
                marginBottom: RFPercentage(marginB)
            }}>
                <TouchableOpacity style={{
                    position: 'absolute',
                    left: 0,
                    paddingBottom: RFPercentage(5),
                }}
                    activeOpacity={0.4}
                    onPress={() => {
                        if (screen == '') {
                            nav.goBack();
                        } else {
                            nav.replace(screen)
                        }
                    }}>
                    <FontAwesome name="arrow-left" color="white" size={RFPercentage(4)} />
                </TouchableOpacity>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: size_,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                        {title}
                    </Text>
                    <Text style={{
                        top: RFPercentage(3),
                        position: 'relative',
                        color: 'white',
                        fontSize: RFPercentage(1.9)
                    }}>
                        {optionalDesc}
                    </Text>
                </View>
            </View>
        )
    }
    generateId(length) {

        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            console.log(". . . . . \nSuccess get the value of " + key + "\n. . . . .")
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    }
    storeData = async (value, key) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
            console.log(". . . . . \nSuccess storing data into " + key + "\n. . . . .")
        } catch (e) {
            // saving error
            console.log(e)
        }
    }
    removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log(". . . . . \nSuccess removing " + key + "\n. . . . .")
        } catch (e) {
            console.log(e);
        }
    }
    renderBottom(curr, nav) {
        return (
            <View style={{
                height: RFPercentage(7),
                backgroundColor: '#ffffff',
                width: '100%',
                borderColor: 'black',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: RFPercentage(4),
                alignItems: 'center',


            }}>
                <View style={styles.BottomBoxIcon}>
                    <Ionicons color='#4A90E2' name="ios-wallet" size={RFPercentage(3)} />
                    <Text style={{ fontSize: RFPercentage(1.6), color: '#4A90E2' }}>EWALLET</Text>
                </View>
                <TouchableOpacity style={styles.BottomBoxIcon} activeOpacity={0.5} onPress={() => {
                    nav.navigate('Wallet')
                }}>
                    <Ionicons name="ios-send" color='gray' size={RFPercentage(3)} />
                    <Text style={styles.BottomTextIcon}>SEND</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BottomBoxIcon} activeOpacity={0.5} onPress={() => {
                    // AsyncStorage.removeItem("user");
                    nav.replace("Login")
                }}>
                    <Ionicons name="ios-log-out" color='gray' size={RFPercentage(3)} />
                    <Text style={styles.BottomTextIcon}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        )
    }

    flashMessage(text,status){
        return (
            <Modal animationType="fade" visible={status} transparent={true}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                    
                    // backgroundColor: "#808080aa"
                }}>
                    <View style={{
                        backgroundColor: "white",
                        width: "70%",
                        padding: RFPercentage(4),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius:10
                    }}>
                        <Text style={{
                            fontSize:RFPercentage(3)
                        }}>{text}</Text>
                        <FontAwesome name="check" color="lime" size={RFPercentage(10)} />
                    </View>
                </View>
            </Modal>
        )
    }
    closeFlash(funct,time){
        setTimeout(() => {
            funct()
        }, time);
    }
   

}

const DB = new db();
const styles = StyleSheet.create({
    BottomBoxIcon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomTextIcon: {
        fontSize: RFPercentage(1.6),
        color: 'gray'
    }
});
export default DB;
