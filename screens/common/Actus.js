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
