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
import {Text, View, Alert, Button, Pressable, Modal, StyleSheet} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import moment from 'moment';



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
    var myObject;
    var date;
    respJSON.map(element => {
      date = moment(`${[element.startDate]}`).format("YYYY-MM-DD")
      if(!myObject)
      {
        myObject =  ` {"${date}" : { color : "${colors[element.state]}", textColor : "white"}, `  ;
      }
      myObject += ` "${date}" : { color : "${colors[element.state]}", textColor : "white"},` ;
    });
    myObject += "}"; 
    return myObject;
  } 
  catch (error) {
    console.log(error);
  }
}

const CalendarsList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dates, setDates] = useState(
      {}
    );
  

  const selectDate = (day) => {
    if (dates[day.dateString]) {
      return Alert.alert(
        'Annuler congé',
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

  //veut afficher les congés séléctionner dans le modal
  const printCongés = () => {
    const text =  `${dates}`; 
    return text
  }

  const acceptCongés = (day)  => {
      setModalVisible(!modalVisible)
      if (!dates[day.dateString]) {
        return Alert.alert(
          'Impossible ',
          "Impossible d'envoyer votre demande, rien n'est séléctionner",
          [
            {
              text: 'Annuler',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                const newDates = { ...dates };
                delete newDates[day.dateString];
                console.log(newDates)
                setDates(newDates);
              },
            },
          ],
          { cancelable: false }
        );
      }
      else{
        congés(day)
    }
  }

  //Envoi les congés 
  const congés = async (day) => {
    let userToken;
    conges =
      {
        "salary" : "6025541e7e6d1c53202b60a0",
        "ask_at": "2021-02-10",
       "startDate": "2021-04-18T08:00:00Z",
       "endDate": "2021-04-20T12:00:00Z",
       "comment": "",
       "state": "pending",
       "validator": {
         "firstname": "Etoiles",
        "lastname": "Dupont",
         "date": "2021-02-12"
       }
     };
    try {
      userToken = await AsyncStorage.getItem('token');
      const resp = await fetch(
        `http://192.168.0.14:3000/api/conges`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body : conges
        }
      );
    
    }
    catch(error){
      console.log(error);
    }
  }
  
    
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
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <Text style={styles.modalText,{}}>Confirmer mes congés</Text>
              <Text style={styles.modalText} >{printCongés()}</Text>
              <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Annuler</Text>
                  </Pressable>              
                  <Pressable
                    style={[styles.button, styles.buttonAccept]}
                    onPress={() => pushCongés()}
                  >
                    <Text style={styles.textStyle} >Accepter</Text>
                  </Pressable>  
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{flex:3 , flexDirection:'column-reverse', left:10, top:10}}
      >
          <AntDesign name="pluscircle" size={60} color="deepskyblue" onPress={() => setModalVisible(true)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonAccept: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CalendarsList;