import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DB from '../database/db';
import { RFPercentage } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeSolid from 'react-native-vector-icons/FontAwesome';
import login from './login';
class tips extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        height: '100%',
                        width: Dimensions.get('window').width
                    }}
                />
                {DB.renderHeaderNav(this.props.navigation,'', 'Backup Tips', 'Obtaining Mnemonic equals owning all assets',0)}

                <FontAwesome name="user-shield" color="white" size={RFPercentage(13)} />

                {this.renderTips('Backup Mnemonic', "Please write down the mnemonic, if your device is lost, stolen, damaged,"
                    + " you'll need the mnemonic to recover your assets.")}

                {this.renderTips('Offline Storage', "Save the mnemonic in a secure place, isolated from the internet. "
                    + "Never share or store the mnemonic in a network environtment, such as email, albums, social apps and others.")}

                <TouchableOpacity style={{
                    marginTop: RFPercentage(5),
                    width: "100%",
                    height: RFPercentage(6),
                    backgroundColor: "white",
                    justifyContent:'center',
                    alignItems:'center'
                }}
                activeOpacity={0.5}
                onPress={()=>{
                   
                    this.props.navigation.navigate('Backup')
                }}>
                    <Text style={{
                        fontSize:RFPercentage(2),
                        fontWeight:"bold"
                    }}>
                        NEXT
                    </Text>
                </TouchableOpacity>

            </View>


        );
    }

    renderTips(title, description) {
        return (
            <View style={{
                justifyContent: 'flex-start',
                width: "100%",
                marginTop: RFPercentage(5)
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <FontAwesomeSolid name="circle" color="white" size={RFPercentage(1)} />
                    <Text
                        style={{
                            color: "white",
                            fontSize: RFPercentage(2),
                            fontWeight: 'bold',
                            marginLeft: RFPercentage(2)
                        }}>{title}</Text>
                </View>
                <View>
                    <Text style={{
                        color: "white",
                        marginLeft: RFPercentage(3),
                        fontSize: RFPercentage(1.8),
                        lineHeight: RFPercentage(2.8)
                    }}>{description}</Text>
                </View>
            </View>
        )
    }

}

export default tips;
