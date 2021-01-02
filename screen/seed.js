import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import DB from '../database/db';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeSolid from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
class seed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSeed: true,
            isId: false,
            word: ''
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingHorizontal: RFPercentage(6),
                alignItems: 'center'
            }}>
                <LinearGradient
                    colors={['rgba(24, 83, 153,0.9)', 'rgba(76, 3, 151,0.6)']}
                    style={{
                        position: 'absolute',
                        height: '45%',
                        width: Dimensions.get('window').width
                    }}
                />
                {DB.renderHeaderNav(this.props.navigation, 'Login', 'Welcome Back', 'seed', 0)}

                <Text style={{
                    fontSize: RFPercentage(3.5),
                    color: "white",
                    fontWeight: "bold"
                }}>Access Wallet</Text>
                <Text style={{
                    fontSize: RFPercentage(1.8),
                    color: "white",
                    marginTop: RFPercentage(1),
                    paddingHorizontal: "5%"
                }}>
                    Select your wallet authentication method and enter your phassphrase or seedwords below
                </Text>
                <View style={{
                    width: "100%",
                    backgroundColor: "white",
                    padding: RFPercentage(4),
                    marginTop: RFPercentage(8)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: "100%"
                    }}>
                        <TouchableOpacity style={{
                            width: "48%",
                            height: RFPercentage(6),
                            backgroundColor: "white",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: this.state.isSeed ? "#4A90E2" : "#808080aa",
                            flexDirection: 'row',
                            elevation: this.state.isSeed ? 4 : 0

                        }}
                            activeOpacity={0.5}
                            onPress={() => {

                                this.setState({
                                    isId: false,
                                    isSeed: true
                                })
                            }}>
                            {this.renderIcon(this.state.isSeed)}
                            <Text style={{
                                fontSize: RFPercentage(1.7),
                                fontWeight: "bold",
                                color: this.state.isSeed ? "#4A90E2" : "#808080aa",
                                marginLeft: this.state.isSeed ? RFPercentage(1) : 0,
                            }}>
                                SEED WORDS
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: "48%",
                            height: RFPercentage(6),
                            backgroundColor: "white",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: this.state.isId ? "#4A90E2" : "#808080aa",
                            flexDirection: 'row',
                            elevation: this.state.isId ? 4 : 0
                        }}
                            activeOpacity={0.5}
                            onPress={() => {

                                this.setState({
                                    isId: true,
                                    isSeed: false
                                })
                            }}>
                            {this.renderIcon(this.state.isId)}

                            <Text style={{
                                fontSize: RFPercentage(1.7),
                                fontWeight: "bold",
                                color: this.state.isId ? "#4A90E2" : "#808080aa",
                                marginLeft: this.state.isId ? RFPercentage(1) : 0,
                            }}>
                                PRIVATE KEYS
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <TextInput
                        style={{
                            height: RFPercentage(12),
                            justifyContent: "flex-start",
                            textAlignVertical: 'top',
                            padding: RFPercentage(2),
                            borderColor: "#808080aa",
                            borderWidth: 0.5,
                            marginTop: RFPercentage(2),
                            fontSize: RFPercentage(2)
                        }}
                        underlineColorAndroid="transparent"
                        placeholder={this.state.isSeed ? "Enter seed words" : "Enter private keys"}
                        placeholderTextColor="#808080aa"
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                word: text
                            })
                        }} />
                    <TouchableOpacity style={{
                        marginTop: RFPercentage(5),
                        width: "100%",
                        height: RFPercentage(6),
                        backgroundColor: "#4A90E2",
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                        activeOpacity={0.5}
                        onPress={() => {
                            this.unlock()
                        }}>
                        <FontAwesome name="unlock" color="white" size={RFPercentage(2)} style={{
                            marginRight: RFPercentage(1)
                        }} />
                        <Text style={{
                            fontSize: RFPercentage(2),
                            fontWeight: "bold",
                            color: "white"
                        }}>
                            UNLOCK
                    </Text>
                    </TouchableOpacity>
                </View>



            </View>
        );
    }
    renderIcon(bool) {
        if (bool) {
            return (<FontAwesome name="check" color="#4A90E2" size={RFPercentage(1.8)} />)
        }
    }

    unlock() {
        let word = this.state.word;
        AsyncStorage.getItem('user').then((value) => {
            if (value) {
                let JsonData = JSON.parse(value);
                let seed = JsonData.seed;
                let PrivateID = JsonData.id;
                console.log(JsonData)
                if (this.state.isSeed) {
                    if (word == seed) {
                        this.replace("Home")
                    } else {
                        console.log("\n" + word)
                        console.log(seed)
                        Alert.alert("Error!!", "Wrong seed words")
                    }
                } else {

                    if (word == PrivateID) {
                        this.replace("Home")
                    } else {
                        Alert.alert("Error!!", "Wrong Private Keys")
                    }
                }
            }
        }).catch((e) => {
            console.log(e)
        })

    }
    replace(screen) {
        this.props.navigation.replace(screen);
    }
}

export default seed;
