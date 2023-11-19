import React, { useState, useEffect } from 'react';
import './App.css';

const fakeApi = {
  getChats: () => [
    { id: 1, name: 'Zhannel', messages: ['Hi there!', 'How are you?'] },
    { id: 2, name: 'Alice', messages: ['Hey!', 'What are you up to?'] },
  ],
};

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      <h2>Private Chats</h2>
      <ul>
        {chats.map(chat => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SelectedChat = ({ chat, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="selected-chat">
      <h2>{chat.name}</h2>
      <div className="messages">
        {chat.messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const App = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const loadedChats = fakeApi.getChats();
    setChats(loadedChats);
  }, []);

  const handleSelectChat = (chatId) => {
    const chat = chats.find(chat => chat.id === chatId);
    setSelectedChat(chat);
    setSelectedChatId(chatId);
  };

  const handleSendMessage = (message) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, message],
    });
  };

  return (
    <div className="app">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      {selectedChatId && <SelectedChat chat={selectedChat} onSendMessage={handleSendMessage} />}
    </div>
  );
};

export default App;
