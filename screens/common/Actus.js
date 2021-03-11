import React, {useContext} from 'react'
import { StyleSheet, Text, View ,Button} from 'react-native'
import {AuthContext} from '../../context/AuthContext'


const Actus = ({navigation}) => {
    const {user} = useContext(AuthContext);
    return (
        <View>
            <Text>Actus page</Text>
            <Text>{user.service}</Text>
            <Button
        title='Liste des employés'
        onPress={() =>navigation.navigate('ListAccount')}
      ></Button>
        </View>
    )
}

export default Actus

const styles = StyleSheet.create({})
