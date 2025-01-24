// ChatWindow.tsx
import React from 'react';

const ChatWindow = () => {
  return (
    <div className="border border-gray-300 p-2">
      <h2>Chat Window</h2>
      <div className="flex flex-col">
        <div className="flex-1 overflow-y-auto border border-gray-200 p-1 min-h-[200px]">
          {/* Chat messages will go here */}
        </div>
        <div className="flex mt-2">
          <input type="text" placeholder="Type your message..." className="flex-1 p-1" />
          <button className="p-1 ml-1">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
