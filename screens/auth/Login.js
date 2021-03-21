import React, { useState, useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
const image = { uri: "../../assets/3348020.png" };

const Login = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('test@free.fr');
  const [pwd, setPWD] = useState('1258ZAea');

  const submit = () => {
      let data = {
          email: email,
          password: pwd
      }
      signIn(data)
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 30, flexDirection: "column"}}>
      <ImageBackground source={image} style={styles.image}>
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
        <Text>Mot de passe</Text>
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setPWD(txt)}
          value={pwd}
          secureTextEntry={true}
        />
        <View style={styles.Button}>
          <Button
            title='mdp oublié'
            onPress={() => navigation.navigate('Forgot')}
          ></Button>
        </View>
        <View>
        <Button title='login' onPress={submit}></Button>
        </View>
      </ImageBackground>
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  button: {
    flex:3,
    marginBottom : 10,
    padding: 10,
  }
});
