// NotificationService.js
import PushNotification from 'react-native-push-notification';

const NotificationService = (trackName, message, image) => {
  const channelId = Date.now().toString(); // Unique channelId for each notification

  PushNotification.createChannel(
    {
      channelId: channelId,
      channelName: trackName,
      channelDescription: message,
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
  );

  PushNotification.localNotification({
    channelId: channelId,
    title: trackName,
    message: message,
    largeIconUrl: image, // Use largeIconUrl for displaying images
  });
};

export default NotificationService;
