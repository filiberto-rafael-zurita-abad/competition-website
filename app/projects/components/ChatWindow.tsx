"use client";
import React, { useState } from 'react';

type Message = {
  content: string;
  role: 'user' | 'assistant';
};

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<'deepseek'|'resoner'>('deepseek');

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
          messages: [...messages, userMessage],
          model
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
    <div className="border border-gray-300 p-4 rounded-lg w-full max-w-2xl">
      <div className="h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 ml-4' : 'bg-gray-100 mr-4'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong>
            <p className="mt-1">{msg.content}</p>
          </div>
        ))}
        {isLoading && <div className="text-gray-500">Thinking...</div>}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setModel('deepseek')}
          className={`px-4 py-2 rounded ${
            model === 'deepseek' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Deepseek
        </button>
        <button
          onClick={() => setModel('resoner')}
          className={`px-4 py-2 rounded ${
            model === 'resoner'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Resoner
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
