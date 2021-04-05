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
import React, { useCallback, useEffect, useState } from 'react';
import {Text, View, Alert, Button, Pressable, Modal, StyleSheet, RefreshControl} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import moment from 'moment';



const colors =  {
    pending: "orange",
    accepted: "limegreen",
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


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const CalendarsList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [dates, setDates] = useState(null);
    const [datesSelected, setDatesSelected] = useState(null);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);


    var betweenDates = function(startDate, endDate) {
      var dateslist = [],
          currentDate = startDate,
          addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            date = moment(date).format("YYYY-MM-DD")
            return date;
          };
      while (currentDate <= endDate) {
        dateslist.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      return dateslist;
    };
    
    //recupere les dates utilisateurs
    const getDates = async () => {
      let userToken;
        userToken = await AsyncStorage.getItem('token');
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${userToken}`);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch("http://192.168.0.6:3000/api/conges", requestOptions)
        .then(response => response.json())
        .then(respJSON =>  {
            var myObject = {};
            var dateStart;
            var dateEnd;
            var between;
            respJSON.map((element) => {
              dateStart = moment(`${[element.startDate]}`).format("YYYY-MM-DD")
              dateEnd = moment(`${[element.endDate]}`).format("YYYY-MM-DD")
              between = betweenDates(dateStart,dateEnd)
              between.map((date, index) => {
                if(index == 0)
                {
                  myObject[date] = {startingDay: true, color : colors[element.state], textColor : "white"}
                }
                else if(index == between.length-1)
                {
                  myObject[date] = {endingDay: true, color : colors[element.state], textColor : "white"}
                }
                else{
                  myObject[date] = { color : colors[element.state], textColor : "white"}
                }
              });

            });
            setDates(myObject)
          } )
        .catch(error => console.log('error', error));
    
    }

    useEffect(() => {
      getDates()
    }, [])
  

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
              setDates(newDates);
              const newDatesSelect = { ...datesSelected };
              delete newDatesSelect[day.dateString];
              setDatesSelected(newDatesSelect);
            },
          },
        ],
        { cancelable: false }
      );
    }else{
        const toto = {...dates}
        toto[day.dateString] = { color: 'darkgray', textColor: 'white' }
        setDates(toto)

        const tata = {...datesSelected}
        tata[day.dateString] = { color: 'darkgray', textColor: 'white' }
        setDatesSelected(tata)
    }
  };

  //veut afficher les congés séléctionner dans le modal
  // const printCongés = () => {
  //   console.log('-----------')
  //   var i = 0;
  //   console.log('-----------')
  // }

  //Si des congés sélectionner je les ajotue dans la base
  const acceptCongés = async  ()  => {
      if (!datesSelected) {
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
                setModalVisible(!modalVisible)
              },
            },
          ],
          { cancelable: false }
        );
      }
      else{
        let userToken;
        console.log(Date.now())
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy; 
        var i = 0;
        var firstDate;
        var lastDate;
        
        
        for(const element in datesSelected) {
          var taille = (element.length-1)
          if(i == 0){
            firstDate = element 
          }
          else if(i = taille){
            lastDate = element
          }
          i += 1
        }
        let conges =
          {
            "salary" : "6025541e7e6d1c53202b60a0",
            "ask_at": today,
            "startDate": firstDate,
            "endDate": lastDate,
            "comment": "",
            "state": "pending",
        };
        try {
          userToken = await AsyncStorage.getItem('token');
          const resp = await fetch(
            `http://192.168.0.6:3000/api/conges`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
              },
              body : JSON.stringify(conges)
            }
          )
          const respJSON = resp.status
          console.log(respJSON);
          console.log("requete envoyé")
          this.forceRemount
        }
        catch(error){
          console.log(error);
        }
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
      markedDates={{...dates}}
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
              <Text style={styles.modalText} >{}</Text>
              <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Annuler</Text>
                  </Pressable>              
                  <Pressable
                    style={[styles.button, styles.buttonAccept]}
                    onPress={() => acceptCongés()}
                  >
                    <Text style={styles.textStyle}  >Accepter</Text>
                  </Pressable>  
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{flex:3 , flexDirection:'column-reverse', left:10, top:10}}
      >
        <Ionicons
        name="add-circle" size={75} color="slateblue" onPress={() => setModalVisible(true)}
        />

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