import React from 'react';

export default function ChatBubble({ text, isUser }) {
  return (
    <div
      style={{
        background: isUser ? '#0072ff' : '#e9ecef',
        color: isUser ? '#fff' : '#333',
        padding: '10px 15px',
        borderRadius: '15px',
        maxWidth: '75%',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {text}
    </div>
  );
}
