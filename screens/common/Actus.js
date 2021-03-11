import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {AuthContext} from '../../context/AuthContext'


const Actus = () => {
    const {user} = useContext(AuthContext);
    return (
        <View>
            <Text>Actus page</Text>
            <Text>{user.service}</Text>
        </View>
    )
}

export default Actus

const styles = StyleSheet.create({})
