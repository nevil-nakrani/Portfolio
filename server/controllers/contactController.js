import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
    }

    const newMsg = await Message.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: newMsg, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
};
