import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const ListHolidays = ({navigation}) => {
    return (
        <View>
            <Text>List holidays page</Text>
            <Button onPress={() => navigation.navigate("DetailsHoliday")} title="Go to detail" />
        </View>
    )
}

export default ListHolidays

const styles = StyleSheet.create({})
