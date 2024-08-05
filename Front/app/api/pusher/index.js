import Pusher from "pusher";

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true, // Use this if it's supported in your version, otherwise omit.
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { channelName, eventName, message } = req.body;

      // Trigger Pusher event
      await pusher.trigger(channelName, eventName, message);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Pusher error:", error);
      res.status(500).json({ error: "Error triggering Pusher" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
