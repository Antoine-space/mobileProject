import React, { useState, useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image
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
    
    <View style={styles.viewAll} >
      <ImageBackground source={image} style={styles.image}>
      <View style={styles.viewLogin} >
      <Image source={{ uri: '/info/mobileProject/assets/logoFonce.png' }}  style = {{ height: 100, width: 100 }} />
        
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
          <View  style={styles.button}>
            <Button
              title='mdp oublié'
              onPress={() => navigation.navigate('Forgot')}
            ></Button>
          </View>
          <View  style={styles.button}>
          <Button title='login'   onPress={submit}></Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  viewAll :{
    flex: 1, 
    marginHorizontal: 30, 
    justifyContent: "center"
  },
  input: {
    backgroundColor:"white",
    borderColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderStyle: 'solid',
    marginVertical: 5,
    borderRadius: 8,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  button: {
    marginBottom : 1,
    padding: 10,
    borderRadius: 10,
  },
  viewLogin : {
    flex: 2, 
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    backgroundColor: 'lightsteelblue',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    }
  }
});
