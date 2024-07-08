import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector((store) => store.user);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });

        // Update current time every second
        const interval = setInterval(() => {
            const date = new Date();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>
            <div className="chat-header">
                {message && <time className="text-xs opacity-50 text-white">{currentTime}</time>}
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
};

export default Message;
