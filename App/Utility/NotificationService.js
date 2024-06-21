import PushNotification from 'react-native-push-notification';

const NotificationService = (trackName, message, image) => {
  const channelId = Date.now().toString();

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
    largeIconUrl: image,
  });
};

export default NotificationService;
