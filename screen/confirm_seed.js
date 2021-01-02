import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, FlatList, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import DB from '../database/db';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Item = ({ title, onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            paddingVertical: RFPercentage(0.5),
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#999999aa',
            borderWidth: 0.3,
            marginRight: RFPercentage(1.5),
            marginVertical: RFPercentage(1),
            width: RFPercentage(8)
        }}>
        <Text style={{
            fontSize: RFPercentage(1.7),
            // marginHorizontal:RFPercentage(1)
        }}>{title}</Text>
    </TouchableOpacity>
);



class confirm_seed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCorrect: true,
            CorrectWords: [],
            ShuffledWords: [{ title: "loading..", id: 0 }],
            FutureData: [],
            isFinish: false,
            correctString:""
        };
    }
    renderItem = ({ item }) => (
        <Item
            onPress={() => {
                this.ClickOnFlatlist(item.title);
            }}
            title={item.title} />
    );

    renderItemFuture = ({ item }) => (
        <Item
            onPress={() => {
                this.ClickOnFlatlistFuture(item.title);
            }}
            title={item.title} />
    );

    ClickOnFlatlistFuture(title) {
        let currentData = this.state.ShuffledWords;
        let newData = [];
        let futureData = this.state.FutureData;
        let checkingBool;
        let finish;
        // let futureData = [];
        futureData.map((data, i) => {
            if (data.title == title) {
                currentData.push(data)
            } else {
                newData.push(data)
            }
        })
        newData.map((item, i) => {
            if (item.title == this.state.CorrectWords[i]) {
                checkingBool = true;
            } else {
                checkingBool = false;
            }
        })
        finish = this.checkFinish(newData, checkingBool)
        this.setState({
            FutureData: newData,
            ShuffledWords: currentData,
            isCorrect: checkingBool,
            isFinish: finish
        })
    }

    ClickOnFlatlist(title) {
        let currentData = this.state.ShuffledWords;
        let newData = [];
        let futureData = this.state.FutureData;
        let checkingBool;
        let finish;
        // let futureData = [];
        currentData.map((data, i) => {
            if (data.title == title) {
                futureData.push(data)
            } else {
                newData.push(data)
            }
        })
        futureData.map((item, i) => {
            if (item.title == this.state.CorrectWords[i]) {
                checkingBool = true;
            } else {
                checkingBool = false;
            }
        })
        finish = this.checkFinish(futureData, checkingBool)
        this.setState({
            FutureData: futureData,
            ShuffledWords: newData,
            isCorrect: checkingBool,
            isFinish: finish
        })
    }
    checkFinish(arr, status) {
        let bool;
        if (arr.length == this.state.CorrectWords.length && status) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }
    renderError(boolean) {
        if (!boolean) {
            return (
                <View style={{
                    backgroundColor: "#FED602",
                    padding: RFPercentage(0.5)
                }}>
                    <Text style={{
                        fontSize: RFPercentage(1.7)
                    }}>Incorrect order of mnemonic phrase, please.</Text>
                </View>
            )
        }
    }


    componentDidMount() {
        var data = this.props.route.params.data;
        // console.log(data)
        var shuffledData = [];
        var correctData = [];
        var correctString = "";
        data.shuffledWords.map((item, i) => {
            shuffledData.push({ title: item, id: i })
        })
        data.correctWords.map((item,i)=>{
            if(i == 0){
            correctString = correctString+item;
            }else{
                correctString = correctString+" "+item;
            }
        })
      
        // console.log(correctString)
        this.setState({
            CorrectWords: data.correctWords,
            ShuffledWords: shuffledData,
            correctString : correctString
        })
    }
    checkFuture() {
        if (this.state.FutureData.length >= 1) {
            return true;
        }
        else {
            return false;
        }
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
                        height: '50%',
                        width: Dimensions.get('window').width
                    }}
                />
                {DB.renderHeaderNav(this.props.navigation, 'Backup', "", "", 0)}
                <FontAwesome5Icon name="lock" color="white" size={RFPercentage(7)} />
                <Text style={{
                    color: "white",
                    fontSize: RFPercentage(2),
                    fontWeight: "bold",
                    marginTop: RFPercentage(2)
                }}>Confirm</Text>
                <Text style={{
                    color: "white",
                    fontSize: RFPercentage(1.7),
                    marginVertical: RFPercentage(2)
                }}>Please select mnemonic phrase in correct order.</Text>

                {this.renderError(this.state.isCorrect)}
                <View style={{
                    backgroundColor: "white",
                    width: "100%",
                    marginTop: RFPercentage(5)
                    // height: RFPercentage()
                }}>
                    <FlatList
                        style={{ margin: this.checkFuture() ? RFPercentage(1) : RFPercentage(4) }}
                        data={this.state.FutureData}
                        renderItem={this.renderItemFuture}
                        numColumns={4}
                        keyExtractor={item => item.id}

                    />
                </View>
                <View style={{
                    width: "100%",
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginTop:RFPercentage(8)
                }}>
                    <FlatList
                        style={{ margin: RFPercentage(1) }}
                        data={this.state.ShuffledWords}
                        renderItem={this.renderItem}
                        numColumns={4}
                        keyExtractor={item => item.id}

                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.5}
                    disabled={!this.state.isFinish}
                    style={{
                        marginTop: RFPercentage(5),
                        width: "100%",
                        height: RFPercentage(6),
                        backgroundColor: this.state.isFinish ? "#4A90E2" : "#cccccc",
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {

                        DeviceEventEmitter.emit('login', "Home")
                        let id = DB.generateId(38);
                        let data = {
                            id:id,
                            seed:this.state.correctString
                        }
                        DB.storeData(data,"TempUser")
                        this.props.navigation.popToTop()

                    }}>
                    <Text style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: RFPercentage(2)
                    }}>Done</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default confirm_seed;
