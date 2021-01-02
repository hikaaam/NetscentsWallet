import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import DB from '../database/db';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
// import { Image } from 'react-native-svg';
class send extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',
            }}>
                <View style={{
                    paddingHorizontal: RFPercentage(6),
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: RFPercentage(10),
                        // height: RFPercentage(20),
                        // marginBottom: RFPercentage(5)
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: "100%",
                        }}>
                            <View style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                // height: RFPercentage(20),
                                // marginBottom: RFPercentage(1)
                            }}>
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    left: 0,
                                    paddingBottom: RFPercentage(5),
                                }}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.props.navigation.goBack()
                                    }}>
                                    <FontAwesome name="arrow-left" size={RFPercentage(4)} />
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {/* <FontAwesome name="wallet" color="white" size={RFPercentage(5)} /> */}
                                    <Text style={{
                                        fontSize: RFPercentage(3),
                                        // fontWeight: 'bold',
                                        // color: 'white',
                                        marginLeft: RFPercentage(1.5)
                                    }}>
                                        Send Money
                                </Text>
                                </View>
                            </View>


                        </View>
                    </View>
                    <Image style={{
                        width: "60%",
                        marginTop: RFPercentage(8),
                        marginBottom: RFPercentage(3)
                    }} source={require('../assets/logoonly.png')} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: "100%"
                    }}>
                        <TextInput style={{
                            width: "80%",
                            paddingLeft: RFPercentage(3),
                            paddingVertical: RFPercentage(2),
                            borderWidth: 0.6,
                            borderColor: "#808080aa",
                            fontSize: RFPercentage(2)
                        }}
                            placeholder={"To Address"} onChangeText={(text) => {
                                this.setState({
                                    id: text
                                })
                            }} />
                        <TouchableOpacity style={{
                            width: "20%",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 0.6,
                            borderColor: "#808080aa",
                        }} onPress={() => {

                        }}>
                            <FontAwesome name="camera" size={RFPercentage(3)} />
                        </TouchableOpacity>
                    </View>
                    <TextInput style={{
                        width: "100%",
                        paddingLeft: RFPercentage(3),
                        paddingVertical: RFPercentage(2),
                        borderWidth: 0.6,
                        borderColor: "#808080aa",
                        fontSize: RFPercentage(2),
                        marginVertical: RFPercentage(2),
                    }}
                        placeholder={"Amount To Send"} onChangeText={(text) => {
                            this.setState({
                                id: text
                            })
                        }}
                        keyboardType="decimal-pad" />

                    <TouchableOpacity
                        activeOpacity={0.5}
                        disabled={!this.state.isFinish}
                        style={{
                            // marginTop: RFPercentage(5),
                            width: "100%",
                            height: RFPercentage(6),
                            backgroundColor: "#4A90E2",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => {


                        }}>
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: RFPercentage(2)
                        }}>Send Money</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default send;
