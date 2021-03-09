import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const DetailsHoliday = ({navigation}) => {
    return (
        <View>
            <Text>détails Holiday</Text>
            <Button onPress={() => navigation.goBack()} title="go back"></Button>
        </View>
    )
}

export default DetailsHoliday

const styles = StyleSheet.create({})
