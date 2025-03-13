import React, { useState } from 'react';

const InputBox = ({ addMessage, currentUser, otherUser }) => {
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim()) {
            addMessage(inputText, currentUser);
            setInputText('');

            setTimeout(() => {
                addMessage('This is a response from the other user hhhhh.', otherUser);
            }, 1000);
        }
    };

    return (
        <div className="input-box">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default InputBox;