import React, { useCallback, useEffect, useState,useContext } from 'react';
import {Text, View, Alert, Button, Pressable, Modal, StyleSheet, RefreshControl } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Ionicons, AntDesign  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';




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
    const { user } = useContext(AuthContext);


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
        let salary
        salary = user.salary._id
        console.log(salary)
        myHeaders.append("Authorization", `Bearer ${userToken}`);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`http://192.168.0.6:3000/api/conges/salary/${salary}`, requestOptions)
        .then(response => response.json())
        .then(respJSON =>  {
            var myObject = {};
            var dateStart;
            var dateEnd;
            var between;
            if(respJSON != [])
            {
                respJSON.map((element) => {
                dateStart = moment(`${[element.startDate]}`).format("YYYY-MM-DD")
                dateEnd = moment(`${[element.endDate]}`).format("YYYY-MM-DD")
                between = betweenDates(dateStart,dateEnd)
                between.map((date, index) => {
                  if(index == 0)
                  {
                    myObject[date] = {_id:element._id ,startingDay: true, color : colors[element.state], textColor : "white"}
                  }
                  else if(index == between.length-1)
                  {
                    myObject[date] = {_id:element._id, endingDay: true, color : colors[element.state], textColor : "white"}
                  }
                  else{
                    myObject[date] = {_id:element._id,  color : colors[element.state], textColor : "white"}
                  }
                });
              });
              setDates(myObject)
              setDatesSelected(null);
            }
            else console.log('aucun congé') 
          } )
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
      getDates()
    }, [])
  

  const selectDate = async (day) => {
    
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
            onPress: async () => {
              let color
              color = dates[day.dateString].color
              
              const newDates = { ...dates };
              delete newDates[day.dateString];
              setDates(newDates);

              
              const newDatesSelect = { ...datesSelected };
              delete newDatesSelect[day.dateString];
              setDatesSelected(newDatesSelect);
              
              let userToken
              userToken = await AsyncStorage.getItem('token');
              console.log('id congé : ', dates[day.dateString]._id)
              fetch(
                `http://192.168.0.6:3000/api/conges/${dates[day.dateString]._id}`,
                {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                  }
                }
              )
                getDates();
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
        console.log(datesSelected)
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
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy; 
        var i = 0;
        var firstDate;
        var lastDate;
        
        var jour;
        var jour1;
        for(const element in datesSelected) {
          var taille = (element.length-1)
          if(i == 0){
            firstDate = element 
          }
          else if(i = taille){
            lastDate = element
          }
          
          jour1 = element.substr(8, 2)+1
          if( jour != jour1 && i != taille && i != 0)
          {
            congésPasSuite()
          }
          jour = element.substr(8, 2)

          i += 1
        }
        let conges =
          {
            "salary" : user.salary._id,
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
          getDates();
          setModalVisible(!modalVisible)
        }
        catch(error){
          console.log(error);
        }
    }
  }

  const congésPasSuite = async () => {

    return Alert.alert(
      'Annuler congé',
      'Impossible la plage horraire séléctionné ne se suit pas',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );

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