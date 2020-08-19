
import _ from 'lodash';
import { ErrorMetaData } from '../hooks/postureObserver';

type NotificationPermission = "granted" | "denied" | "default"

export const setupNotification = () : NotificationPermission => {
  let notificationStatus = Notification.permission;
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (notificationStatus === 'default') {
      Notification.requestPermission().then(function (permission) {
          notificationStatus = permission;
          if (permission === 'denied') {
              alert('this website works best with notifications turned on')
          }
      });
  }

  return notificationStatus;
};

export const sendNotification = _.debounce((errorSet: ErrorMetaData[]) => {
  console.log('hi');
  const reasonsList = errorSet.reduce((combinedStr: string, currentError: ErrorMetaData, currentIndex: number) => {
    if (currentIndex === 0) {
      return currentError.shortMessage;
    }
    return `${combinedStr}, \n ${currentError.shortMessage}`;
  }, '')
  const body = `Out of posture: ${reasonsList}`
  new Notification('Posture Net', { body: body });
}, 500);
