import React, { Component, useState } from 'react';
import { View, Text, Button } from 'react-native';

function CobaHook() {
    const [count, setCount] = useState(0);
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <Text>count</Text>
            <Button title="click me" onPress={setCount(count + 1)} />
        </View>
    );

}

class hook extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            CobaHook()
        )
    }
}

export default hook;
