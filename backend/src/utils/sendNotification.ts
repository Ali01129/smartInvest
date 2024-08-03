import { admin } from "../../firebaseConfig";

export const sendPushNotification = async(token: string, title: string, body: string) => {
    try {
      const message = {
        notification: {
          title: title,
          body: body,
        },
        token: token,
      };
  
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
  