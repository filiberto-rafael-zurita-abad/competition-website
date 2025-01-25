"use client";
import React, { useState, useRef, useEffect } from 'react';

type Message = {
  content: string;
  role: 'user' | 'assistant';
};

const ChatWindow = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use requestAnimationFrame to wait for DOM update
    requestAnimationFrame(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      setIsLoading(true);
      const userMessage = { content: newMessage, role: 'user' as const };
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage]
        })
      });

      if (!response.ok || !response.body) throw new Error('API request failed');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      
      // Add empty assistant message to start streaming
      setMessages(prev => [...prev, { content: '', role: 'assistant' }]);
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.startsWith('data: '));
        
        for (const line of lines) {
          const data = line.replace('data: ', '');
          if (data === '[DONE]') break;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content || '';
            
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantMessage;
                return newMessages;
              });
            }
          } catch (error) {
            console.error('Error parsing chunk:', error);
          }
        }
      }

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        content: 'Failed to get response. Please try again.', 
        role: 'assistant' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg w-full h-[80vh] flex flex-col">
      <div className="flex justify-start gap-2 mb-4">
        <button 
          className={`px-4 py-2 rounded ${
            activeTab === 'chat' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`} 
          onClick={() => setActiveTab('chat')}
        >
          Chat
        </button>
        <button 
          className={`px-4 py-2 rounded ${
            activeTab === 'history' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`} 
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button 
          className={`px-4 py-2 rounded ${
            activeTab === 'settings' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`} 
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 ml-4' : 'bg-gray-100 mr-4'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
            <div className="mt-1 space-y-2.5">
              {msg.content.split('\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-gray-500">Thinking...</div>}
        {/* Empty element to ensure space at bottom */}
        <div className="h-4" />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 w-full min-w-0 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 sm:w-auto w-full"
        >
          Send
        </button>
      </div>
      
    </div>
  );
};

export default ChatWindow;
