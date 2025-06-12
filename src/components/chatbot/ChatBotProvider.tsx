
import React from 'react';
import ChatBot from './ChatBot';

interface ChatBotProviderProps {
  children: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left';
  enabled?: boolean;
}

const ChatBotProvider: React.FC<ChatBotProviderProps> = ({ 
  children, 
  position = 'bottom-right',
  enabled = true 
}) => {
  return (
    <>
      {children}
      {enabled && <ChatBot position={position} />}
    </>
  );
};

export default ChatBotProvider;
