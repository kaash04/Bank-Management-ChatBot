import { useState } from 'react';

const MessageInput = ({ onSend }) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            onSend(inputText);
            setInputText('');
        }
    };

    return (
        <form className="message-input" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageInput;