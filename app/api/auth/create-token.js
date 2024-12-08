import { StreamChat } from 'stream-chat';

// Load API keys from environment variables
const serverClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

export default function handler(req, res) {
  // Ensure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the userId from the request body
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Generate a token for the user
    const token = serverClient.createToken(userId);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
