import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
    return (
        <div className="message-list">
            {messages.map(message => (
                <Message
                    key={message.id}
                    text={message.text}
                    isUser={message.isUser}
                />
            ))}
            {isTyping && <TypingIndicator />}
        </div>
    );
};

export default MessageList;