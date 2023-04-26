import { ChangeEvent, FormEvent, useRef, useState, useEffect } from 'react';
import axios from 'axios';

interface Message {
  sender: 'User' | 'Assistant';
  text: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
  
    if (userMessage.trim() === '') {
      return;
    }
  
    // Add user message to the messages array
    setMessages((prevMessages) => [...prevMessages, { sender: 'User', text: userMessage }]);
  
    // Call the API
    try {
      const response = await axios.post('/api/chefbot', { messages: [...messages.map((message) => message.text), userMessage] });
  
      // Add assistant response to the messages array
      setMessages((prevMessages) => [...prevMessages, { sender: 'Assistant', text: response.data.assistant }]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error calling chatbot API:', error.message);
      } else {
        console.error('Error calling chatbot API:', error);
      }
      setMessages((prevMessages) => [...prevMessages, { sender: 'Assistant', text: 'Error occurred while processing your request. Please try again later.' }]);
    }
  
    // Clear the user message input
    setUserMessage('');
  };
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to the bottom of messages after messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
<div className="h-full flex flex-col">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Chefbot</h1>
      <div className="bg-white shadow-md rounded p-6 w-full max-w-2xl h-[80vh] mx-auto flex-grow flex flex-col">
        <div className="overflow-y-auto mb-4 border rounded p-2 flex-grow" style={{ scrollbarWidth: 'thin' }}>
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.sender === 'User' ? 'text-right' : ''}`}>
              <div className={`inline-block px-4 py-2 rounded ${message.sender === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                <span className={`font-bold ${message.sender === 'User' ? '' : 'text-gray-600'}`}>{message.sender}: </span>
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex-shrink-0">
          <div className="flex">
            <input
              type="text"
              className="w-full border rounded-l px-4 py-2"
              placeholder="Type your message"
              value={userMessage}
              onChange={handleInputChange}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


