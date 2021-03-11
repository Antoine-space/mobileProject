import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const getSalariesFromApi = () => {
    return fetch('localhost:3000/api/salaries')
      .then((response) => response.json())
      .then((json) => {
        return json.salaries;
      })
      .catch((error) => {
        console.error(error);
      });
  };

const ListAccount = () => {
    return (
        <View>
            <Text>List account page</Text>
            <Text>json.salaries</Text>
        </View>
    )
}

export default ListAccount

const styles = StyleSheet.create({})
