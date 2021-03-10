import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('toto@toto.com');
  const [pwd, setPWD] = useState('Azerty51@');

  const submit = async () => {
    try {
      const resp = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: pwd,
          }),
        }
      );

      const respJSON = await resp.json();

      if (!respJSON.ok) {
        console.log('error');
        console.log(respJSON);
      }

      console.log(respJSON);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 30 }}>
      <Text
        style={{
          marginBottom: 50,
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        Login
      </Text>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(txt) => setEmail(txt)}
        value={email}
        keyboardType={'email-address'}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(txt) => setPWD(txt)}
        value={pwd}
        secureTextEntry={true}
      />
      <Button
        title='mdp oublié'
        onPress={() => navigation.navigate('Forgot')}
      ></Button>
      <Button title='login' onPress={submit}></Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    marginVertical: 5,
  },
});