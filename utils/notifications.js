import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFCATION_KEY = 'UdaciCards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFCATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
  return {
    title: 'Quiz Review!',
    body: "👋  Hey !!! You haven't reviewed your flashcards today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification () {
  console.log("Data is")

  AsyncStorage.getItem(NOTIFCATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      console.log(data)
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let notificationTime = new Date();
              let t = new Date();
              t.setSeconds(t.getSeconds() + 10);
              const schedulingOptions = {
                  time: t,
                  repeat: "minute" //This could be configured for a day passing "day" for repeat. For testing purpose , it is mentioned as minute.
                };

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                schedulingOptions

              )
            
              AsyncStorage.setItem(NOTIFCATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
