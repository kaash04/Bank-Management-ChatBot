import { useEffect } from 'react';
import axios from 'axios';

const ChatBot = ({ addMessage, messages, setIsTyping }) => {
    const generateResponse = async (userMessage) => {
        try {
            const res = await axios.get('http://localhost:1904/chat', {
                params: { prompt: userMessage }
            });
            return res.data.text;
        } catch (error) {
            console.error(error);
            return 'Error fetching response.';
        }
    };

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage?.isUser) {
            setIsTyping(true);

            const timeout = setTimeout(() => {
                generateResponse(lastMessage.text).then((response) => {
                    addMessage(response, false);
                    setIsTyping(false);
                });
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [messages, addMessage, setIsTyping]);

    return null;
};

export default ChatBot;