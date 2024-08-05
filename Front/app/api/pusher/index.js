import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER, // Ensure this is set
  useTLS: true,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { channelName, eventName, message } = req.body;

    pusher.trigger(channelName, eventName, message);

    res.status(200).json({ success: true });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
