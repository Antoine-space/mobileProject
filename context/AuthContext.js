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
            salary: action.salary
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            token: action.token,
            salary: action.salary
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            token: null,
            salary : null
          };
      }
    },
    {
      token: null,
      salary:null,
    }
  );

  useEffect(() => {
    const checkIfTokenExist = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('token');
        if (userToken !== null) {
          const resp = await fetch(
            `http://192.168.0.14:3000/api/salaries/me`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${userToken}`,
              },
            }
          );
  
          if (!resp.ok) {
            throw new Error("Unthaurize")
          }
  
          const respJSON = await resp.json();
          dispatch({
            type: 'RESTORE_TOKEN',
            token: userToken,
            salary: respJSON
          });
        }
      } catch (e) {
        signOut()
        console.log(e);
      }
    };

    checkIfTokenExist();
  }, []);


  const signIn = async (data) => {
    try {
      const resp = await fetch(
        `http://192.168.1.21:3000/api/auth/login`,
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
      console.log(respJSON)
      dispatch({
        type: 'SIGN_IN',
        token: respJSON.token,
        salary: respJSON.salary
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
        user : state,
        signIn: signIn,
        signOut: signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
