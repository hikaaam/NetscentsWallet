import React, { Component, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Clipboard,Modal } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import DB from '../database/db';
import AsyncStorage from '@react-native-async-storage/async-storage';

class wallet extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            balance: "Loading...",
            id: "Loading...",
            visible:false
        };
    }
    removeFlashmessage(){
        setTimeout(() => {
            this.setState({
                visible:false
            })
        }, 1000);
    }
    flashMessage(text){
        return (
            <Modal animationType="fade" visible={this.state.visible} transparent={true}>
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
                        }}>Text Copied!</Text>
                        <FontAwesome name="check" color="lime" size={RFPercentage(10)} />
                    </View>
                </View>
            </Modal>
        )
    }
    componentDidMount() {
        let id, balance;
        AsyncStorage.getItem("wallet").then((value) => {
            if (value) {
                let data = JSON.parse(value);
                id = data.id;
                balance = data.balance;
                this.setState({
                    balance: balance,
                    id: id
                })
            }
        }).catch((e) => console.log(e))
    }
    render() {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'space-between',

            }}>
                <LinearGradient
                    colors={['rgba(24, 83, 153,0.9)', 'rgba(76, 3, 151,0.6)']}
                    style={{
                        position: 'absolute',
                        height: '50%',
                        width: Dimensions.get('window').width
                    }}
                />
                <View style={{
                    paddingHorizontal: RFPercentage(6)
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
                                    <FontAwesome name="arrow-left" color="white" size={RFPercentage(4)} />
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <FontAwesome name="wallet" color="white" size={RFPercentage(5)} />
                                    <Text style={{
                                        fontSize: RFPercentage(3),
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginLeft: RFPercentage(1.5)
                                    }}>
                                        My Wallet
                                </Text>
                                </View>
                            </View>

                            <Text style={{
                                //  fontWeight: 'bold',
                                color: 'white',
                                fontSize: RFPercentage(2.5),
                                marginTop: RFPercentage(5),
                                fontWeight: "bold"
                            }}>Total Balance</Text>

                            <Text style={{
                                // fontWeight: 'bold',
                                color: 'white',
                                fontSize: RFPercentage(5),
                                marginLeft: RFPercentage(1),
                                fontWeight: "bold",
                                marginTop: RFPercentage(1)
                            }}>{this.state.balance}.00</Text>
                            <Text style={{
                                color: 'white',
                                fontSize: RFPercentage(2),
                                marginLeft: RFPercentage(1),
                                fontWeight: "bold",
                                marginTop: RFPercentage(1)
                            }}>IDR {this.state.balance * 14230}.00</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: "100%",
                        marginTop: RFPercentage(8)
                    }}>
                        <TouchableOpacity style={{
                            alignItems: 'center'
                        }} activeOpacity={0.8} onPress={() => {
                            this.props.navigation.navigate("Send")
                        }}>
                            <View style={{
                                width: RFPercentage(12),
                                height: RFPercentage(12),
                                borderWidth: 1,
                                borderRadius: 100,
                                backgroundColor: "white",
                                borderColor: "#808080aa",
                                elevation: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: RFPercentage(5),
                                    height: RFPercentage(5),
                                    borderWidth: 1,
                                    borderRadius: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: "#808080aa"
                                }}>
                                    <FontAwesome name="arrow-up" color="#808080" size={RFPercentage(4)} />
                                </View>
                            </View>
                            <Text style={{
                                fontSize: RFPercentage(1.7),
                                fontWeight: 'bold'
                            }}>
                                SEND MONEY
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            alignItems: 'center'
                        }} activeOpacity={0.8} onPress={() => {
                            this.props.navigation.navigate("Receive",{id:this.state.id})
                        }}>
                            <View style={{
                                width: RFPercentage(12),
                                height: RFPercentage(12),
                                borderWidth: 1,
                                borderRadius: 100,
                                backgroundColor: "white",
                                borderColor: "#808080aa",
                                elevation: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: RFPercentage(5),
                                    height: RFPercentage(5),
                                    borderWidth: 1,
                                    borderRadius: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: "#808080aa"
                                }}>
                                    <FontAwesome name="arrow-down" color="#808080" size={RFPercentage(4)} />
                                </View>
                            </View>
                            <Text style={{
                                fontSize: RFPercentage(1.7),
                                fontWeight: 'bold'
                            }}>
                                RECEIVE MONEY
                            </Text>
                        </TouchableOpacity>
                            {this.flashMessage("text")}
                        <TouchableOpacity style={{
                            alignItems: 'center'
                        }} activeOpacity={0.8} onPress={() => {
                            Clipboard.setString(this.state.id)
                           this.setState({
                               visible:true
                           })
                           this.removeFlashmessage()
                        }}>
                            <View style={{
                                width: RFPercentage(12),
                                height: RFPercentage(12),
                                borderWidth: 1,
                                borderRadius: 100,
                                backgroundColor: "white",
                                borderColor: "#808080aa",
                                elevation: 4,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: RFPercentage(5.2),
                                    height: RFPercentage(5.2),
                                    // borderWidth: 1,
                                    borderRadius: 100,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderColor: "#808080aa"
                                }}>
                                    <FontAwesome name="copy" color="#808080" size={RFPercentage(4)} />
                                </View>
                            </View>
                            <Text style={{
                                fontSize: RFPercentage(1.7),
                                fontWeight: 'bold'
                            }}>
                                COPY ADDRESS
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Text style={{
                        marginTop: RFPercentage(8),
                        fontWeight: 'bold',
                        fontSize: RFPercentage(2)
                    }}>WALLET ADDRESS:</Text>
                    <Text style={{
                        marginTop: RFPercentage(1),
                        fontSize: RFPercentage(1.7)
                    }}>{this.state.id}</Text>

                </View>
            </View>
        );
    
       
    }

}

export default wallet;
