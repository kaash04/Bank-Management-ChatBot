const Message = ({ text, isUser }) => {
    return (
        <div className={`message ${isUser ? 'user' : 'bot'}`}>
            <div className="message-content">
                <p>{text}</p>
            </div>
        </div>
    );
};

export default Message;