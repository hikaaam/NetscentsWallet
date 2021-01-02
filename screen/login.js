import React, { Component } from 'react';
import { View, Text, ImageBackground, TextInput, Modal, TouchableOpacity, Image, Dimensions, DeviceEventEmitter, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DB from '../database/db';
import AsyncStorage from '@react-native-async-storage/async-storage';
class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExist: false,
            isPassword: false,
            isSeed: false,
            password:"",
            isModalVisible:false,
            text:""
        };
    }
    componentDidMount() {
        
        AsyncStorage.getItem("user").then((value) => {
            if (value) {
                let JsonData = JSON.parse(value);
                let isPassword = JsonData.password == "" ? false : true;
                let pw;
                isPassword?pw=JsonData.password:pw="";
                this.setState({
                    isExist: true,
                    isPassword: isPassword,
                    isSeed: true,
                    password:pw
                })
            }
        }).catch((e) => {
            console.log(e)
        })
        DeviceEventEmitter.addListener('login', (data) => {
            if (data == "Home") {
                console.log(data)
                setTimeout(() => {
                    this.props.navigation.replace(data)
                }, 100);
            }
        })
    }
    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('login')

    }
    render() {
        return (
            //   <View style={{
            //       flex:1,
            //       justifyContent:'center',
            //       alignItems:'center'
            //   }}>
            //     <Text> login </Text>
            //   </View>
            <ImageBackground source={require('../assets/bg.png')} style={{
                flex: 1,
                resizeMode: "cover",
                justifyContent: "center",
                alignItems: 'center',

            }}>
                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.isModalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                    }}>
                    <View style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#808080aa",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: "72%",
                            // height:"30%",
                            backgroundColor: "white",
                            padding: RFPercentage(3)
                        }}>
                            <Text style={{
                                fontSize: RFPercentage(2.5),
                                fontWeight: 'bold',
                                marginBottom: RFPercentage(1)
                            }}>Enter Password</Text>
                            <TextInput style={{
                                fontSize: RFPercentage(2),
                                borderColor: "#808080aa",
                                borderWidth: 1.4,
                                paddingVertical: RFPercentage(0.5),
                                paddingHorizontal: RFPercentage(2),
                                marginTop: RFPercentage(1)
                            }} secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        text: text
                                    })
                                }} />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: RFPercentage(2)
                            }}>
                                <TouchableOpacity style={{
                                    paddingVertical: RFPercentage(1),
                                    paddingHorizontal: RFPercentage(1.2),
                                    backgroundColor: "#4A90E2"
                                }}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.submit(this.state.text)
                                    }}>
                                    <Text style={{
                                        color: "white",
                                        fontSize: RFPercentage(2),
                                        fontWeight: 'bold'
                                    }}>SUBMIT</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{
                                    paddingVertical: RFPercentage(1),
                                    paddingHorizontal: RFPercentage(1.2),
                                    backgroundColor: "#eee",
                                    marginLeft: RFPercentage(1)
                                }}
                                    activeOpacity={0.5}
                                    onPress={() => {
                                        this.ClickModal()
                                    }}>
                                    <Text style={{
                                        // color: "white",
                                        fontSize: RFPercentage(2),
                                        fontWeight: 'bold'
                                    }}>CANCEL</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#e5e5e5aa",
                    justifyContent: 'center',
                    paddingHorizontal: RFPercentage(6)
                }}>
                    <View style={{
                        width: Dimensions.get('window').width - RFPercentage(12),
                        position: 'absolute',
                        top: RFPercentage(8),
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}>
                        <Image source={require('../assets/logo.png')} style={{
                            resizeMode: "center",
                            width: RFPercentage(30)
                        }} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            backgroundColor: "#4A90E2",
                            paddingVertical: RFPercentage(2),
                            alignItems: 'center',
                            marginBottom: RFPercentage(2)
                        }}
                        onPress={() => {
                            if (this.state.isExist) {
                                if (this.state.isPassword) {
                                    this.ClickModal();
                                } else {
                                    Alert.alert("Error!!", "You haven't set up a password yet, please login using your seed")
                                }
                            } else {
                                this.props.navigation.navigate('Tips')
                            }
                        }}>
                        <Text style={{
                            fontSize: RFPercentage(2),
                            color: "white"
                        }}>{this.state.isExist ? "LOGIN WITH PASSWORD" : "CREATE WALLET"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            backgroundColor: "white",
                            paddingVertical: RFPercentage(2),
                            alignItems: 'center'
                        }}
                        onPress={() => {
                            if (this.state.isSeed) {
                                this.props.navigation.replace('Seed');
                            } else {
                                Alert.alert("Error!!", "You don't have a Wallet, please create first")
                            }
                        }}>
                        <Text style={{
                            fontSize: RFPercentage(2),
                            // color:"white"
                        }}>ACCESS WITH SEED</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
    ClickModal() {
        if (this.state.isModalVisible) {
          this.setState({
            isModalVisible: false
          })
        }
        else {
          this.setState({
            isModalVisible: true
          })
        }
      }
      submit(text){
        if(text==this.state.password){
            this.ClickModal()
            this.props.navigation.replace("Home")
        }else{
            // this.ClickModal()
            Alert.alert("Error!","Wrong Password")
        }
      }
}
const Login = login;
export default Login;
