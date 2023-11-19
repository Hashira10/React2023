const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let chats = [
  { id: 1, name: 'John', messages: [] },
  { id: 2, name: 'Alice', messages: [] },
];

app.get('/chats', (req, res) => {
  res.json(chats);
});

app.post('/chats/:chatId/messages', (req, res) => {
  const chatId = parseInt(req.params.chatId);
  const { text } = req.body;

  const chat = chats.find(chat => chat.id === chatId);
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  chat.messages.push(text);
  res.status(201).json({ message: 'Message sent successfully' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
