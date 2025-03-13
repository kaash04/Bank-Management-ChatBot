import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ messages, addMessage, isTyping }) => {
    const handleSend = (text) => {
        addMessage(text, true);
    };

    return (
        <div className="chat-window">
            <MessageList messages={messages} isTyping={isTyping} />
            <MessageInput onSend={handleSend} />
        </div>
    );
};

export default ChatWindow;