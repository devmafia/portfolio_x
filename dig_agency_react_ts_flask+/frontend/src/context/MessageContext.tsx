// MessageContext.tsx

import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

interface MessageContextType {
  messages: any[];
  fetchMessages: (token: string) => void;
  deleteMessage: (id: number) => void;
}

// Create the MessageContext with an initial value
export const MessageContext = createContext<MessageContextType>({
  messages: [],
  fetchMessages: () => {},
  deleteMessage: () => {},
});

// Explicitly include children in the props
export const MessageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [messages, setMessages] = useState<any[]>([]);

  // Fetch messages function
  const fetchMessages = useCallback(async (token: string) => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Delete message function
  const deleteMessage = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000//api/messages/${id}`);
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, fetchMessages, deleteMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
