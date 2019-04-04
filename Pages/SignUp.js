import React from 'react';
import {Alert, AsyncStorage, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import {layouting, typography, colors, inputs} from '../theme/theme';
import Data from '../Helper/Data';
import { SafeAreaView } from 'react-navigation';


export default class SignUp extends React.Component{
    render(){
        return(
            <SafeAreaView style={{flex:1}}>
                <Text style={{flex:1, textAlignVertical:'center', textAlign:'center'}}>Test</Text>
            </SafeAreaView>
        )
    }
}