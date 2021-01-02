import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import db from '../database/db';
import { LinearGradient } from 'expo-linear-gradient';
import { Value } from 'react-native-reanimated';

class homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalVisible: false,
      password: "",
      balance: "Loading...",
      tempid:"",
      tempseed:""
    };
  }
  componentDidMount() {
    let key = "user";
    let wallet = "wallet";
    let tempid,tempseed;
    // double comment // AsyncStorage.removeItem(key)
    AsyncStorage.getItem('TempUser').then((value)=>{
      if(value){
        let JsonData = JSON.parse(value);
        tempid = JsonData.id;
        tempseed = JsonData.seed;
        console.log(tempseed)
      }else{
        tempid = "";
        tempseed = ""
      }
    }).catch((e)=>console.log(e))

    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        let JsonData = JSON.parse(value);
        var iduser = JsonData.id;
        var seeduser = JsonData.seed;
        AsyncStorage.getItem(wallet).then((values) => {
          if (values) {
            let JsonWallet = JSON.parse(values);         
            this.setState({
              balance: JsonWallet.balance,
              tempid:tempid,
              tempseed:tempseed,
              id:iduser,
              seed:seeduser
            })
          } else {
            this.setState({
              balance: 0.00,
              tempid:tempid,
              tempseed:tempseed,
              id:iduser,
              seed:seeduser
            })
          }
        }).catch((e) => {
          console.log(e)
        }); //wallet checking

       
        if (JsonData.password == "") {
          this.ClickModal();
        }
      } else {
        this.setState({
          balance: 0.00,
          tempid:tempid,
          tempseed:tempseed,
          id:"",
          seed:""
        })
        this.ClickModal();
      }
    }).catch((e) => {
      console.log(e)
    })
  }
  render() {
    return (

      <View style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',

      }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.ModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
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
                marginBottom: RFPercentage(2)
              }}>New Password</Text>
              <Text style={{
                fontSize: RFPercentage(2)
              }}>Enter a password to save your login credentials for easier login next time, it won't be saved if cancelled.</Text>

              <TextInput style={{
                fontSize: RFPercentage(2),
                borderColor: "#808080aa",
                borderWidth: 1.4,
                paddingVertical: RFPercentage(0.5),
                paddingHorizontal: RFPercentage(2),
                marginTop: RFPercentage(2)
              }} secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text
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
                    this.submitPassword(this.state.password, this.state.balance);
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
                    this.submitPassword("", this.state.balance)
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
        <StatusBar />

        <LinearGradient
          colors={['rgba(24, 83, 153,0.9)', 'rgba(76, 3, 151,0.6)']}
          style={{
            position: 'absolute',
            height: '45%',
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
              alignItems: 'center'
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <FontAwesome name="coins" color="white" size={RFPercentage(5)} />
                <Text style={{
                  fontSize: RFPercentage(3),
                  fontWeight: 'bold',
                  color: 'white',
                  marginLeft: RFPercentage(1.5)
                }}>
                  REWARDS
            </Text>
              </View>
              <Text style={{
                //  fontWeight: 'bold',
                color: 'white',
                fontSize: RFPercentage(2),
                marginTop: RFPercentage(5)
              }}>TOTAL REWARD BALANCE</Text>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: RFPercentage(2)
              }}>
                <FontAwesome name="dollar-sign" color="white" size={RFPercentage(5)} />
                <Text style={{
                  // fontWeight: 'bold',
                  color: 'white',
                  fontSize: RFPercentage(5),
                  marginLeft: RFPercentage(1)
                }}>{this.state.balance}</Text>
              </View>
            </View>
          </View>
          <View style={{
            width: "100%",
            backgroundColor: "white",
            paddingHorizontal: RFPercentage(2.5),
            paddingVertical: RFPercentage(3.5),
            marginTop: RFPercentage(3)
          }}>
            <View style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <View>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <FontAwesome name="coins" color="#4A90E2" size={RFPercentage(3.4)} />
                  <Text style={{
                    marginLeft: RFPercentage(2),
                    fontSize: RFPercentage(2.2)
                  }}>IDR</Text>
                </View>

                <Text style={{
                  fontSize: RFPercentage(2.2),
                  marginVertical: RFPercentage(2)
                }}>$ {this.state.balance}.00</Text>

                <Text style={{
                  fontSize: RFPercentage(2.2),
                  color: "gray"
                }}>IDR {this.state.balance == "Loading..." ? this.state.balance : this.state.balance * 14201.28} </Text>
              </View>
              <TouchableOpacity style={{
                width: RFPercentage(3),
                height: RFPercentage(3),
                justifyContent: 'center',
                alignItems: 'center'
              }}
                activeOpacity={0.5}>
                <FontAwesome name="chevron-right" size={RFPercentage(3)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {db.renderBottom('1', this.props.navigation)}
      </View>
    );
  }

  ClickModal() {
    if (this.state.ModalVisible) {
      this.setState({
        ModalVisible: false
      })
    }
    else {
      this.setState({
        ModalVisible: true
      })
    }
  }

  submitPassword(password, balance) {
    let id,seed;
    if(this.state.id =="" && this.state.seed ==""){
      id=this.state.tempid;
      seed=this.state.tempseed;
      db.removeData('TempUser')
    }else{
      id=this.state.id;
      seed=this.state.seed;
    }
    let data = {
      id: id,
      seed: seed,
      password: password
    }
    console.log("//////////////////////////")
    console.log(data)
    console.log("//////////////////////////")
    let wallet = {
      id: id,
      balance: balance
    }
    db.storeData(data, "user");
    db.storeData(wallet, "wallet");
    setTimeout(() => {
      this.ClickModal();
    }, 500);
  }

}

export default homescreen;
