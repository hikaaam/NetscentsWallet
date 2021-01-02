import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, Clipboard } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import QRCode from 'react-native-qrcode-svg';
import { color } from 'react-native-reanimated';
import DB from '../database/db';


class receive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
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
                {DB.flashMessage("Text Copied!",this.state.visible)}
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
                                    <FontAwesome name="arrow-left" color="white" size={RFPercentage(4)} />
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    {/* <FontAwesome name="wallet" color="white" size={RFPercentage(5)} /> */}
                                    <Text style={{
                                        fontSize: RFPercentage(3),
                                        fontWeight: 'bold',
                                        color: 'white',
                                        marginLeft: RFPercentage(1.5)
                                    }}>
                                        Receive Money
                                </Text>
                                </View>
                            </View>

                            <Text style={{
                                //  fontWeight: 'bold',
                                color: 'white',
                                fontSize: RFPercentage(2.5),
                                marginTop: RFPercentage(5),
                                fontWeight: "bold"
                            }}>{"Scan this address\nto receive money"}</Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        width: "90%",
                        // height: "30%",
                        padding: RFPercentage(5),
                        marginTop: RFPercentage(6),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <QRCode value={this.props.route.params.id} size={RFPercentage(28)} />
                    </View>
                    <Text style={{
                        marginTop: RFPercentage(4),
                        fontWeight: 'bold',
                        fontSize: RFPercentage(2)
                    }}>WALLET ADDRESS:</Text>
                    <Text style={{
                        marginTop: RFPercentage(1),
                        fontSize: RFPercentage(1.7)
                    }}>{this.props.route.params.id}</Text>
                    <TouchableOpacity style={{
                        width: RFPercentage(10),
                        height: RFPercentage(10),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderRadius: 100,
                        borderColor: "#808080aa",
                        marginTop: RFPercentage(2)
                    }} activeOpacity={0.2} onPress={()=>{
                        let id = this.props.route.params.id;
                        Clipboard.setString(id);
                        this.setState({
                            visible:true
                        })
                        DB.closeFlash(()=>{
                            this.setState({
                                visible:false
                            })
                        },1000)
                    }}>
                        <FontAwesome name="copy" size={RFPercentage(4)} color="#808080aa" />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: RFPercentage(1),
                        fontWeight: 'bold',
                        fontSize: RFPercentage(2),
                        color:"#808080aa"
                    }}>COPY</Text>
                </View>
            </View>
        );
    }

}

export default receive;
