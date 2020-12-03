
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Text, Alert, View } from 'react-native';
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
        <View style={styles.headingView}> 
          <Text style={styles.headingText}>
            Push notifications for Android
          </Text>
        </View>
        <View style={styles.infoView}>
          <Text>1. Copy fcm token from console of all the devices you want to send notification to.</Text>
          <Text>2. Paste the fcm token in the firebase cloud messaging section and send the notification from there.</Text>
          <Text>3. For testing purpose you can open same project in physical device and emulator and keep one application in foreground and another in background.</Text>
          <Text>4. You will see your push notification here.</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    padding:20
  },
  headingView: {
    flex:2,
    flexDirection:'row',
    justifyContent:'center'
  },
  headingText: {
    fontSize:20,
    color:'red'
  },
  infoView: {
    flex:4,
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'flex-start',
    marginTop:10
  }
});

export default App;
