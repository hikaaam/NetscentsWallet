import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LinearGradient } from 'expo-linear-gradient';
import DB from '../database/db';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import randomWords from 'random-words';

var shuffle = require('shuffle-array')

class backup_seed_wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomWord: ["loading", "words", ". . .", "loading", "words", ". . .", "loading", "words", ". . .", "loading", "words", ". . ."],
      randomString: "",
      randomShuffle: [],
      visible:false
    };
  }
  RenderRandomText(array) {
    var text1 = "";
    var text2 = "";
    var text3 = "";
    var text4 = "";
    array.map((item, i) => {
      if (i == 0 || i == 1 || i == 2) {
        text1 = text1 + " " + item;
      }
    })
    array.map((item, i) => {
      if (i == 3 || i == 4 || i == 5) {
        text2 = text2 + " " + item;
      }
    })
    array.map((item, i) => {
      if (i == 6 || i == 7 || i == 8) {
        text3 = text3 + " " + item;
      }
    })
    array.map((item, i) => {
      if (i == 9 || i == 10 || i == 11) {
        text4 = text4 + " " + item;
      }
    })
    return (
      <View style={{
        backgroundColor: "white",
        paddingVertical: RFPercentage(5),
        width: "80%",
        marginBottom: RFPercentage(5),
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: RFPercentage(2),
          fontWeight: 'bold',
          marginBottom: RFPercentage(1)
        }}>
          {text1}
        </Text>

        <Text style={{
          fontSize: RFPercentage(2),
          fontWeight: 'bold',
          marginBottom: RFPercentage(1)
        }}>
          {text2}
        </Text>

        <Text style={{
          fontSize: RFPercentage(2),
          fontWeight: 'bold',
          marginBottom: RFPercentage(1)
        }}>
          {text3}
        </Text>

        <Text style={{
          fontSize: RFPercentage(2),
          fontWeight: 'bold',
          marginBottom: RFPercentage(1)
        }}>
          {text4}
        </Text>

      </View>
    )
  }


  copyToClipboard = () => {
    if (this.state.randomString.length > 1) {
      Clipboard.setString(this.state.randomString)
      this.setState({
        visible:true
      });
      DB.closeFlash(()=>{
        this.setState({
          visible:false
        })
      },1000)
    }
  }

  componentDidMount() {

    var randoms = randomWords({ exactly: 12, maxLength: 7 });
    var randomString = "";
    var shuffledRandom = [];
    let data = [];
    randoms.map((item, i) => {
      // randomString = randomString + " " + item;
      if (i == 0) {
        randomString = randomString + item;
      } else {
        randomString = randomString + " " + item;
      }
      data.push(item)
    })
    console.log(randomString)
    shuffledRandom = shuffle(data);
    // console.log(this.Fcshuffle(randoms))
    // console.log(shuffledRandom)
    this.setState({
      randomWord: randoms,
      randomString: randomString,
      randomShuffle: shuffledRandom
    })

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
        {DB.flashMessage("Seed Copied!",this.state.visible)}
        {DB.renderHeaderNav(this.props.navigation, '', "BACKUP SEED WALLET", "", 2)}
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: RFPercentage(10)
        }}>
          <Text style={{
            fontSize: RFPercentage(2),
            color: 'white'
          }}>Backup your wallet</Text>
          <Text style={{
            fontSize: RFPercentage(2),
            color: 'white'
          }}>Private seed keys</Text>
        </View>

        {this.RenderRandomText(this.state.randomWord)}

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: RFPercentage(11),
            height: RFPercentage(11),
            borderRadius: 100,
            borderWidth: 2,
            borderColor: '#999999aa',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            this.copyToClipboard()
          }}>
          <FontAwesome5Icon name="copy" size={RFPercentage(4)} color="#999999" />
        </TouchableOpacity>
        <Text style={{
          color: "#999",
          fontWeight: 'bold',
          marginTop: RFPercentage(1)
        }}>COPY</Text>

        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            marginTop: RFPercentage(5),
            width: "100%",
            height: RFPercentage(6),
            backgroundColor: "#4A90E2",
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            if (this.state.randomString.length > 1) {
              this.props.navigation.replace('Confirm', { data: { shuffledWords: this.state.randomShuffle, correctWords: this.state.randomWord } })
            }
          }}>
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: RFPercentage(2)
          }}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default backup_seed_wallet;
