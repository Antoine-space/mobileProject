import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('toto@toto.com');
  const [pwd, setPWD] = useState('Azerty51@');

  const submit = () => {
      let data = {
          email: email,
          password: pwd
      }
      signIn(data)
  }

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
