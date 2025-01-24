"use client";
// ChatWindow.tsx
import React, { useState } from 'react';

const ChatWindow = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div className="border border-gray-300 p-2 w-full">
      <h2>Chat Window</h2>
      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto border border-gray-200 p-1 min-h-[200px]">
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="p-1 ml-1" onClick={handleSendMessage}>Send</button>
          <button className="p-1 ml-1" onClick={() => setMessages([])}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
