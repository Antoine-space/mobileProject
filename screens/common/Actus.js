import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {AuthContext} from '../../context/AuthContext'


const Actus = () => {
    const {user} = useContext(AuthContext);
    return (
        <View style={{flex:1}}>
            <View style={{backgroundColor: 'deepskyblue', flexDirection: 'row', justifyContent:"center"}}>
                <Text style={{fontSize: 30, color: 'white', fontWeight:"bold", }}>Actus</Text>
            </View>
            <View>
                <Text>{user.salary.service.name}</Text>
            </View>
        </View>
    )
}

export default Actus

const styles = StyleSheet.create({})
