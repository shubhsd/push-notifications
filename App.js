
import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Button, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
// import firebase from "react-native-firebase";


const App = () => {

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage.notification.title));
    });
    return unsubscribe;
  }, []);

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      getFcmToken();
      console.log('Authorization status:', authStatus);
    }
  };

  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     console.log(fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  };

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <Button
          title="Press me"
          onPress={() => Alert.alert('Get notification')}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});

export default App;
