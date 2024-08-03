import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store/store";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

const _layout = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }

  async function displayNotification(remoteMessage: any) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: null,
    });
  }

  useEffect(() => {
    requestUserPermission();

    messaging()
      .getToken()
      .then((token: any) => {
        console.log("Token: ", token);
        AsyncStorage.setItem("fcmToken", token);
      });

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage: any) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      if (remoteMessage.data && typeof remoteMessage.data.type === "string") {
        router.navigate(remoteMessage.data.type);
      } else {
        router.navigate("home");
      }
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("Message handled in the background!", remoteMessage);
      // Handle background messages here
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log("A new FCM message arrived!", remoteMessage);
      if (remoteMessage) {
        Alert.alert(
          remoteMessage.notification.title,
          remoteMessage.notification.body
        );
      }
      displayNotification(remoteMessage);
    });

    // Setting up Expo notifications
    Notifications.addNotificationReceivedListener((notification: any) => {
      console.log("Notification received:", notification);
    });

    Notifications.addNotificationResponseReceivedListener((response: any) => {
      console.log("Notification response received:", response);
      // Handle notification response here
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false, animation: "ios" }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "ios" }}
        />
        <Stack.Screen
          name="(transactions)"
          options={{ headerShown: false, animation: "ios" }}
        />
      </Stack>
    </Provider>
  );
};

export default _layout;
