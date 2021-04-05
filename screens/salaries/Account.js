import React, {useContext, useEffect, useState}from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import {AuthContext} from '../../context/AuthContext'


const Account = () => {
    const { signOut, user } = useContext(AuthContext);
    const [users, setUsers] = useState([])

    
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const resp = await fetch(
          `http://192.168.0.6:3000/api/salaries`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
          }
        );

        if (!resp.ok) {
          console.log(resp);
          return;
        }

        const respJSON = await resp.json();
        setUsers(respJSON)
      } catch (error) {
        console.log(error);
      }
    };
    loadUsers();
  }, [user]);

    return (
        <View>
            <Text>Account détail </Text>
            <Button onPress={signOut} title='logout'></Button>

        </View>
    )
}

export default Account

const styles = StyleSheet.create({})
