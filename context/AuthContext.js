import React, { useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            service: action.service,
            id: action.id,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            token: action.token,
            service: action.service,
            id: action.id,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: null,
            service: null,
            id: null,
          };
      }
    },
    {
      token: null,
      service: null,
      id: null,
    }
  );

  useEffect(() => {
    const checkIfTokenExist = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
        if (userToken !== null) {
          var decoded = jwt_decode(userToken);
          console.log(userToken);
          dispatch({
            type: 'RESTORE_TOKEN',
            token: userToken,
            service: decoded.service,
            id: decoded.user_id,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    checkIfTokenExist();
  }, []);


  const signIn = async (data) => {
    try {
      const resp = await fetch(
        `http://192.168.0.14:3000/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );

      const respJSON = await resp.json();

      if (!resp.ok) {
        console.log('error');
        console.log(resp);
      }

      await AsyncStorage.setItem('token', respJSON.token);
      var decoded = jwt_decode(respJSON.token);
      console.log(respJSON)
      dispatch({
        type: 'SIGN_IN',
        token: respJSON.token,
        service: decoded.service,
        id: decoded.user_id,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const signOut = async () => {
    await AsyncStorage.setItem('token', '');
    dispatch({ type: 'SIGN_OUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state,
        signIn: signIn,
        signOut: signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
