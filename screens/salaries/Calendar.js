// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'

// const Calendar = () => {
//     return (
//         <View>
//             <Text>Calendar</Text>
//         </View>
//     )
// }

// export default Calendar

// const styles = StyleSheet.create({})
import React, { useCallback, useState } from 'react';
import {Text, View, Alert, Button} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



const colors =  {
    pending: "orange",
    accepted: "green",
    refused: 'red',
    date_accepted: 'yellow'
}

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';


const getDates = async () => {
  let userToken;
  try {
    userToken = await AsyncStorage.getItem('token');
    const resp = await fetch(
      `http://192.168.0.14:3000/api/conges`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      }
    );
   
    if (!resp.ok) {
      throw new Error("Unthaurize")
    }

    const respJSON = await resp.json();
    var myObject = {};
    respJSON.map(element => {
      myObject += {
        [element.startDate] : { color : colors[element.state], textColor : "White"},
      };
    });
    console.log(myObject);
    return myObject;

  } 
  catch (error) {
    console.log(error);
  }
}

const CalendarsList = () => {
    const [dates, setDates] = useState({
      '2021-03-21': {
        color: 'red',
        textColor: 'white',
      },
      '2021-03-22': { color: 'red', textColor: 'white' },
      '2021-03-23': {
        color: 'red',
        textColor: 'white',
      },
      '2021-03-24': { color: 'red', textColor: 'white' },
      '2021-03-25': {
        color: 'red',
        textColor: 'white',
      },
    });
  

  const selectDate = (day) => {
    if (dates[day.dateString]) {
      return Alert.alert(
        'Alert Title',
        'Voulez annuler cette demande',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              const newDates = { ...dates };
              delete newDates[day.dateString];
              getDates();
              console.log(newDates)
              setDates(newDates);
            },
          },
        ],
        { cancelable: false }
      );
    }else{
        const toto = {...dates}
        toto[day.dateString] = { color: 'orange', textColor: 'white' }
        setDates(toto)
    }
  };
    
  return (
    <View>
    <CalendarList 
      markingType={'period'}
      onDayPress={(day) => {
        selectDate(day);
      }}
      firstDay={1}
      markedDates={dates}
      pastScrollRange={10}
      futureScrollRange={24}
      renderHeader={date => {
        const header = date.toString('MMMM yyyy');
        const [month, year] = header.split(' ');
        const textStyle = {
          fontSize: 18,
          fontWeight: 'bold',
          paddingTop: 10,
          paddingBottom: 10,
          color: '#5E60CE',
          paddingRight: 5
        };

        return (
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Text style={{marginLeft: 5, ...textStyle}}>{`${month}`}</Text>
            <Text style={{marginRight: 5, ...textStyle}}>{year}</Text>
          </View>
        );
      }}
      theme={{
        'stylesheet.calendar.header': {
          dayHeader: {
            fontWeight: '600',
            color: '#48BFE3'
          }
        },
        'stylesheet.day.basic': {
          today: {
            borderColor: '#48BFE3',
            borderWidth: 0.8
          },
          todayText: {
            color: '#5390D9',
            fontWeight: '800'
          }
        }
      }}
    />
      <View style={{flex:3 , flexDirection:'column-reverse', left:10, top:10}} >
          <AntDesign name="pluscircle" size={60} color="deepskyblue" onPress={() => selectDate(day)}/>

      </View>
    </View>
  );
};

export default CalendarsList;