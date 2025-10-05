import { useEffect, useState } from 'react';

export const useGreetingText = () => {
    const [text, setText] = useState('Hi');

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setText('Good morning');
        } else if (currentHour < 19) {
            setText('Good afternoon');
        } else {
            setText('Good evening');
        }
    }, []);

    return {
        text,
    };
};
